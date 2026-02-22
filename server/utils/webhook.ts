// ==========================================
// Webhook Utilities
// ==========================================

export interface WebhookPayload {
    event: string
    data: Record<string, unknown>
    timestamp: string
    signature?: string
}

export interface WebhookConfig {
    url: string
    secret: string
    events: string[]
}

export async function sendWebhook(config: WebhookConfig, payload: WebhookPayload): Promise<void> {
    console.log(`[Webhook] Sending to ${config.url}`, payload)
    // In production, use fetch with signature verification
    return Promise.resolve()
}

export async function verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
): Promise<boolean> {
    // In production, use crypto to verify HMAC signature
    console.log(`[Webhook] Verifying signature`)
    return true
}

export function createWebhookPayload(
    event: string,
    data: Record<string, unknown>
): WebhookPayload {
    return {
        event,
        data,
        timestamp: new Date().toISOString()
    }
}
