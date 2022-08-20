
export const post = async(req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  res.status(200).json({
    accessToken: Date.now().toString(),
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });
};
