// ==========================================
// Calculator Utilities
// ==========================================

export function calculateProgress(current: number, total: number): number {
    if (total === 0) return 0
    return Math.min(Math.round((current / total) * 100), 100)
}

export function calculateTimeRemaining(
    spent: number,
    estimated: number,
    status: string
): number | null {
    if (status === 'done') return 0
    if (status === 'cancelled') return null
    return Math.max(0, estimated - spent)
}

export function calculateVelocity(completed: number, days: number): number {
    if (days === 0) return 0
    return roundToDecimals(completed / days, 2)
}

export function roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals)
    return Math.round(value * multiplier) / multiplier
}

export function formatHours(hours: number): string {
    const whole = Math.floor(hours)
    const decimal = hours - whole
    const minutes = Math.round(decimal * 60)
    return minutes > 0 ? `${whole}h ${minutes}m` : `${whole}h`
}
