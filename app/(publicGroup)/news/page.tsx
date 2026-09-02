import { Suspense } from "react";
import { NewsSkeleton } from "../_components/news/NewsSkeleton";
import { PublicNewsPage } from "../_components/news/PublicNewsPage";


const NewsPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-1 py-5">
          <h1 className="text-2xl font-semibold text-center">News</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive stories for our subscribers.
          </p>
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        <PublicNewsPage></PublicNewsPage>
      </Suspense>
    </div>
  );
};

export default NewsPage;