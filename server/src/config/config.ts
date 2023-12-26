interface JWTConfigProps {
  secret: string;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
}

interface BcryptConfigProps {
  hashRounds: number;
}

interface DbConfigProps {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface ConfigProps {
  jwt: JWTConfigProps;
  bcrypt: BcryptConfigProps;
  protocol: string;
  host: string;
  database: DbConfigProps;
}

export const config = (): ConfigProps => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiration: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    refreshTokenExpiration: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
  },
  bcrypt: {
    hashRounds: parseInt(process.env.BCRYPT_HASH_ROUNDS),
  },
  protocol: process.env.PROTOCOL,
  host: process.env.HOST || 'localhost:3000',
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
