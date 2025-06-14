import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useArticle = () => {
  const [errors, setErrors] = useState(null);

  const createArticle = async (articleData, token) => {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: articleData }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Fail to create article");

      return data.article;
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  // Updata Article
  const updateArticle = async (slug, article, token) => {
    const cleanArticle = {
      ...article,
      tagList: article.tagList.map((tag) => tag.trim()).filter(Boolean),
    };


    try {
      const response = await fetch(`${API_URL}/articles/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: cleanArticle }),
      });

      if (!response.ok) throw new Error("Update failed");
      const data = await response.json();
      return data.article;
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  // Delete article by slug
  const deleteArticle = async (slug, token) => {
    try {
      const response = await fetch(`${API_URL}/articles/${slug}`, {
        method: "DELETE",
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error("Deteting is failed");

      // const contentType = response.headers.get('Content-Type'); // null

      // if (contentType && contentType.includes('application/json')) {
      // const data = await response.json();
      // return data;
      // } else {
      // return null; // ✅ No JSON body to parse
      // }
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  // Link & unlike button
  const onFavorite = async (method, slug, token) => {
    try {
      const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) throw new Error("Server problem");
      const result = await response.json();
      return result;
    } catch (error) {
      setErrors(error.message);
      throw error;
    }
  };

  return { createArticle, errors, updateArticle, deleteArticle, onFavorite };
};

export default useArticle;
