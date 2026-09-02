import { IPost } from "@/lib/type";
import { NewsCard } from "./NewsCard";
import { getPremiumNews } from "../../_actions/getPremiumNews";

export async function PremiumNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getPremiumNews({ query });

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No premium news found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {result.data.map((post: IPost) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}