export interface ConfigJwt {
  secret: string;
  expiresInSeconds: number;
}

export default (): { jwt: ConfigJwt } => ({
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresInSeconds: parseInt(process.env.JWT_EXPIRES_IN_SECONDS!, 10),
  },
});
