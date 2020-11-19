const config = {
  MONGO_HOSTNAME: process.env.MONGO_HOSTNAME || 'localhost',
  MONGO_DB: process.env.MONGO_DB || 'TheCountOfMoney',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  MONGO_USER: process.env.MONGO_USER || 'user',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'user06',
  SERVER_PORT: process.env.SERVER_PORT || '5000',
  JWT_SECRET: process.env.JWT_SECRET || 'LAMMAL',
};

export default config;
