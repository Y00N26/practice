export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-amber-100 px-4 py-8">
      <main className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-medium tracking-wide text-amber-500">
            점심 뭐 먹지? 고민될 때
          </p>
          <h1 className="text-2xl font-bold leading-snug text-gray-900">
            딱 맞는 점심 식당을
            <br />
            질문 4개로 골라줘요
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            인원, 가격, 분위기, 거리만 고르면
            <br />
            내 조건에 맞는 식당을 바로 추천해줘요.
          </p>
        </div>

        <section className="mb-8 grid grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="rounded-2xl bg-orange-50 p-3">
            <p className="font-semibold text-orange-600">1시간 점심 추천</p>
            <p className="mt-1 text-[11px] leading-snug">
              정문 기준 도보권 식당을
              <br />
              추천해요.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3">
            <p className="font-semibold text-amber-600">TOP 3 추천</p>
            <p className="mt-1 text-[11px] leading-snug">
              가장 잘 맞는 식당 3곳을
              <br />
              순위로 보여줘요.
            </p>
          </div>
        </section>

        <a
          href="/survey"
          className="block w-full rounded-full bg-orange-500 py-4 text-center text-base font-semibold text-white shadow-md transition active:scale-[0.99] active:bg-orange-600"
        >
          설문 시작하기
        </a>
        <p className="mt-3 text-center text-[11px] text-gray-400">
          1분이면 끝나요. 로그인도 필요 없어요.
        </p>
      </main>
    </div>
  );
}

