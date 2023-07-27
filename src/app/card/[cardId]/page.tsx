
//import { fetchCardById } from '../route';
import { fetchCardById } from '../../api/card/route'
import ClientComponent from './client-component';

export default async function CardPage({ params }: { params: { cardId: string } }) {
   // Converte a string cardId para número
   console.log(params);
   console.log(params.cardId)
   const cardIdAsNumber = parseInt(params.cardId, 10);

   // Se cardIdAsNumber é NaN, lançamos um erro
   if (isNaN(cardIdAsNumber)) {
     throw new Error(`Invalid card ID: ${params.cardId}`);
   }
 
   const card = await fetchCardById(cardIdAsNumber);
   const cardWithDateString = {
    ...card,
    created_at: card.created_at.toISOString(),
  };

  //  const handleDelete = async (id: number) => {
  //   // Fazendo a requisição para a API para deletar o card
  //   const response = await fetch(`http://localhost:3000/api/card/${id}`, {
  //     method: 'DELETE',
  //   });
  
  //   if (!response.ok) {
  //     throw new Error('Failed to delete item');
  //   }
  // }

  // return (
  //   <div>
  //     <h1>Title : {card.title}</h1>
  //     <p>Content : {card.content}</p>
  //     <p>By {card.username}</p>
  //     <p>Tags: {card.tags}</p>
  //     // Adicione mais campos do card conforme necessário
  //     <button> Voltar</button>
  //   </div>

  // );
  return <ClientComponent card={cardWithDateString} />

}
