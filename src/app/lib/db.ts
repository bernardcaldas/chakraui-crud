import { prisma } from "./prisma";

export interface Item { 
    
    id: number;
  tags: string[];
  title: string;
  content: string;
  userAvatar: string;
  username: string;
  created_at: string;
}