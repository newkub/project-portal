// ==========================================
// Calculation Utilities
// ==========================================

export function calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

export function roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals)
    return Math.round(value * multiplier) / multiplier
}

export function calculateAverage(values: number[]): number {
    if (values.length === 0) return 0
    return values.reduce((sum, val) => sum + val, 0) / values.length
}

export function calculateMedian(values: number[]): number {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    if (sorted.length % 2 !== 0) {
        return sorted[mid] ?? 0
    }
    const left = sorted[mid - 1] ?? 0
    const right = sorted[mid] ?? 0
    return (left + right) / 2
}
