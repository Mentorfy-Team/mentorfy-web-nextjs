import useSWR from 'swr';


export function useGetClientProducts(id) {
    const { data, error } = useSWR<ClientProducts.ProductsList[]>( 
        `${ApiRoutes.}`
    );
}
