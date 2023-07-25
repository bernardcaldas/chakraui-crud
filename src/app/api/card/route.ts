import { prisma } from "../prisma";
import { NextResponse } from "next/server";
 import type { Item } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from 'next'



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

// export const DELETE = async (request: Request) => {
//   const { id } = await request.json();
//   const deletedItem = await prisma.item.delete({
//     where: { id },
//   });
//   return NextResponse.json(deletedItem);
// }



// export const DELETE = async (request: Request) => {
//   const pathParts = request.url.split('/');
//   const id = Number(pathParts[pathParts.length - 1]);

//   try {
//     const deletedItem = await prisma.item.delete({
//       where: { id },
//     });
//     return new Response(JSON.stringify(deletedItem), {status: 200});
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return new Response(JSON.stringify({ error: "Failed to delete item" }), {status: 500});
//   }
// }

// export const DELETE = async (request: Request) => {
//   const pathParts = request.url.split('/');
//   const id = Number(pathParts[pathParts.length - 1]);

//   try {
//     const deletedItem = await prisma.item.delete({
//       where: { id },
//     });
//     return new Response(JSON.stringify(deletedItem), {status: 200});
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return new Response(JSON.stringify({ error: "Failed to delete item", details: error }), {status: 500});
//   }
// }

// export default async function handle(req: { query: { id: any; }; method: string; }, res: { json: (arg0: GetResult<{ id: number; title: string; content: string; username: string; userAvatar: string; created_at: Date; tags: string; }, unknown> & {}) => void; }) {
//   const postId = req.query.id;

//   if (req.method === 'DELETE') {
//     const post = await prisma.item.delete({
//       where: { id: postId },
//     });

//     res.json(post);
//   } else {
//     throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
//   }
// }

// DELETE /api/card/:id
// export const DELETE = async (request: Request) => {
//   const postId = request.url;

//   if (request.method === 'DELETE') {
//     const post = await prisma.post.delete({
//       where: { id: postId },
//     });

//     return NextResponse.json(post);
//   } else {
//     throw new Error(`The HTTP ${request.method} method is not supported at this route.`);
//   }
// }



// export const DELETE = async (request: Request) => {
//   const body = await request.json();
//   const id = body.id;

//   try {
//     const deletedItem = await prisma.item.delete({
//       where: { id },
//     });
//     return NextResponse.json(deletedItem, {status: 200});
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return NextResponse.json({ error: "Failed to delete item" }, {status: 500});
//   }
// }

// export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
  
//   try {
//     const deletedItem = await prisma.item.delete({
//       where: { id: Number(id) },
//     });

//     res.status(200).json(deletedItem);
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     res.status(500).json({ error: "Failed to delete item" });
//   }
// }





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

