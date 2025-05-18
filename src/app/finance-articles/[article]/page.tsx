interface ArticleProps {
  title: string;
  description: string;
  introduction?: string;
}

export default function Article({ params }: { params: { article: string } }) {
  const { article } = params;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">{article}</div>
    </div>
  );
}
