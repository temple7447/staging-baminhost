import { ProtocolField, MeetingProtocol } from './types';
import {
    Target, LayoutGrid, BarChart3, Zap, Globe, Users, Clock, Calendar
} from "lucide-react";

export const LEADERSHIP_QUESTIONS = [
    { id: 1, text: "I regularly communicate the company vision and purpose to my team" },
    { id: 2, text: "I prioritize the development of my team members' skills and careers" },
    { id: 3, text: "I encourage collaboration and connection among all team members" },
    { id: 4, text: "I take full ownership of my team's results (both wins and losses)" },
    { id: 5, text: "I deliver on the promises I make to my team" },
    { id: 6, text: "I communicate directly and honestly, especially during difficult conversations" },
    { id: 7, text: "I delegate effectively to empower others and free up my own time" },
    { id: 8, text: "I am present and available when my team needs support or guidance" },
    { id: 9, text: "I address behavior that is not aligned with our cultural values or standards" },
    { id: 10, text: "I often seek feedback from my team on how I can better support their needs" },
    { id: 11, text: "I provide timely and constructive feedback to allow my team to course-correct when necessary" },
    { id: 12, text: "I make clear what each person's role is on the team and how they fit within our organization's bigger picture" }
];

export const MEETING_ACTION_ITEMS = [
    { key: "checkRequired", label: "Check if the meeting is actually required" },
    { key: "useChecklist", label: "Use meeting prep checklist" },
    { key: "implementFramework", label: "Implement the correct framework" }
];

export const POST_MEETING_CHECKLIST = [
    { key: "sendNotes", label: "Send meeting notes within 24 hours" },
    { key: "followUp", label: "Schedule follow-up on action items" }
];

export const MEETING_PROTOCOLS: MeetingProtocol[] = [
    {
        id: "Annual",
        title: "Annual OKRs",
        subtitle: "Annual Planning - Top 3-5 objectives",
        intro: "Define the highest level things that will push your company to the next level",
        icon: Target,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        meta: [
            { label: "Who", value: "Executive Team / Core Team", icon: Users },
            { label: "Duration", value: "120 minutes", icon: Clock },
            { label: "When", value: "Every 12 months (Year-end)", icon: Calendar }
        ],
        agenda: [
            "Reinvigorate and realign on your culture - Vision, Purpose and Values",
            "Prior Year in review: What worked? What needs improvement? Measure Key Results. What OKRs were not achieved?",
            "Define the highest level 3-5 objectives and key results (OKRs) for the current year. Assign a single owner to each.",
            "Remember the OKR formula: \"I will [objective] as measured by this [key result]\"",
            "Discuss what would prevent you from achieving those OKRs: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
        ],
        formFields: [
            { id: 'culture', label: 'Culture realignment notes', placeholder: 'Vision, Purpose and Values...' },
            { id: 'works', label: 'What worked well?', placeholder: 'Successes from the prior year...' },
            { id: 'improvement', label: 'What needs improvement?', placeholder: 'Gaps identified...' },
            { id: 'results', label: 'Measure Key Results', placeholder: 'Final metrics for prior OKRs...' },
            { id: 'notAchieved', label: 'What OKRs were not achieved?', placeholder: 'Unmet goals and why...' },
            { id: 'objectives', label: 'Highest level 3-5 objectives & OKRs', placeholder: 'I will [objective] as measured by [key result]...' },
            { id: 'obstacles', label: 'Obstacle Discussion', placeholder: 'Bandwidth, resources, priorities...' }
        ]
    },
    {
        id: "Quarterly",
        title: "Quarterly OKRs",
        subtitle: "Quarterly Planning - Supporting Annual OKRs",
        intro: "Explore initiatives that'll help us achieve our key result and objective",
        icon: LayoutGrid,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-100",
        meta: [
            { label: "Who", value: "Executive Team / Core Team", icon: Users },
            { label: "Duration", value: "60-90 minutes", icon: Clock },
            { label: "When", value: "Every 3 months (Quarter-end)", icon: Calendar }
        ],
        agenda: [
            "Reinvigorate and realign on your culture - Vision, Purpose and Values",
            "Reconfirm Annual OKRs. Adjust if strategically necessary.",
            "Prior Quarter in review: What worked? What needs improvement? Measure Key Results. What initiatives were not achieved?",
            "Brainstorm initiatives for the next quarter that help advance Annual OKRs. Narrow down and prioritize. Assign a owner to each.",
            "Discuss what would prevent you from achieving those initiatives: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
        ],
        formFields: [
            { id: 'culture', label: 'Culture realignment notes', placeholder: 'Reinvigorate the team...' },
            { id: 'reconfirm', label: 'Reconfirm Annual OKRs', placeholder: 'Strategic adjustments needed...' },
            { id: 'works', label: 'What worked well?', placeholder: 'Quarterly wins...' },
            { id: 'improvement', label: 'What needs improvement?', placeholder: 'Quarterly gaps...' },
            { id: 'results', label: 'Measure Key Results', placeholder: 'Current KR status...' },
            { id: 'notAchieved', label: 'What initiatives were not achieved?', placeholder: 'Unmet initiatives...' },
            { id: 'initiatives', label: 'Next Quarter Initiatives', placeholder: 'Key projects to advance OKRs...' },
            { id: 'obstacles', label: 'Obstacle Discussion', placeholder: 'Potential blockers...' }
        ]
    },
    {
        id: "Monthly",
        title: "Monthly OKRs",
        subtitle: "Monthly Execution - Supporting Quarterly OKRs",
        intro: "Explore initiatives that'll help us achieve our key result and objective",
        icon: BarChart3,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100",
        meta: [
            { label: "Who", value: "Department Teams / Core Team", icon: Users },
            { label: "Duration", value: "60 minutes", icon: Clock },
            { label: "When", value: "Every month (Month-end)", icon: Calendar }
        ],
        agenda: [
            "Reinvigorate and realign on your culture - Vision, Purpose and Values",
            "Reconfirm Annual OKRs and confidence in achieving Quarterly Initiatives.",
            "Prior Month in review: What worked? What needs improvement? Measure Key Results. What actions were not completed?",
            "Brainstorm actions for the next month to advance quarterly initiatives. Narrow down and prioritize. Assign a owner to each.",
            "Breakdown actions into tasks that can be completed in a weekly timeframe. Assign a owner to each task.",
            "Discuss what would prevent you from achieving those actions: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
        ],
        formFields: [
            { id: 'culture', label: 'Culture realignment notes', placeholder: 'Keep values top of mind...' },
            { id: 'reconfirm', label: 'Reconfirm OKRs & Initiatives', placeholder: 'Confidence levels...' },
            { id: 'works', label: 'What worked well?', placeholder: 'Monthly successes...' },
            { id: 'improvement', label: 'What needs improvement?', placeholder: 'Monthly adjustments...' },
            { id: 'results', label: 'Measure Key Results', placeholder: 'Progress metrics...' },
            { id: 'notAchieved', label: 'What actions were not completed?', placeholder: 'Incomplete actions...' },
            { id: 'initiatives', label: 'Next Month Actions', placeholder: 'Prioritize monthly commitments...' },
            { id: 'tasks', label: 'Weekly Task Breakdown', placeholder: 'Actionable weekly tasks...' },
            { id: 'obstacles', label: 'Obstacle Discussion', placeholder: 'Bandwidth & resource check...' }
        ]
    },
    {
        id: "Weekly",
        title: "Weekly Sprint",
        subtitle: "Weekly Sync - Confidence & Roadblocks",
        intro: "Breaking down our objectives into smaller, bite-sized pieces",
        icon: Zap,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-100",
        meta: [
            { label: "Who", value: "Department Teams / Core Team", icon: Users },
            { label: "Duration", value: "60 minutes", icon: Clock },
            { label: "When", value: "Every week (Week-start)", icon: Calendar }
        ],
        agenda: [
            "Reinvigorate and realign on your culture - Vision, Purpose and Values",
            "Reconfirm Annual OKRs and confidence in achieving Monthly Actions.",
            "Prior Week in review: What worked? What needs improvement? Measure Key Results. What tasks were not completed?",
            "Commit to tasks to be completed during the next weekly sprint. Ensure a single owner is assigned to each task.",
            "Discuss what would prevent you from completing those tasks: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
        ],
        formFields: [
            { id: 'culture', label: 'Culture realignment notes', placeholder: 'Weekly focus area...' },
            { id: 'reconfirm', label: 'Reconfirm OKRs & Actions', placeholder: 'Confidence check...' },
            { id: 'works', label: 'What worked well?', placeholder: 'Prior week wins...' },
            { id: 'improvement', label: 'What needs improvement?', placeholder: 'Prior week gaps...' },
            { id: 'results', label: 'Measure Key Results', placeholder: 'Weekly metrics...' },
            { id: 'notAchieved', label: 'What tasks were not completed?', placeholder: 'Incomplete tasks...' },
            { id: 'tasks', label: 'Next Weekly Sprint Commitment', placeholder: 'Specific tasks to complete...' },
            { id: 'obstacles', label: 'Obstacle Discussion', placeholder: 'Roadblocks to clear...' }
        ]
    },
    {
        id: "Dept",
        title: "Department Specific",
        subtitle: "Functional Execution - Deep Dives",
        intro: "Optional execution meeting for specialized departments",
        icon: Globe,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        meta: [
            { label: "Who", value: "Department Teams", icon: Users },
            { label: "Duration", value: "30-60 minutes", icon: Clock },
            { label: "When", value: "Every week (Week-start/mid)", icon: Calendar }
        ],
        agenda: [
            "Reinvigorate and realign on your culture - Vision, Purpose and Values",
            "Reconfirm OKRs that are departmental responsibility.",
            "Deep dive into Marketing, Sales, Delivery, Operations and Finance specifics.",
            "Prior Week in review: What worked? What needs improvement? Measure Key Results. What actions were not completed?",
            "Collaborate and deep dive into any specific tasks or issues that need focused attention.",
            "Commit to tasks to be completed by the next weekly sprint. Ensure a owner is assigned to each task.",
            "Discuss what would prevent you from completing those tasks: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
        ],
        formFields: [
            { id: 'culture', label: 'Culture realignment notes', placeholder: 'Departmental values...' },
            { id: 'reconfirm', label: 'Reconfirm Departmental OKRs', placeholder: 'Functional alignment...' },
            { id: 'works', label: 'What worked well?', placeholder: 'Departmental wins...' },
            { id: 'improvement', label: 'What needs improvement?', placeholder: 'Functional gaps...' },
            { id: 'results', label: 'Measure Key Results', placeholder: 'Departmental KPIs...' },
            { id: 'notAchieved', label: 'What actions were not completed?', placeholder: 'Incomplete items...' },
            { id: 'deepDive', label: 'Deep Dive Topics', placeholder: 'Focused attention on specific issues...' },
            { id: 'tasks', label: 'Next Weekly Sprint Commitment', placeholder: 'Functional tasks...' },
            { id: 'obstacles', label: 'Obstacle Discussion', placeholder: 'Bandwidth & resource check...' }
        ]
    },
    {
        id: "1:1s",
        title: "1:1 Meetings",
        subtitle: "Mentorship & Alignment",
        intro: "Open conversations with direct reports to build and sustain healthy relationships, exchange constructive feedback, ensure roles and responsibilities are clear and keep employees engaged.",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        meta: [
            { label: "Who", value: "Manager & Direct Report", icon: Users },
            { label: "Duration", value: "30-60 minutes", icon: Clock },
            { label: "When", value: "Bi-weekly (Rec) / Monthly (Min)", icon: Calendar }
        ],
        agenda: [
            "Build strong individual relationships",
            "Create an opportunity for two-way positive feedback",
            "Review and/or ask questions related to roles and responsibilities",
            "Stay on the same page with career aspirations and goals",
            "Review KPIs and Critical Drivers related to the specific department",
            "Share 6-inch putt feedback, especially for non-urgent but important things",
            "Analyze and access where someone is in the Willing and Able matrix"
        ]
    },
    {
        id: "Standup",
        title: "Standup Meetings",
        subtitle: "Daily Realignment",
        intro: "Daily touch point to realign on vision. Works (or doesn't) depending on team culture. Focus on strategy, not problem solving.",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-50/50",
        border: "border-amber-100",
        meta: [
            { label: "Who", value: "Department Teams / Core Team", icon: Users },
            { label: "Duration", value: "15 minutes or less", icon: Clock },
            { label: "When", value: "Daily (Week-start)", icon: Calendar }
        ],
        agenda: [
            "15 minutes or less (strictly enforced)",
            "Focus on vision and strategy, not problem solving or detailed status reporting",
            "Review only the highest level reporting",
            "This isn't an avenue for everyone to speak; it's an alignment conversation"
        ]
    }
];
