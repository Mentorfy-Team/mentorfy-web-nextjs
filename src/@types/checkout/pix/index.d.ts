const Database: ExternalModules.Supabase.Database;

declare namespace Checkout {
  declare namespace Pix {
    namespace Post {
      interface Request extends ExternalModules.Next.NextApiRequest {
        body: PixRequest;
      }
      interface Response extends ExternalModules.Next.NextApiResponse {
        info: string;
      }
    }
  }
}
