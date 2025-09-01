"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [newPost, setNewPost] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });

  const getDate = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const createPost = async () => {
    try {
      const today = getDate();
      const data = await fetch("http://localhost:8080", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          date: today,
          edited: false,
        }),
      });
      if (!data.ok) throw new Error("Error to create post");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost();
      }}
      className="w-full"
    >
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="titleInput">
          Title:
        </label>
        <input
          required
          className="my-2 border-1 border-gray-700 rounded-[.5rem] p-2"
          id="titleInput"
          type="text"
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="textInput">
          Text:
        </label>
        <input
          required
          className="my-2 border-1 border-gray-700 rounded-[.5rem] p-2"
          id="textInput"
          type="text"
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
        />
      </div>
      <button
        className="rounded-[1rem] bg-[#182D56] cursor-pointer flex justify-self-center my-4 px-6 py-2 text-white"
        type="submit"
      >
        Crear
      </button>
    </form>
  );
}
