import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT) ?? 3000,
};

export default config;
