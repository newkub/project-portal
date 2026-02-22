// ==========================================
// Email Utilities
// ==========================================

export interface EmailMessage {
    to: string | string[]
    subject: string
    body: string
    html?: string
    attachments?: { filename: string; content: Buffer }[]
}

export async function sendEmail(message: EmailMessage): Promise<void> {
    console.log('[Email] Sending to:', message.to)
    console.log('[Email] Subject:', message.subject)
    // In production, integrate with SendGrid, AWS SES, etc.
    return Promise.resolve()
}

export async function sendBulkEmail(
    recipients: string[],
    subject: string,
    body: string
): Promise<void> {
    console.log(`[Email] Sending bulk to ${recipients.length} recipients`)
    return Promise.resolve()
}

export function compileTemplate(template: string, data: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '')
}
