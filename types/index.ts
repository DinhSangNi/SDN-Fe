export type User = {
  _id: string;
  email: string;
  fullName?: string;
  role: 'admin' | 'student';
  avatar?: string;
  isActive?: boolean;
};

export type Media = {
  id: string;
  url: string;
  publicId: string;
  type: string;
  isTemp: boolean;
  uploadedBy?: string;
  createdAt?: string;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  isVisible: boolean;
  type: 'post' | 'announcement';
  priority: number;
  createdBy: User;
  updatedBy: User;
  createdAt: string;
  updatedAt: string;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export type Lab = {
  _id: string;
  name: string;
  description?: string;
  location?: string;
};
