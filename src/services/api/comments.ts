import axios from '@/plugins/axios'
import type { CommentFormRequest } from '@/types'

export const addComment = async (id: number, data: CommentFormRequest) => {
  return await axios.post(`/api/quotes/${id}/comments`, data)
}
