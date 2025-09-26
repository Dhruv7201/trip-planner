import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const DATABASE_URL = process.env.DATABASE_URL || '';
