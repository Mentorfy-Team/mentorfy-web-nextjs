declare namespace UploadApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }
    type Response = any;
  }
}
