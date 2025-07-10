import { PostFormData } from '@/components/custom/PostForm';
import api from '@/lib/axiosInstance';
import { PaginationResponse, Post } from '@/types';

export const createPost = async (payload: {
  title: string;
  content: string;
  coverImage?: string;
  type?: string;
}) => {
  return await api.post(`/post`, payload);
};

export interface GetPostsParams {
  page?: number;
  limit?: number;
  isVisible?: boolean;
  type?: 'post' | 'announcement';
  priority?: number;
  sort?: 'latest' | 'oldest';
}

export const getPosts = async (params: GetPostsParams = {}) => {
  const res = await api.get('/post', { params });
  return res.data.data as PaginationResponse<Post>;
};

export const getPostById = async (id: string) => {
  const res = await api.get(`/post/${id}`);
  return res.data.data as Post;
};

export const editPost = async (id: string, payload: PostFormData) => {
  const res = await api.put(`/post/${id}`, payload);
  return res.data.data as Post;
};

export const deletePost = async (id: string) => {
  const res = await api.delete(`/post/${id}`);
  return res.data.data as Post;
};

export const togglePostVisibility = async ({
  id,
  isVisible,
}: {
  id: string;
  isVisible: boolean;
}) => {
  const res = await api.patch(`/post/${id}/visibility`, {
    isVisible,
  });
  return res.data;
};

export const updatePostPriority = async ({
  id,
  priority,
}: {
  id: string;
  priority: number;
}) => {
  const res = await api.patch(`/post/${id}/priority`, {
    priority,
  });
  return res.data;
};
