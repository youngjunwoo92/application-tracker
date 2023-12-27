type Config = {
  jwt: {
    secret: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
  };
  bcrypt: {
    hashRounds: number;
  };
  protocol: string;
  host: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

export const config = (): Config => ({
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
