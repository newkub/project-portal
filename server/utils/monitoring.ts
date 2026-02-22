// ==========================================
// Monitoring Utilities
// ==========================================

export interface MetricData {
    name: string
    value: number
    timestamp: number
    tags?: Record<string, string>
}

export function recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    console.log(`[Metric] ${name}: ${value}`, tags)
}

export function recordTiming(name: string, durationMs: number): void {
    console.log(`[Timing] ${name}: ${durationMs}ms`)
}

export function recordError(error: Error, context?: string): void {
    console.error(`[Error] ${context || 'Unknown'}:`, error.message)
}

export function createSpan(name: string): { end: () => number } {
    const start = Date.now()
    return {
        end: () => {
            const duration = Date.now() - start
            recordTiming(name, duration)
            return duration
        }
    }
}

export async function withMonitoring<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const span = createSpan(name)
    try {
        const result = await fn()
        span.end()
        return result
    } catch (error) {
        recordError(error as Error, name)
        throw error
    }
}
