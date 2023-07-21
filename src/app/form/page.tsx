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
} from "@chakra-ui/react";
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";
import { newItem } from "../components/ItemForm";

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

  const handleDeleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  async function deleteItem(id: number) {
    try {
      const response = await fetch(`/api/card/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
  
      const deletedItem = await response.json();  // only do this if you expect a response body
      setItems(prevItems => prevItems.filter(item => item.id !== deletedItem.id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  }
  
  

  
  
  return (
    <Center>
      <Box w="50%">
        <Heading mb="4">My Items</Heading>
        <Button onClick={onOpen} colorScheme="teal" mb="4">
          Add Item
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ItemForm onSubmit={handleAddItem} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <SimpleGrid columns={1} spacing="4">
                {items.filter(item => item.id !== undefined).map((item: Item, index: number) => (
          <ItemCard key={index} item={item} onSelect={handleSelectItem} onDelete={deleteItem} />
        ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
}
