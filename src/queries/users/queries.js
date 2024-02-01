import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '@/api/clients';

export const useFetchUsers = (options) => {
  return useQuery({
    queryKey: [`clients`],
    queryFn: () => fetchClients(),
    ...options,
  });
};
