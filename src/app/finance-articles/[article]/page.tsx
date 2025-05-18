export default function Article({ article }: { article: any }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">
        <h1 className="font-bold text-2xl">{article.title}</h1>
        <p>Welcome to the {article.title} article!</p>
      </div>
    </div>
  );
}
