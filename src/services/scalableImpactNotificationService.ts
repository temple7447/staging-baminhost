import { api } from './api';

export interface ScalableImpactNotification {
  id: string;
  userId: string;
  type: 'level_completion' | 'benchmark_achieved' | 'progress_reminder' | 'milestone_reached';
  title: string;
  message: string;
  levelId?: number;
  benchmarkId?: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  levelCompletions: boolean;
  benchmarkAchievements: boolean;
  progressReminders: boolean;
  milestoneReached: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
}

class ScalableImpactNotificationService {
  private notifications: Map<string, ScalableImpactNotification[]> = new Map();
  private preferences: Map<string, NotificationPreferences> = new Map();

  // Send level completion notification
  async sendLevelCompletionNotification(
    userId: string, 
    levelId: number, 
    levelTitle: string
  ): Promise<void> {
    const notification: ScalableImpactNotification = {
      id: `level_${levelId}_${Date.now()}`,
      userId,
      type: 'level_completion',
      title: '🎉 Level Completed!',
      message: `Congratulations! You've successfully completed Level ${levelId}: ${levelTitle}. The next level is now unlocked!`,
      levelId,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    await this.storeNotification(notification);
    await this.sendNotificationToUser(notification);
  }

  // Send benchmark achievement notification
  async sendBenchmarkNotification(
    userId: string, 
    benchmarkId: string, 
    benchmarkDescription: string,
    levelId: number
  ): Promise<void> {
    const notification: ScalableImpactNotification = {
      id: `benchmark_${benchmarkId}_${Date.now()}`,
      userId,
      type: 'benchmark_achieved',
      title: '🎯 Benchmark Achieved!',
      message: `Great progress! You've completed: "${benchmarkDescription}" for Level ${levelId}.`,
      levelId,
      benchmarkId,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    await this.storeNotification(notification);
    await this.sendNotificationToUser(notification);
  }

  // Send milestone notification
  async sendMilestoneNotification(
    userId: string, 
    milestone: string, 
    value: number,
    target: number
  ): Promise<void> {
    const notification: ScalableImpactNotification = {
      id: `milestone_${Date.now()}`,
      userId,
      type: 'milestone_reached',
      title: '🚀 Milestone Reached!',
      message: `Fantastic! You've reached ${value.toLocaleString()} for ${milestone}. Target: ${target.toLocaleString()}`,
      data: { milestone, value, target },
      isRead: false,
      createdAt: new Date().toISOString()
    };

    await this.storeNotification(notification);
    await this.sendNotificationToUser(notification);
  }

  // Send progress reminder
  async sendProgressReminder(userId: string): Promise<void> {
    const notification: ScalableImpactNotification = {
      id: `reminder_${Date.now()}`,
      userId,
      type: 'progress_reminder',
      title: '📈 Progress Check Reminder',
      message: 'Time to assess your progress! Check your Scalable Impact Planner to see how you\'re advancing toward your goals.',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    await this.storeNotification(notification);
    await this.sendNotificationToUser(notification);
  }

  // Store notification
  private async storeNotification(notification: ScalableImpactNotification): Promise<void> {
    try {
      // Store in local cache
      const userNotifications = this.notifications.get(notification.userId) || [];
      userNotifications.unshift(notification);
      this.notifications.set(notification.userId, userNotifications);

      // Store in backend
      await api.post('/scalable-impact/notifications', notification);
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  }

  // Send notification to user (multiple channels)
  private async sendNotificationToUser(notification: ScalableImpactNotification): Promise<void> {
    const preferences = await this.getUserPreferences(notification.userId);
    
    if (!preferences) return;

    const promises: Promise<void>[] = [];

    // In-app notification (always sent)
    if (preferences.inAppNotifications) {
      promises.push(this.sendInAppNotification(notification));
    }

    // Email notification
    if (preferences.emailNotifications && this.shouldSendEmailForType(preferences, notification.type)) {
      promises.push(this.sendEmailNotification(notification));
    }

    // Push notification
    if (preferences.pushNotifications && this.shouldSendPushForType(preferences, notification.type)) {
      promises.push(this.sendPushNotification(notification));
    }

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  }

  // Send in-app notification
  private async sendInAppNotification(notification: ScalableImpactNotification): Promise<void> {
    // This would typically use a toast notification or update a notification center
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification({
        title: notification.title,
        message: notification.message,
        type: 'success',
        duration: 5000
      });
    }
  }

  // Send email notification
  private async sendEmailNotification(notification: ScalableImpactNotification): Promise<void> {
    try {
      await api.post('/notifications/email', {
        userId: notification.userId,
        subject: notification.title,
        message: notification.message,
        template: 'scalable_impact_progress'
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }

  // Send push notification
  private async sendPushNotification(notification: ScalableImpactNotification): Promise<void> {
    try {
      await api.post('/notifications/push', {
        userId: notification.userId,
        title: notification.title,
        message: notification.message,
        data: {
          type: notification.type,
          levelId: notification.levelId,
          benchmarkId: notification.benchmarkId
        }
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  // Get user notifications
  async getUserNotifications(userId: string, limit: number = 50): Promise<ScalableImpactNotification[]> {
    try {
      // Try to get from cache first
      const cached = this.notifications.get(userId);
      if (cached && cached.length > 0) {
        return cached.slice(0, limit);
      }

      // Fetch from backend
      const response = await api.get(`/scalable-impact/notifications/${userId}?limit=${limit}`);
      const notifications = response.data;
      
      // Cache the results
      this.notifications.set(userId, notifications);
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    try {
      // Update in cache
      const userNotifications = this.notifications.get(userId);
      if (userNotifications) {
        const notification = userNotifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          notification.readAt = new Date().toISOString();
        }
      }

      // Update in backend
      await api.patch(`/scalable-impact/notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  // Get user preferences
  async getUserPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      // Check cache first
      if (this.preferences.has(userId)) {
        return this.preferences.get(userId)!;
      }

      // Fetch from backend
      const response = await api.get(`/scalable-impact/notification-preferences/${userId}`);
      const preferences = response.data;
      
      // Cache the result
      this.preferences.set(userId, preferences);
      return preferences;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      // Return default preferences
      return {
        userId,
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
        levelCompletions: true,
        benchmarkAchievements: true,
        progressReminders: true,
        milestoneReached: true,
        reminderFrequency: 'weekly'
      };
    }
  }

  // Update user preferences
  async updateUserPreferences(preferences: NotificationPreferences): Promise<void> {
    try {
      // Update cache
      this.preferences.set(preferences.userId, preferences);
      
      // Update backend
      await api.put(`/scalable-impact/notification-preferences/${preferences.userId}`, preferences);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }

  // Check if should send email for notification type
  private shouldSendEmailForType(preferences: NotificationPreferences, type: string): boolean {
    switch (type) {
      case 'level_completion':
        return preferences.levelCompletions;
      case 'benchmark_achieved':
        return preferences.benchmarkAchievements;
      case 'progress_reminder':
        return preferences.progressReminders;
      case 'milestone_reached':
        return preferences.milestoneReached;
      default:
        return true;
    }
  }

  // Check if should send push for notification type
  private shouldSendPushForType(preferences: NotificationPreferences, type: string): boolean {
    return this.shouldSendEmailForType(preferences, type);
  }

  // Schedule progress reminders
  async scheduleProgressReminders(userId: string): Promise<void> {
    try {
      const preferences = await this.getUserPreferences(userId);
      if (!preferences || !preferences.progressReminders) return;

      await api.post('/scalable-impact/schedule-reminders', {
        userId,
        frequency: preferences.reminderFrequency
      });
    } catch (error) {
      console.error('Error scheduling progress reminders:', error);
    }
  }

  // Get unread notification count
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const notifications = await this.getUserNotifications(userId);
      return notifications.filter(n => !n.isRead).length;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  // Clear all notifications for user
  async clearAllNotifications(userId: string): Promise<void> {
    try {
      // Clear cache
      this.notifications.delete(userId);
      
      // Clear backend
      await api.delete(`/scalable-impact/notifications/${userId}`);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }

  // Test notification system
  async sendTestNotification(userId: string): Promise<void> {
    const notification: ScalableImpactNotification = {
      id: `test_${Date.now()}`,
      userId,
      type: 'milestone_reached',
      title: '🧪 Test Notification',
      message: 'This is a test notification to verify your Scalable Impact Planner notification system is working correctly.',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    await this.storeNotification(notification);
    await this.sendNotificationToUser(notification);
  }

  // Clear cache (for testing/development)
  clearCache(): void {
    this.notifications.clear();
    this.preferences.clear();
  }
}

export const scalableImpactNotificationService = new ScalableImpactNotificationService();
export default scalableImpactNotificationService;