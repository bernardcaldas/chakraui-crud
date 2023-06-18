import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

interface ItemFormProps {
  onSubmit: (item: Item) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = () => {
    onSubmit({
      id: Math.random(), // This should be replaced with a real ID in a real application
      title,
      tags: tags.split(",").map(tag => tag.trim()), // Assume tags are entered as comma-separated values
      content,
      userAvatar,
      username,
      created_at: createdAt,
    });
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
