"use client";
import Link from "next/link";
import { PostType } from "../../../types/post";
import { useEffect, useState } from "react";

export default function Admin() {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      const data = await fetch(`http://localhost:8080/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      if (!data.ok) throw new Error("Error to delete post");
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.log("There is a error: ", e);
    }
  };

  return (
    <>
      {posts.map((post: PostType) => (
        <article
          key={post.id}
          className="flex py-4 my-2 hover:bg-gray-100 cursor-pointer px-2 border-l-1 border-black justify-between"
        >
          <p>{post.title}</p>
          <div className="flex gap-4">
            <Link href={`/post/${post.id}/edit`}>
              <button className="hover:underline cursor-pointer">edit</button>
            </Link>
            <button
              onClick={() => handleDeletePost(String(post.id))}
              className="hover:underline hover:text-red-500 cursor-pointer"
            >
              delete
            </button>
          </div>
        </article>
      ))}
    </>
  );
}
