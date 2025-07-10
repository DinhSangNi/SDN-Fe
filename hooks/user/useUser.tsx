import { useQuery } from '@tanstack/react-query';
import { getUsers, GetUsersParams } from '@/services/user.service';
import { PaginationResponse, User } from '@/types';

export const useUsers = (params?: GetUsersParams) => {
  return useQuery<PaginationResponse<User>>({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    enabled: !!params,
  });
};
