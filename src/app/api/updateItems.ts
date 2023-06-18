import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { id, title, content, username, created_at } = req.body;

  const updatedItem = await prisma.item.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      username,
      created_at,
    },
  });

  res.json(updatedItem);
}
