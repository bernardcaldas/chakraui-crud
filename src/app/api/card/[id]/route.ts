import {prisma} from '../../prisma'
import { NextResponse } from 'next/server';



// export const DELETE = async (request: Request) => {
//   const { id } = await request.json();
//   const deletedItem = await prisma.item.delete({
//     where: { id },
//   });
//   return NextResponse.json(deletedItem);
// }

// export const DELETE = async (request: Request) => {
//     const { id } = await request.json();
//     const idAsNumber = parseInt(id, 10);
//     const deletedItem = await prisma.item.delete({
//       where: { id: idAsNumber },
//     });
//     return NextResponse.json(deletedItem);
//   }

  export const DELETE = async (request: Request) => {
  const pathParts = request.url.split('/');
  const id = Number(pathParts[pathParts.length - 1]);

  try {
    const deletedItem = await prisma.item.delete({
      where: { id },
    });
    return new Response(JSON.stringify(deletedItem), {status: 200});
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(JSON.stringify({ error: "Failed to delete item" }), {status: 500});
  }
}