export const STORAGE_KEYS = {
    MANAGING_BOSS_CULTURE: 'managing_boss_culture',
    MANAGING_BOSS_LEADERSHIP: 'managing_boss_leadership',
    MANAGING_BOSS_DELEGATION: 'managing_boss_delegation',
    MANAGING_BOSS_MEETINGS: 'managing_boss_meetings',
    MANAGING_BOSS_PERFORMANCE: 'managing_boss_performance',
    MANAGING_BOSS_APPROVALS: 'managing_boss_approvals',
    STRATEGIC_HIRING_PLAN: 'strategic_hiring_planner_data',
    STRATEGIC_HIRING_APPROVALS: 'strategic_hiring_approvals',
    HIRING_TASKS: 'hiring_tasks_v1',
    HIRING_ORG_CHART: 'hiring_org_chart_v1'
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error(`Error loading from storage for key "${key}":`, error);
    }
    return defaultValue;
};

export const saveToStorage = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to storage for key "${key}":`, error);
    }
};
