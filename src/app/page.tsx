import { DesignReview } from "@/components/review/DesignReview";
import { isDirection } from "@/components/review/directionIds";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { design } = await searchParams;
  return <DesignReview initial={isDirection(design) ? design : "a"} />;
}
