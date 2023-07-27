// api/card/route.ts

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function fetchCardById(id: string) {
  const card = await prisma.item.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!card) {
    throw new Error(`No card found for id: ${id}`)
  }

  return card
}
