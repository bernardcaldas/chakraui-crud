'use client'
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Text, Avatar, HStack, Tag, Stack, Textarea, Input, FormControl, FormLabel, useToast, Center, Flex } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"

interface Card {
  id?: number;
  title: string;
  content: string;
  username: string;
  created_at: string;
  tags: string;
  userAvatar: string;
}

export default function ClientComponent({ card }: {card: Card}) {
  const [title, setTitle] = useState(card.title);
  const [content, setContent] = useState(card.content);
  const [username, setUsername] = useState(card.username);
  const [createdAt, setCreatedAt] = useState(new Date(card.created_at).toISOString().split('T')[0]);
  const [tags, setTags] = useState(card.tags);
  const [userAvatar, setUserAvatar] = useState(card.userAvatar)
  const toast = useToast();
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handleCreatedAtChange = (event: React.ChangeEvent<HTMLInputElement>) => setCreatedAt(event.target.value);
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => setTags(event.target.value);
  const handleUserAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserAvatar(event.target.value)

  const updateCard = async () => {
    const response = await fetch('http://localhost:3000/api/card', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: card.id,
        title: title,
        content: content,
        userAvatar: userAvatar,
        username: username,
        created_at: createdAt,
        tags: tags
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      // Se a resposta for OK, mostramos o toast
      toast({
        title: "Card updated.",
        description: "Your changes have been saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  };

  const openDeleteDialog = () => {
    // Verificando se o id do card é válido
    if (!card.id) {
      console.error('Card id is undefined');
      return;
    }
  
    // Abra o AlertDialog
    setIsOpen(true)
  };

  const handleDelete = async () => {
    // Verificando se o id do card é válido
    if (!card.id) {
      console.error('Card id is undefined');
      return;
    }
  
    // Fazendo a requisição para a API para deletar o card
    const response = await fetch(`http://localhost:3000/api/card/${card.id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
  
    // Se a resposta for OK, mostramos um toast
    toast({
      title: "Card deleted.",
      description: "The card has been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  
    // Redirecionando o usuário para a página inicial após a exclusão
    //window.location.href = '/';
    router.push('/form')
  };
  

  return (
    <Flex  justifyContent="center" alignItems="center">

      <Stack
        w="900px"
        direction="column"
        spacing={4}
        p={4}
        mt={10}
        border="1px solid"
        borderColor="blue.100"
        
        _hover={{
          borderColor: 'blue.300',
          boxShadow: '0 4px 6px rgba(160, 174, 192, 0.6)',
        }}
        rounded="lg"
      >
        <HStack spacing={2} mb={1}>
          {tags.split(',').map((tag, index) => (
            <Tag
              key={index}
              colorScheme='blue'
              borderRadius="full"
            >
              {tag}
            </Tag>
          ))}
        </HStack>
        <Box textAlign="left">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={handleTitleChange} w="100%"/>
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea value={content} onChange={handleContentChange} w="100%"/>
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={handleUsernameChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Created at</FormLabel>
            <Input type="date" value={createdAt} onChange={handleCreatedAtChange} placeholder={createdAt}/>
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Input type="text" value={tags} onChange={handleTagsChange} />
          </FormControl>
          <FormControl>
            <FormLabel>User Avatar</FormLabel>
            <Input type="text" value={userAvatar} onChange={handleUserAvatarChange} />
          </FormControl>
        </Box>
        <Box>
          <Avatar size="sm" title="Author" mb={2} src={card.userAvatar} />
          <Text fontSize="sm" fontWeight="bold">{username}</Text>
          <Text fontSize="sm" color="gray.500">{new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
        </Box>
        <Button colorScheme="yellow" onClick={updateCard}>Alterar</Button>
        <Button colorScheme="red" onClick={openDeleteDialog}>Excluir</Button>

        <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Card
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja realizar esta alteração ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
      </Stack>
    </Flex>
  );
}
