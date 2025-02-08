import type { Post, PostPreview } from '@/types/blog'
import type { Discount, DiscountPreview } from '~/types/discounts'
import type { Category, CategoryPreview } from '@/types/categories'
import type { Visit } from '@/types/stats'

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase

  const prefixes = {
    guest: '/guest'
  } as const

  interface ApiResponse<T> {
    data: {
      value?: {
        data: T[];
        meta?: {
          current_page: number;
          last_page: number;
          total: number;
        }
      }
    }
  }

  // Базовые методы для запросов
  const request = async <T>(endpoint: string, options: { 
    headers?: Record<string, string>, 
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', 
    body?: any,
    params?: Record<string, any>
  } = {}) => {
    console.log('Начало вызова АПИ сервера');
    
    return useFetch<ApiResponse<T>>(`${baseUrl}${prefixes.guest}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options.headers
      }
    })
  }

  // API endpoints
  const categories = {
    list: () => {
      console.log('useApi запрос к списку категорий')
      
      return request<CategoryPreview>('/categories')
    },
    getById: (id: string | number) => request<Category>(`/categories/${id}`),
    getBySlug: (slug: string) => request<Category>(`/categories/${slug}`)
  }

  const posts = {
    list: (params?: Record<string, any>) => {
      console.log('useApi запрос к списку новостей')

      return request<PostPreview>('/posts', { params })
    },
    getById: (id: string | number) => request<Post>(`/posts/${id}`),
    getBySlug: (slug: string) => request<Post>(`/posts/${slug}`)
  }

  const discounts = {
    list: () => request<DiscountPreview>('/discounts'),
    getById: (id: string | number) => request<Discount>(`/discounts/${id}`),
    getBySlug: (slug: string) => request<Discount>(`/discounts/${slug}`)
  }

  const callbacks = {
    create: (data: any) => request('/callback-requests', {
      method: 'POST',
      body: data
    })
  }

  const visits = {
    list: (params?: { 
      start_date?: string;
      end_date?: string;
    }) => request<Visit>('/visits', { params })
  }

  return {
    categories,
    posts,
    discounts,
    callbacks,
    visits
  }
}