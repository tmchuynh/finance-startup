interface ArticleProps {
  title: string;
  description: string;
  introduction?: string;
}

export default function Article({ article }: { article: ArticleProps }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">
        <h1 className="font-bold text-2xl">{article.title}</h1>
        <p>{article.description}</p>
        {article.introduction && (
          <div className="mt-4">
            <h2 className="font-semibold text-xl">Introduction</h2>
            <p>{article.introduction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
