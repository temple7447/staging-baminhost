export interface CulturePlan {
    vision: string;
    purpose: string;
    values: string[];
    standards: string;
    checklist: {
        defineVision: boolean;
        listValues: boolean;
        establishStandards: boolean;
        scheduleTeamReview: boolean;
        communicateRegularly: boolean;
    };
}

export interface LeadershipPlan {
    archetype: string;
    strengths: string;
    opportunities: string;
    strategyExecutionValue: number;
    assessment: Record<number, number>;
    improvementFocus: string;
    checklist: {
        valuePeople: boolean;
        talentDevelopment: boolean;
        createConnections: boolean;
        createOwnership: boolean;
        takeResponsibility: boolean;
        directCommunication: boolean;
        empowerTeam: boolean;
        takeQuestionnaire: boolean;
        pickAttribute: boolean;
        plotGrid: boolean;
        plotSpectrum: boolean;
        seekFeedback: boolean;
    };
}

export interface DelegationPlan {
    bigFive: string[];
    inventory: { task: string; action: string }[];
    automationPlan: { task: string; frequency: string; tools: string; who: string; when: string }[];
    delegationPlanRows: { task: string; time: string; outcome: string; who: string; ready: string }[];
    big5Commitment: { task: string; time: string; outcome: string; commitment: string }[];
    checklist: {
        listBigFive: boolean;
        delegateThirtyDays: boolean;
        useDadd: boolean;
        useTriangle: boolean;
        selectMechanisms: boolean;
    };
}

export interface ProtocolData {
    culture: string;
    works: string;
    improvement: string;
    results: string;
    notAchieved: string;
    objectives?: string;
    initiatives?: string;
    tasks?: string;
    obstacles: string;
    reconfirm?: string;
    deepDive?: string;
}

export interface MeetingsPlan {
    checklist: {
        needMeeting: boolean;
        whoRunning: boolean;
        whoFacilitating: boolean;
        whoContributing: boolean;
        whoRecording: boolean;
        opinionVoice: boolean;
        captureTopics: boolean;
        decideActions: boolean;
        accountableActions: boolean;
    };
    actionSteps: {
        checkRequired: boolean;
        useChecklist: boolean;
        implementFramework: boolean;
    };
    protocolsData: Record<string, ProtocolData>;
    postMeeting: Record<string, { sendNotes: boolean; followUp: boolean }>;
    audit: {
        focusArea: string;
        improvement: string;
    };
}

export interface PerformancePlan {
    orgChart: {
        today: string;
        nextLevel: string;
    };
    pillars: {
        marketing: string;
        sales: string;
        delivery: string;
        operations: string;
        finance: string;
    };
    coaching: {
        reflection: string;
    };
    goals: {
        results: string;
        process: string;
        commitment: string;
    };
    talent: {
        willingAbleNotes: string;
        temperamentNotes: string;
    };
    compensation: {
        notes: string;
    };
    toughConversations: {
        notes: string;
        outcomesNotes: string;
        improvementPlanNotes: string;
    };
    partingShots: {
        notes: string;
    };
    checklist: {
        rolesBeforePeople: boolean;
        defineResponsibilities: boolean;
        embraceCoaching: boolean;
        distinguishGoals: boolean;
        createOrgChart: boolean;
        printMatrix: boolean;
        scheduleReviews: boolean;
        establishPaths: boolean;
        evaluateComp: boolean;
    };
}

export interface ModuleProps<T> {
    data: T;
    updateData: (updated: Partial<T>) => void;
    onSync?: () => void;
}

export interface ProtocolField {
    id: string;
    label: string;
    placeholder: string;
}

export interface MeetingProtocol {
    id: string;
    title: string;
    subtitle: string;
    intro: string;
    icon: any;
    color: string;
    bg: string;
    border: string;
    meta: { label: string; value: string; icon: any }[];
    agenda: string[];
    formFields?: ProtocolField[];
}
