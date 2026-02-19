export type Restaurant = {
  name: string;
  people: string;
  price: string;
  mood: string;
  distance: number;
};

export const RESTAURANTS: Restaurant[] = [
  { name: "엄마손칼국수", people: "4인이상", price: "1만원 이하", mood: "캐주얼", distance: 5 },
  { name: "남경", people: "10인 이상 단체", price: "2만원", mood: "캐주얼", distance: 5 },
  { name: "송탄부대찌개", people: "10인 이상 단체", price: "1만원 초중반", mood: "캐주얼", distance: 5 },
  { name: "마고피자", people: "4인이상", price: "2만원", mood: "캐주얼", distance: 10 },
  { name: "신동랩", people: "4인이상", price: "1만원 후반", mood: "정갈함", distance: 5 },
  { name: "스시마리오", people: "4인이상", price: "1만원 후반", mood: "정갈함", distance: 10 },
  { name: "꿈꾸는 다락방", people: "4인이상", price: "1만원 후반", mood: "분위기", distance: 15 },
  { name: "신림동순대타운", people: "4인이상", price: "1만원 후반", mood: "캐주얼", distance: 15 },
  { name: "the 53", people: "10인 이상 단체", price: "1만원 이하", mood: "정갈함", distance: 15 },
  { name: "크라이치즈버거", people: "4인이상", price: "1만원 초중반", mood: "캐주얼", distance: 7 },
];

export const DISTANCE_LABEL_TO_VALUE: Record<string, number> = {
  "5분 이내": 5,
  "10분 이내": 10,
  "15분 이내": 15,
};

export const DISTANCE_VALUE_TO_LABEL: Record<number, string> = {
  5: "5분 이내",
  10: "10분 이내",
  15: "15분 이내",
};

type Answers = {
  people?: string | null;
  price?: string | null;
  mood?: string | null;
  distanceLabel?: string | null;
};

const WEIGHTS = {
  people: 40,
  price: 30,
  distance: 20,
  mood: 10,
};

export function recommendTop3(answers: Answers): Restaurant[] {
  const { people, price, mood, distanceLabel } = answers;
  const distanceValue =
    distanceLabel && DISTANCE_LABEL_TO_VALUE[distanceLabel]
      ? DISTANCE_LABEL_TO_VALUE[distanceLabel]
      : undefined;

  // 완전 일치 필터
  const perfectMatches = RESTAURANTS.filter((r) => {
    return (
      (!people || r.people === people) &&
      (!price || r.price === price) &&
      (!mood || r.mood === mood) &&
      (!distanceValue || r.distance === distanceValue)
    );
  });

  if (perfectMatches.length > 0) {
    return perfectMatches
      .slice()
      .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name))
      .slice(0, 3);
  }

  // 가중치 점수 계산
  const scored = RESTAURANTS.map((r) => {
    let score = 0;
    if (people && r.people === people) score += WEIGHTS.people;
    if (price && r.price === price) score += WEIGHTS.price;
    if (mood && r.mood === mood) score += WEIGHTS.mood;
    if (distanceValue && r.distance === distanceValue)
      score += WEIGHTS.distance;

    return { restaurant: r, score };
  });

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.restaurant.distance !== b.restaurant.distance) {
        return a.restaurant.distance - b.restaurant.distance;
      }
      return a.restaurant.name.localeCompare(b.restaurant.name);
    })
    .slice(0, 3)
    .map((item) => item.restaurant);
}

