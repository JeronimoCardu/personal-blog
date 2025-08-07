export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`http://localhost:8080/${id}`);
  const postInfo = await data.json();
  return (
    <h1>
      {id} - {postInfo.title}
    </h1>
  );
}
