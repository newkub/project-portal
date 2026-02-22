// ==========================================
// File Utilities
// ==========================================

export function getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
}

export function getFileIcon(filename: string): string {
    const ext = getFileExtension(filename)
    const iconMap: Record<string, string> = {
        ts: 'i-vscode-icons-file-type-typescript',
        tsx: 'i-vscode-icons-file-type-typescript',
        js: 'i-vscode-icons-file-type-js',
        jsx: 'i-vscode-icons-file-type-react',
        vue: 'i-vscode-icons-file-type-vue',
        json: 'i-vscode-icons-file-type-json',
        md: 'i-vscode-icons-file-type-markdown',
        css: 'i-vscode-icons-file-type-css',
        scss: 'i-vscode-icons-file-type-scss',
        html: 'i-vscode-icons-file-type-html'
    }
    return iconMap[ext] || 'i-heroicons-document'
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function isImageFile(filename: string): boolean {
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']
    return imageExts.includes(getFileExtension(filename))
}
