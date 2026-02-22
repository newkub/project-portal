// ==========================================
// Formatting Utilities
// ==========================================

export function formatNumber(num: number, decimals = 0): string {
    return num.toLocaleString('th-TH', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}

export function formatCurrency(amount: number, currency = 'THB'): string {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency
    }).format(amount)
}

export function formatPercentage(value: number, total: number): string {
    if (total === 0) return '0%'
    return `${Math.round((value / total) * 100)}%`
}

export function truncate(str: string, maxLength: number, suffix = '...'): string {
    if (str.length <= maxLength) return str
    return str.slice(0, maxLength - suffix.length) + suffix
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function camelCase(str: string): string {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
}
