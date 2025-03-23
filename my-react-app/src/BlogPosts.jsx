import React, { useState, useEffect } from "react";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]); // To store the posts
  const [error, setError] = useState(null); // To store any error messages
  const [loading, setLoading] = useState(true); // To manage the loading state

  useEffect(() => {
    // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data); // Update the state with the fetched posts
        setLoading(false); // Turn off the loading state
      } catch (error) {
        setError(error.message); // Set the error message in case of failure
        setLoading(false); // Turn off loading in case of error
      }
    };

    fetchPosts();
  }, []); // Empty array ensures the effect only runs once after initial render

  // UI rendering logic
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
