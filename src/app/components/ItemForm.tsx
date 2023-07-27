import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";

export interface newItem {
  title: string;
  tags: string;
  content: string;
  userAvatar: string;
  username: string;
  
}

interface ItemFormProps {
  onSubmit: (item: newItem) => void;
  onClose: () => void
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const toast = useToast()
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tags,
          content,
          userAvatar,
          username,
          created_at: createdAt,
        }),
      });
  
      if (response.ok) {
        const createdItem = await response.json();
        onSubmit(createdItem);
  
        setTitle("");
        setTags("");
        setContent("");
        setUserAvatar("");
        setUsername("");
        setCreatedAt("");

        toast({
          title: "Item adicionado.",
          description: "O item foi adicionado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose()
      } else {
        console.error("Failed to create item:", response.status);
      }
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Tags</FormLabel>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Content</FormLabel>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>User Avatar URL</FormLabel>
        <Input value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Created At</FormLabel>
        <Input value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default ItemForm;
