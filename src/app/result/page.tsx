"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DISTANCE_VALUE_TO_LABEL, recommendTop3 } from "@/lib/recommend";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const people = searchParams.get("people");
  const price = searchParams.get("price");
  const mood = searchParams.get("mood");
  const distanceLabel = searchParams.get("distanceLabel");

  const results = recommendTop3({
    people,
    price,
    mood,
    distanceLabel,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-amber-100 px-4 py-8">
      <main className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        <header className="mb-5 flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={() => router.push("/survey")}
            className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600"
          >
            다시 선택하기
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-[11px] font-medium text-gray-400"
          >
            홈으로
          </button>
        </header>

        <section className="mb-5">
          <p className="text-xs font-medium tracking-wide text-orange-500">
            점심 식당 추천
          </p>
          <h1 className="mt-1 text-xl font-semibold text-gray-900">
            이 조건에 어울리는 식당이에요
          </h1>
          <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
            인원, 비용, 분위기, 거리를 모두 고려해서
            <br />
            가장 잘 맞는 곳 3곳을 골랐어요.
          </p>
        </section>

        <section className="mb-4 rounded-2xl bg-gray-50 p-3 text-[11px] text-gray-600">
          <p className="mb-1 font-semibold text-gray-700">내가 고른 조건</p>
          <div className="flex flex-wrap gap-1.5">
            {people && (
              <span className="rounded-full bg-white px-2 py-1 text-[11px]">
                인원: {people}
              </span>
            )}
            {price && (
              <span className="rounded-full bg-white px-2 py-1 text-[11px]">
                비용: {price}
              </span>
            )}
            {mood && (
              <span className="rounded-full bg-white px-2 py-1 text-[11px]">
                분위기: {mood}
              </span>
            )}
            {distanceLabel && (
              <span className="rounded-full bg-white px-2 py-1 text-[11px]">
                거리: {distanceLabel}
              </span>
            )}
          </div>
        </section>

        <section className="space-y-3">
          {results.map((r, index) => (
            <article
              key={r.name}
              className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                {index + 1}위
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-900">
                  {r.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-gray-600">
                  <span className="rounded-full bg-white px-2 py-1">
                    #{r.people}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1">
                    #{r.price}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1">
                    #{r.mood}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1">
                    #{DISTANCE_VALUE_TO_LABEL[r.distance] ?? `${r.distance}분`}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {results.length === 0 && (
            <p className="rounded-2xl bg-gray-50 p-4 text-center text-xs text-gray-500">
              아직 선택한 조건이 없어요. 설문을 먼저 완료해 주세요.
            </p>
          )}
        </section>

        <button
          type="button"
          onClick={() => router.push("/survey")}
          className="mt-5 w-full rounded-full bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.99] active:bg-orange-600"
        >
          다시 설문하기
        </button>
      </main>
    </div>
  );
}

