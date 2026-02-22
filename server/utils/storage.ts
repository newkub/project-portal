// ==========================================
// Storage Utilities
// ==========================================

export interface FileUpload {
    filename: string
    data: ArrayBuffer
    mimeType: string
    size: number
}

export interface UploadResult {
    key: string
    url: string
    size: number
}

export async function uploadFile(file: FileUpload, path?: string): Promise<UploadResult> {
    const key = path ? `${path}/${file.filename}` : file.filename
    console.log(`[Storage] Uploading ${key} (${file.size} bytes)`)
    return {
        key,
        url: `/storage/${key}`,
        size: file.size
    }
}

export async function deleteFile(key: string): Promise<void> {
    console.log(`[Storage] Deleting ${key}`)
}

export async function getFileUrl(key: string): Promise<string> {
    return `/storage/${key}`
}

export async function getFileMetadata(key: string): Promise<{ size: number; mimeType: string }> {
    return { size: 0, mimeType: 'application/octet-stream' }
}
