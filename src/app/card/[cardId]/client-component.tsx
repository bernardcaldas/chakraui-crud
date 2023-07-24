// Dentro do diretório app/card/[cardId]/client-component.tsx
'use client'

import { useState } from 'react';
import { Box, Button, Text, Avatar, HStack, Tag, Stack, Textarea, Input, FormLabel, FormControl } from '@chakra-ui/react';

export default function ClientComponent({ card }) {
  const [contentState, setContentState] = useState(card.content);
  const [titleState, setTitleState] = useState(card.title);
  const [tagsState, setTagsState] = useState(card.tags);
  const [usernameState, setUsernameState] = useState(card.username);
  const [dateState, setDateState] = useState(card.created_at);

  const handleContentChange = (event) => {
    setContentState(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleState(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTagsState(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsernameState(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateState(event.target.value);
  };

  return (
    <Stack
      direction="column"
      spacing={4}
      p={4}
      border="1px solid"
      borderColor="blue.100"
      _hover={{
        borderColor: 'blue.300',
        boxShadow: '0 4px 6px rgba(160, 174, 192, 0.6)',
      }}
      rounded="lg"
    >
      <HStack spacing={2} mb={1}>
        {tagsState.split(',').map((tag, index) => (
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
          <Input 
            fontSize="xl" 
            fontWeight="bold"
            value={titleState}
            onChange={handleTitleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={contentState}
            onChange={handleContentChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Input 
            fontSize="sm" 
            value={tagsState}
            onChange={handleTagsChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input 
            fontSize="sm" 
            value={usernameState}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input 
            type="date"
            fontSize="sm" 
            value={dateState}
            onChange={handleDateChange}
          />
        </FormControl>
      </Box>
      <Box>
        <Avatar size="sm" title="Author" mb={2} src={card.userAvatar} />
        <Text fontSize="sm" fontWeight="bold">{usernameState}</Text>
        <Text fontSize="sm" color="gray.500">{new Date(dateState).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
      </Box>
      // Adicione mais campos do card conforme necessário
      <Button colorScheme="blue">Voltar</Button>
    </Stack>
  );
}
