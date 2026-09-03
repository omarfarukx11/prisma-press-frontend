import React, { Suspense } from 'react'
import { NewsSkeleton } from '../_components/news/NewsSkeleton'
import { PremiumNewsPage } from '../_components/news/PremiumNewsPage'
import NewsSearchbar from '../_components/news/NewsSearchbar'

const Premium = async ({searchParams } : {
  searchParams : Promise<{ [key : string]: string | string[] | undefined }>
}) => {
  return (
   <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-1 py-5">
          <h1 className="text-2xl font-semibold text-center">Premium News</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive stories for our subscribers.
          </p>
          <NewsSearchbar></NewsSearchbar>
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        <PremiumNewsPage searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default Premium