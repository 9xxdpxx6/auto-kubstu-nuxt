export interface DiscountPreview {
  id: number
  slug: string
  name: string
  preview?: string
  percentage: number
}

export interface Discount extends DiscountPreview {
  description: string
}

export interface DiscountsResponse {
  data: DiscountPreview[]
  meta: {
    current_page: number
    last_page: number
      total: number
  }
} 