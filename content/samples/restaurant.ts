import type { Sample } from "@/lib/samples";

const sample: Sample = {
  slug: "restaurant",
  type: "식당",
  category: "매장",
  plan: 0,
  theme: "hearty",
  name: "솥밥집 다온채",
  tagline: "주문하면 짓기 시작하는 솥밥",
  intro:
    "메뉴와 가격, 예약 전화를 가장 먼저 보여주는 식당용 1페이지 디자인입니다. 붉은 포인트 색으로 든든한 인상을 줍니다.",
  phone: "031-000-0000",
  cta: "메뉴 보기",
  sections: [
    {
      kind: "about",
      title: "갓 지은 밥 한 솥",
      body: "다온채는 주문이 들어오면 1인용 솥에 밥을 짓습니다. 15분쯤 걸리지만 그만큼 따뜻하게 나갑니다. 반찬은 매일 아침 여섯 가지를 새로 만듭니다.",
    },
    {
      kind: "prices",
      title: "메뉴",
      groups: [
        {
          name: "솥밥",
          items: [
            ["가지 솥밥", "12,000원"],
            ["전복 솥밥", "17,000원"],
            ["스테이크 솥밥", "16,000원"],
          ],
        },
        {
          name: "곁들임",
          items: [
            ["된장찌개", "3,000원"],
            ["계란말이", "7,000원"],
          ],
        },
      ],
    },
    {
      kind: "reviews",
      title: "손님들의 말",
      items: [
        ["누룽지까지 먹고 나오면 든든합니다.", "점심 단골"],
        ["부모님 모시고 가기 좋은 집이에요.", "가족 손님"],
      ],
    },
    {
      kind: "info",
      title: "영업시간과 오시는 길",
      hours: [
        ["점심", "11:30 ~ 15:00"],
        ["저녁", "17:00 ~ 21:00"],
        ["휴무", "매주 일요일"],
      ],
      address: "경기도 용인시 수지구 샘플로 56, 1층",
    },
    {
      kind: "contact",
      title: "예약",
      body: "6인 이상은 하루 전까지 전화로 예약해 주세요.",
      cta: "예약 전화",
    },
  ],
};

export default sample;
