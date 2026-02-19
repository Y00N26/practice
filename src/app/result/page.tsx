import { recommendTop3 } from "@/lib/recommend";
import ResultClient from "./result-client";

export const dynamic = "force-dynamic";

type ResultPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function ResultPage({ searchParams }: ResultPageProps) {
  const getParam = (key: string): string | undefined => {
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0];
    return value ?? undefined;
  };

  const people = getParam("people");
  const price = getParam("price");
  const mood = getParam("mood");
  const distanceLabel = getParam("distanceLabel");

  const results = recommendTop3({
    people,
    price,
    mood,
    distanceLabel,
  });

  return (
    <ResultClient
      people={people}
      price={price}
      mood={mood}
      distanceLabel={distanceLabel}
      results={results}
    />
  );
}

