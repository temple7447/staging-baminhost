export const STORAGE_KEYS = {
    MANAGING_BOSS_CULTURE: 'managing_boss_culture',
    MANAGING_BOSS_LEADERSHIP: 'managing_boss_leadership',
    MANAGING_BOSS_APPROVALS: 'managing_boss_approvals',
    STRATEGIC_HIRING_PLAN: 'strategic_hiring_planner_data',
    STRATEGIC_HIRING_APPROVALS: 'strategic_hiring_approvals'
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
