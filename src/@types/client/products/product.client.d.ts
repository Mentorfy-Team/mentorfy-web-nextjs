const Database: ExternalModules.Supabase.Database;

declare namespace ProductClient {
  type Product = typeof Database.public.Tables.product.Row;

  type CreateProduct = Pick<Product, 'title', 'price', 'deliver', 'video'>;
}
