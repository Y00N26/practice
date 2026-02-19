"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const QUESTIONS = [
  {
    key: "people",
    label: "식사 인원",
    options: ["혼밥", "2인", "4인이상", "10인 이상 단체"],
  },
  {
    key: "price",
    label: "비용",
    options: ["1만원 이하", "1만원 초중반", "1만원 후반", "2만원"],
  },
  {
    key: "mood",
    label: "분위기",
    options: ["캐주얼", "분위기", "정갈함"],
  },
  {
    key: "distanceLabel",
    label: "거리",
    options: ["5분 이내", "10분 이내", "15분 이내"],
  },
] as const;

type AnswerState = {
  people?: string;
  price?: string;
  mood?: string;
  distanceLabel?: string;
};

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});

  const currentQuestion = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    const searchParams = new URLSearchParams();
    if (answers.people) searchParams.set("people", answers.people);
    if (answers.price) searchParams.set("price", answers.price);
    if (answers.mood) searchParams.set("mood", answers.mood);
    if (answers.distanceLabel)
      searchParams.set("distanceLabel", answers.distanceLabel);

    router.push(`/result?${searchParams.toString()}`);
  };

  const handlePrev = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const selectedValue = answers[currentQuestion.key];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-amber-100 px-4 py-8">
      <main className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        <header className="mb-6 flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600"
          >
            홈
          </button>
          <p className="font-medium">
            {step + 1} / {totalSteps}
          </p>
        </header>

        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-orange-400 transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <section className="mb-6 space-y-2">
          <p className="text-xs font-medium tracking-wide text-orange-500">
            Q{step + 1}.
          </p>
          <h1 className="text-xl font-semibold text-gray-900">
            {currentQuestion.label}
          </h1>
          <p className="text-xs text-gray-500">
            내 상황이랑 제일 비슷한 걸 골라 주세요.
          </p>
        </section>

        <div className="mb-6 space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = option === selectedValue;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  isSelected
                    ? "border-orange-400 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <span className="text-xs font-semibold text-orange-500">
                    선택됨
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <footer className="flex gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-medium text-gray-600 disabled:border-gray-100 disabled:text-gray-300"
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedValue}
            className="h-11 flex-[2] rounded-full bg-orange-500 text-sm font-semibold text-white shadow-md transition enabled:active:scale-[0.99] enabled:active:bg-orange-600 disabled:bg-orange-200"
          >
            {step === totalSteps - 1 ? "결과 보기" : "다음"}
          </button>
        </footer>
      </main>
    </div>
  );
}

