/* eslint-disable react/no-unescaped-entities */
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios.js";

export const FullPost = () => {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Ошибка при получении статьи");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={post._id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
        <p>{post.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
