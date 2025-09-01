"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPost() {
  const [dataPost, setDataPost] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8080/${id}`)
      .then((res) => res.json())
      .then((data) => setDataPost(data));
  }, [id]);

  const handleEditPost = async () => {
    try {
      const data = await fetch(`http://localhost:8080/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPost),
      });
      if (!data.ok) throw new Error("error to update the post");
      router.back();
    } catch (e) {
      console.log("there is a error: ", e);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditPost();
      }}
      className="w-full"
    >
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="titleInput">
          Title:
        </label>
        <input
          className="my-2 border-1 border-gray-700 rounded-[.5rem] p-2"
          value={dataPost.title}
          id="titleInput"
          type="text"
          onChange={(e) => setDataPost({ ...dataPost, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="textInput">
          Text:
        </label>
        <input
          className="my-2 border-1 border-gray-700 rounded-[.5rem] p-2"
          value={dataPost.text}
          id="textInput"
          type="text"
          onChange={(e) => setDataPost({ ...dataPost, text: e.target.value })}
        />
      </div>
      <button
        className="rounded-[1rem] bg-[#182D56] cursor-pointer flex justify-self-center my-4 px-6 py-2 text-white"
        type="submit"
      >
        Editar
      </button>
    </form>
  );
}
