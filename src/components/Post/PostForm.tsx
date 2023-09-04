import React, { useEffect, useState } from "react";
import { Form, Button, FormControl, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/post";
import ErrorPanel from "../ErrorPanel";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCategory(value);

    // Check if the input contains a comma and isn't empty
    if (value.trim() !== "" && value.includes(",")) {
      const newCategories = value
        .split(",")
        .map((category: string) => category.trim())
        .filter((category: string) => category !== ""); // Remove empty categories

      setCategories([...categories, ...newCategories]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, including title, content, and categories.
    // You can send this data to your backend or process it as needed.

    try {
      const response = await createPost({ title, content, categories });
      navigate(`/posts/${response.ulid}`, { state: { post: response } });
    } catch (error) {
      console.log("error");
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="categories">
          <Form.Label>Categories</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter categories (comma-separated)"
            value={newCategory}
            onChange={handleCategoryChange}
          />
          <div className="mb-3 mt-3">
            {categories.map((category, index) => (
              <Badge
                key={index}
                className="mr-2 mt-2"
                onClick={() => handleRemoveCategory(index)}
              >
                {category} <span>&times;</span>
              </Badge>
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {isError && <ErrorPanel error={errorMessage} showError={isError} />}
    </>
  );
};

export default PostForm;
