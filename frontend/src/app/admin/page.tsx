import Link from "next/link";
import { PostType } from "../../../types/post";

export default async function Admin() {
  const data = await fetch("http://localhost:8080");
  const posts = await data.json();
  if (!data.ok) {
    console.log("error");
    return;
  }
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
            <button className="hover:underline cursor-pointer">delete</button>
          </div>
        </article>
      ))}
    </>
  );
}
