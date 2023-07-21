import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCardById } from "../api/getCard";

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [card, setCard] = useState<Item | null>(null);


  useEffect(() => {
    if (id) {
      getCardById(Number(id))
        .then((data) => setCard(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{card.title}</h1>
      <p>{card.content}</p>
    </div>
  );
};

export default CardPage;
