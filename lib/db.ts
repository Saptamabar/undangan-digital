import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export const db = sql;

export type Guest = {
  id: string;
  name: string;
  slug: string;
};