// ==========================================
// Storage Plugin
// ==========================================

export default defineNitroPlugin(() => {
    // Mock storage interface
    const storage = {
        upload: async (key: string, data: Buffer, metadata?: Record<string, string>) => {
            console.log(`[Storage] Upload ${key}`, metadata)
            return { key, url: `/storage/${key}` }
        },
        download: async (key: string) => {
            console.log(`[Storage] Download ${key}`)
            return Buffer.from('')
        },
        delete: async (key: string) => {
            console.log(`[Storage] Delete ${key}`)
        },
        getUrl: (key: string) => `/storage/${key}`,
        list: async (prefix: string) => {
            console.log(`[Storage] List ${prefix}`)
            return []
        }
    }

    // @ts-ignore
    globalThis.$storage = storage
})
