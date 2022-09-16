declare namespace ProductApi {
  type Product = ExternalModules.Supabase.Database.public.Tables.product.Row;

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
      products?: Product[];
      error?: string;
    }
  }
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: Product;
    }

    type Response = {
      product?: Product;
      error?: string;
    };
  }
}
