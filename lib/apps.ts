// 출시 앱. 아이콘·스크린샷은 App Store 등록 이미지를 public/apps/<slug>/ 에 받아 둔 것(icon.jpg, 1~3.jpg).
const store = (id: number) => `https://apps.apple.com/kr/app/id${id}`;

export const apps = [
  {
    slug: "mossol",
    name: "모쏠 탈출기",
    desc: "100일 연애 시뮬레이션",
    category: "게임",
    status: "iOS 출시",
    note: "앱스토어 무료 게임 91위 (2026년 11월)",
    url: store(6815030883),
  },
  {
    slug: "wickhollow",
    name: "윅할로우",
    desc: "귀여운 등불 퍼즐",
    category: "퍼즐 게임",
    status: "iOS 출시 · 앱인토스 예정",
    note: "",
    url: store(6824525304),
  },
  {
    slug: "teumteum",
    name: "틈틈",
    desc: "초등 하교, 학원 픽업 캘린더",
    category: "생활",
    status: "iOS 출시",
    note: "",
    url: store(6830699253),
  },
  {
    slug: "ribatto",
    name: "Ribatto",
    desc: "테니스 영상 하이라이트",
    category: "스포츠",
    status: "iOS 출시",
    note: "",
    url: store(6809492241),
  },
  {
    slug: "fcscope",
    name: "FC Scope",
    desc: "FC온라인 전적검색, 스쿼드 진단",
    category: "게임 도구",
    status: "iOS 출시",
    note: "게임사와 무관한 비공식 앱입니다.",
    url: store(6812981907),
  },
].map((a) => ({ ...a, icon: `/apps/${a.slug}/icon.jpg`, shots: [1, 2, 3].map((n) => `/apps/${a.slug}/${n}.jpg`) }));
