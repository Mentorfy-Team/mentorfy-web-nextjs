import useSWR from 'swr';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { fetcher } from '~/hooks/fetcher';

type props = Partial<ProductTypes.Product>[];

export function useGetClientProducts(id) {
    const { data, error } = useSWR<props>(
        `${ApiRoutes.client_products}?id=${id}`,
        fetcher,
        {
            fallbackData: [],
        },
        );

    return {
        product: data,
        isLoading: !error && !data,
        isError: error,
    };
}
