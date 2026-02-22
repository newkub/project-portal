// ==========================================
// Documentation Types
// ==========================================

export interface Document {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    category: DocumentCategory
    tags: string[]
    author: string
    status: DocumentStatus
    version: string
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
}

export type DocumentCategory =
    | 'getting-started'
    | 'api-reference'
    | 'guides'
    | 'tutorials'
    | 'changelog'
    | 'faq'

export type DocumentStatus = 'draft' | 'review' | 'published' | 'archived'

export interface DocumentSection {
    id: string
    title: string
    level: number
    anchor: string
    content: string
}

export interface SearchResult {
    document: Document
    highlights: string[]
    score: number
}
