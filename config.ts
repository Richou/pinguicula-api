import * as dotenv from "dotenv";

dotenv.config();

export const CSV_FILE = "./assets/mock_data.csv";
export const DATABASE_URL = process.env.DATABASE_URL;
export const PHOTO_DIR_PATH = process.env.PHOTO_DIR_PATH;
export const PRIVATE_KEY_FILE = process.env.PRIVATE_KEY_FILE;
export const PUBLIC_KEY_FILE = process.env.PUBLIC_KEY_FILE;
export const APPLICATION_LOG_LEVEL= process.env.APPLICATION_LOG_LEVEL;
