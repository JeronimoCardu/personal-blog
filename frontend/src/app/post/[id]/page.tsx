import BackButton from "@/components/BackButton";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`http://localhost:8080/${id}`);
  const postInfo = await data.json();

  return (
    <article className="relative p-4">
      <div className="flex justify-between items-center">
        <BackButton />
        <p>{postInfo.date}</p>
      </div>
      <h1 className="text-3xl text-right font-bold">
        <span className="text-sm mr-2 text-gray-500 font-thin">
          {postInfo.edited && "edited"}
        </span>
        {postInfo.title}
      </h1>
      <p className="mt-6 text-gray-800">{postInfo.text}</p>
    </article>
  );
}
