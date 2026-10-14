import { BlogListSkeleton } from "@/app/ui/my-skeleton";

export default function SkeletonPage() {
  return (
    <main style={{ padding: "24px" }}>
      <h1>Skeleton Loading</h1>

      <div className="mt-4">
        <BlogListSkeleton />
      </div>
    </main>
  );
}