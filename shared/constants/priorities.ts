// ==========================================
// Priority Constants
// ==========================================

export const PRIORITIES = {
    CRITICAL: { value: 'critical', label: 'Critical', color: 'text-red-600', weight: 5 },
    HIGH: { value: 'high', label: 'High', color: 'text-orange-600', weight: 4 },
    MEDIUM: { value: 'medium', label: 'Medium', color: 'text-yellow-600', weight: 3 },
    LOW: { value: 'low', label: 'Low', color: 'text-blue-600', weight: 2 },
    TRIVIAL: { value: 'trivial', label: 'Trivial', color: 'text-gray-600', weight: 1 },
    NONE: { value: 'none', label: 'None', color: 'text-gray-400', weight: 0 }
} as const

export const PRIORITY_ORDER = [
    PRIORITIES.CRITICAL.value,
    PRIORITIES.HIGH.value,
    PRIORITIES.MEDIUM.value,
    PRIORITIES.LOW.value,
    PRIORITIES.TRIVIAL.value,
    PRIORITIES.NONE.value
]
