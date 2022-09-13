declare namespace AddressApi {

    namespace Post {
        interface Request extends ExternalModules.Next.NextApiRequest {
            body: {
                email: string;
                password?: string;
                zipcode: string;
                street: string;
                number: number;
                complement?: string;
                neighborhood: string;
                city: string;
                state: string;
            };
        }

        type Result = {};

        type User = ExternalModules.Supabase.Database.User &
            ExternalModules.Supabase.Database.public.Tables.address.Row;

        type Response = {
            user?: User;
            session?: ExternalModules.Supabase.Session & {
                user: User;
            };
            error: string;
        };
    }
}
