import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Aqui, você deve buscar os dados do card pelo ID (params.id)
  const card = await getCardById(params.id)

  return {
    props: card,
  }
}

const CardPage: React.FC<CardProps> = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  )
}

export default CardPage
