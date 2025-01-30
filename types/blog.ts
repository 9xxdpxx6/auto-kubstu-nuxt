export interface PostPreview {
  id: number
  title: string
  slug: string
  preview?: string
  date: string
}

export interface Post extends PostPreview {
  content: string
}

export interface PostsResponse {
  data: PostPreview[]
  meta: {
    current_page: number
    last_page: number
    total: number
  }
} 