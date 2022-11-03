const Database: ExternalModules.Supabase.Database;
declare namespace ProductApi {
  type Product = typeof Database.public.Tables.product.Row;

  namespace Get {
    interface Request {
      query: {
        id: string;
      };
    }
    interface Response {
      product?: Product;
      error?: string;
    }
  }
  namespace List {
    interface Request {
      query: {
        id: string;
      };
    }
    interface Response {
      products?: (Product & {
        relations: typeof Database.public.Tables.client_product.Row[];
      })[];
      error?: string;
    }
  }
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: Product & {
        banner_owner: string;
        banner_type: string;
        old_banner_url: string;
        main_owner: string;
        main_type: string;
        old_main_url: string;
        video: string;
        extra: any;
      };
    }

    type Response = {
      product?: Product;
      error?: string;
    };
  }
}
