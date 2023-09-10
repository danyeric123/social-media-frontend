import { AxiosError } from "axios";
import React, { useState } from "react";
import { Form, Button, FormControl, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { createPost, editPost } from "../../services/post";
import ErrorPanel from "../ErrorPanel";

const PostForm = () => {
  const location = useLocation();
  const initialPost = { title: "", content: "", categories: [] };
  if (location.state !== undefined) {
    const {
      title: titleProp,
      content: contentProp,
      categories: categoriesProp,
    } = location.state;
    initialPost.title = titleProp;
    initialPost.content = contentProp;
    initialPost.categories = categoriesProp;
  }
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [categories, setCategories] = useState<string[]>(
    initialPost.categories,
  );
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
      console.log(location.state);
      const response =
        location.state === undefined
          ? await createPost({ title, content, categories })
          : await editPost(location.state.ulid, title, content, categories);
      navigate(`/posts/${response.ulid}`, { state: { post: response } });
    } catch (error) {
      setIsError(true);
      setErrorMessage((error as AxiosError).message);
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
      {isError && (
        <ErrorPanel
          error={errorMessage}
          showError={isError}
          setShowError={setIsError}
        />
      )}
    </>
  );
};

export default PostForm;
