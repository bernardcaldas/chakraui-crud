import { Box, VStack, Stack, Link, Text, Tag, Avatar, useColorModeValue, HStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormLabel } from "@chakra-ui/react";
import { GoChevronRight } from 'react-icons/go';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import {default as NextLink} from "next/link";
import { GetServerSideProps } from "next";




interface Item {
  id?: number;
  tags: string;
  title: string;
  content: string;
  userAvatar: string;
  username: string;
  created_at?: string;
}

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  onDelete: (id: number) => void; // Adicione esta linha

}

const getCards = async () => {
  const res = await fetch('localhost:3000/api/card')
  return res.json()
}


const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [username, setUsername] = useState(item.username);
  const [createdAt, setCreatedAt] = useState(item.created_at);
  const [userAvatar, setUserAvatar] = useState(item.userAvatar)
  const [items, setItems] = useState<Item[]>([]);

  const handleTitleChange = (value: string) => setTitle(value);
  const handleContentChange = (value: string) => setContent(value);
  const handleUsernameChange = (value: string) => setUsername(value);
  const handleCreatedAtChange = (value: string) => setCreatedAt(value);
  const handleUserAvatarChange = (value: string) => setUserAvatar(value);

// função chamada na api 

  const fetchItems = async () => {
    const response = await fetch("/api/card");
    const items: Item[] = await response.json();
    setItems(items);
  };


  useEffect(()=> {
    fetchItems();
    setTitle(item.title);
    setContent(item.content);
    setUsername(item.username);
    setCreatedAt(item.created_at);
    setUserAvatar(item.userAvatar);
    
  },[item])

  const handleSubmit = () => {
    const updateItem = {
      ...item,
      title,
      content,
      username,
      userAvatar,
      created_at: createdAt,
    };
    onSelect(updateItem);
    onClose();
  };
  

  return (
    <Stack
      direction="column"
      spacing={4}
      p={4}
      bg={useColorModeValue('gray.100', 'gray.800')}
      border="1px solid"
      borderColor="blue.100"
      _hover={{
        borderColor: 'blue.300',
        boxShadow: useColorModeValue(
          '0 4px 6px rgba(160, 174, 192, 0.6)',
          '0 4px 6px rgba(9, 17, 28, 0.9)'
        )
      }}
      rounded="lg"
    >
     <HStack spacing={2} mb={1}>
        {item.tags.split(',').map((tag, index) => (
          <Tag
            key={index}
            colorScheme={useColorModeValue('blackAlpha', 'gray')}
            borderRadius="full"
          >
            {tag}
          </Tag>
        ))}
      </HStack>
      <Box textAlign="left">
        <Link
          fontSize="xl"
          lineHeight={1.2}
          fontWeight="bold"
          w="100%"
          _hover={{ color: 'blue.400', textDecoration: 'underline' }}
          onClick={() => onSelect(item)}
        >
          {item.title}
        </Link>
        <Text fontSize="md" color="gray.500" noOfLines={2} lineHeight="normal">
          {item.content}
        </Text>
      </Box>
      <Box>
        <NextLink href={`/card/${item.id}`} passHref>
        
        <Avatar size="sm" title="Author" mb={2} src={item.userAvatar} />
          <Stack justify="space-between" direction={{ base: 'column', sm: 'row' }}>
            <Box>
              <Text fontSize="sm" fontWeight="bold">
                {item.username}
              </Text>
              <Text fontSize="sm" color="gray.500">
                
                {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              </Text>
            </Box>
            <HStack
              //as={Link}
              spacing={8}
              p={1}
              alignItems="center"
              height="2rem"
              w="max-content"
              margin="auto 0"
              rounded="md"
            >
                <Link
                color="blue.400"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                onClick={onOpen}
                >
              </Link>
                <Text fontSize="sm"> Read more</Text>
              
              <GoChevronRight size={5}/>
              
            </HStack>
          </Stack>
        </NextLink>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {/* <Text fontWeight="bold">Title: {item.title}</Text> */}
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                defaultValue={item.title}
                onChange={(e) => handleTitleChange(e.target.value)} 

              />
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                defaultValue={item.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                defaultValue={item.username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                
              />
              <FormLabel>Created at:</FormLabel>
              <Input
                type="text"
                defaultValue={item.created_at}
                onChange={(e) => handleCreatedAtChange(e.target.value)}
              />
              <FormLabel>Tags:</FormLabel>
              <HStack spacing={2} mb={1}>
                {item.tags.split(',').map((tag, index) => (
                  <Tag
                    key={index}
                    colorScheme={useColorModeValue('blackAlpha', 'gray')}
                    borderRadius="full"
                  >
                    {tag.trim()} {/* Usamos trim() para remover quaisquer espaços em branco antes ou depois da tag */}
                  </Tag>
                ))}
              </HStack>

            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSubmit}>
                Edit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Stack>
  );
};

export default ItemCard;

