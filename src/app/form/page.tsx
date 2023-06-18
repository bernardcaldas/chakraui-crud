"use client"
import { useState } from "react";
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

interface Item {
  title: string;
  content: string;
  tags: string[];
  username: string;
  avatarUrl: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleAddItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
    setSelectedItem(item);
  };

 

  const handleSelectItem = (updatedItem: Item) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDeleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  

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
          {items.map((item, index) => (
            <ItemCard key={index} item={item} onSelect={handleSelectItem} onDelete={handleDeleteItem} />

          ))}
        </SimpleGrid>
        {/* {selectedItem && (
          <Box mt="4">
            <Heading size="md">Selected Item</Heading>
            <p>{selectedItem.title}</p>
          </Box>
        )} */}
      </Box>
    </Center>
  );
};

export default Home;
