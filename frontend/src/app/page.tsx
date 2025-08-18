import Link from "next/link";
import { PostType } from "../../types/post";

export default async function Page() {
  const data = await fetch("http://localhost:8080");
  const posts = await data.json();
  if (!data.ok) {
    console.log("error");
    return;
  }
  return (
    <main>
      {posts.map((post: PostType) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <article className=" cursor-pointer hover:bg-gray-200 flex items-center justify-between p-4 border-b-1 border-black">
            <h1 className="text-2xl">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}
