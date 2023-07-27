"use client"
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";
import { newItem } from "../components/ItemForm";
import { SearchIcon } from "@chakra-ui/icons";

interface Item {
  id?: number;
  tags: string;
  title: string;
  content: string;
  userAvatar: string;
  username: string;
  created_at?: string;
}

async function getData() {
  const res = await fetch('http://localhost:3000/api/card')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default function Home() {
  
  //const {items} = await getData()
  const [searchQuery, setSearchQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setItems(data);
    })();
  }, []);

  const handleAddItem = (item: newItem) => {
    setItems((prevItems) => [...prevItems, item]);
    setSelectedItem(item);
  };

  const handleSelectItem = (updatedItem: Item) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  // const deleteItem = async (id: Number) => {
  //   const response = await fetch(`http://localhost:3000/api/card/${id}`, {
  //     method: 'DELETE',
  //   });
  //   console.log(response); // Adicione isso aqui
  
  //   if (!response.ok) {
  //     throw new Error(`Failed to delete item with id ${id}`);
  //   }
  
  //   setItems(items.filter(item => item.id !== id));
  // };

  const deleteItem = async (id: Number) => {
    const response = await fetch(`/api/card/${id}`, {
      method: 'DELETE',
    });
  
    console.log('Response:', response); // Adicione isso aqui
  
    // Verifique se a resposta tem um corpo e, em caso afirmativo, registre-o.
    if (response.headers.get('content-type')?.includes('application/json')) {
      const responseBody = await response.json();
      console.log('Response body:', responseBody);
    }
  
    if (!response.ok) {
      throw new Error(`Failed to delete item with id ${id}`);
    }
  
    setItems(items.filter(item => item.id !== id));
  };


  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.toLowerCase().includes(searchQuery.toLowerCase())

    );
 
  return (
    <Center bg={"blackAlpha.10"}>
      <Box w="50%">
        <Heading mb="4">My Items</Heading>
        <Button onClick={onOpen} colorScheme="teal" mb="4">
          Add Item +
        </Button>
        <InputGroup>
          <Input 
            placeholder="Search..."
            value={searchQuery} 
            onChange={event => setSearchQuery(event.target.value)}
          />
          <InputRightElement>
            <SearchIcon color="gray.500" />
          </InputRightElement>
        </InputGroup>
        

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ItemForm onSubmit={handleAddItem} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <SimpleGrid columns={1} spacing="4" mt={5}>
            {filteredItems.filter(item => item.id !== undefined).map((item: Item, index: number) => (  // <--- ALTERE ISTO
            <ItemCard key={index} item={item} onSelect={handleSelectItem} onDelete={deleteItem}  />
        ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
}
