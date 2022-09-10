declare namespace Handler {
  type Callback<TRequest, TResponse> = (
    req: TRequest,
    res: ExternalModules.Next.NextApiResponse<TResponse>,
  ) => Promise<void>;
}
