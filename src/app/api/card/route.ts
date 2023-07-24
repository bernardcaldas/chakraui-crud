import { prisma } from "../prisma";
import { NextResponse } from "next/server";
 import type { Item } from "@prisma/client";


export const POST = async (request: Request) =>{
    const body: Item = await request.json();
    // Convert 'created_at' string to a Date object
    const created_at = new Date(body.created_at);

    const newItem = await prisma.item.create({
      data:{
        title: body.title,
        tags: body.tags,  // assumindo que 'tags' é uma string
        content: body.content,
        userAvatar: body.userAvatar,
        username: body.username,
        created_at: created_at,  // corrigindo para 'created_at'
    }
    });
    return NextResponse.json(newItem, {status: 201});
}


export const GET = async () => {
  const items = await prisma.item.findMany()
  return NextResponse.json(items)
}

export const DELETE = async (request: Request) => {
  const { id } = await request.json();
  const deletedItem = await prisma.item.delete({
    where: { id },
  });
  return NextResponse.json(deletedItem);
}



export async function fetchCardById(id: number) {
  console.log(id)
  const card = await prisma.item.findUnique({
    where: {
      id: id,
    },
  })

  if (!card) {
    throw new Error(`No card found for id: ${id}`)
  }

  return card
}

export const PUT = async (request: Request) => {
  const body: Item = await request.json();
  const updated_at = new Date();

  const updatedItem = await prisma.item.update({
    where: { id: body.id },
    data: {
      title: body.title,
      tags: body.tags,
      content: body.content,
      userAvatar: body.userAvatar,
      username: body.username,
      created_at: new Date(body.created_at),
      //updated_at: updated_at,  // Adicionamos a data de atualização
    },
  });
  return NextResponse.json(updatedItem, {status: 200});
}

