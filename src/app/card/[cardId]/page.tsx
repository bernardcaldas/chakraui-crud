
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
  return <ClientComponent card={card}/>
}
