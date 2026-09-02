export function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="w-100 h-50 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}