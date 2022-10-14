const Database: ExternalModules.Supabase.Database;

declare namespace ClientProducts {
    type ProductsList = typeof Database.public.Tables.client_product.Row;

    namespace Get {

        interface Request extends ExternalModules.Next.NextApiRequest {
            body: {
                id: string;
            }
        }

        type Response = {
            error: string;
          };
    }
}
