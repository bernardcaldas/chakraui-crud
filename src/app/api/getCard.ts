// api/getCard.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getCardById(id) {
  return await prisma.card.findUnique({
    where: {
      id: id,
    },
  })
}
