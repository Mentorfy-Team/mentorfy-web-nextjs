const Database: ExternalModules.Supabase.Database;

declare namespace Checkout {
  declare namespace Pix {
    namespace Post {
      interface Request extends ExternalModules.Next.NextApiRequest {
        body: Pagarme.OrderRequest;
      }
      interface Response extends ExternalModules.Next.NextApiResponse {
        info: string;
      }
    }
  }
}
