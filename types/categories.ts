export interface CategoryPreview {
    id: number
    slug: string
    name: string
    icon?: string
    duration: number
    price: number
}

export interface Category extends CategoryPreview {
    description: string
}

export interface CategoriesResponse {
    data: Category[]
    meta?: {
        pagination?: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
} 