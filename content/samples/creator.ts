import type { Sample } from "@/lib/samples";

// 가상의 크리에이터. 이름·채널·숫자·브랜드 후기는 모두 지어낸 값이다.
const sample: Sample = {
  slug: "creator",
  type: "인플루언서",
  category: "개인",
  plan: 0,
  theme: "pop",
  name: "오늘도 해나",
  tagline: "퇴근하고 15분, 냉장고 털어 만드는 집밥 크리에이터",
  intro:
    "채널 소개, 대표 콘텐츠, 협업 단가, 문의를 한 장에 담은 인플루언서용 미디어킷 사이트입니다. 원색 면과 굵은 테두리, 흐르는 숫자 띠로 화면에서 바로 눈에 띕니다.",
  phone: "010-0000-0000",
  cta: "협업 안내 보기",
  // 가상 계정이라 각 서비스 첫 화면으로만 연결한다
  links: [
    { kind: "instagram", label: "인스타그램", handle: "@haena.cooks", href: "https://www.instagram.com/" },
    { kind: "youtube", label: "유튜브", handle: "오늘도 해나", href: "https://www.youtube.com/" },
    { kind: "email", label: "협업 메일", handle: "hello@example.com", href: "mailto:hello@example.com" },
    { kind: "kakao", label: "카카오톡", handle: "오픈채팅", href: "https://open.kakao.com/" },
  ],
  stats: [
    ["18만", "유튜브 구독자"],
    ["32만", "인스타그램 팔로워"],
    ["1,200+", "올린 레시피"],
    ["40곳+", "함께한 브랜드"],
  ],
  sections: [
    {
      kind: "about",
      title: "해나는 이런 걸 만들어요",
      body: "재료 다섯 가지, 조리 15분, 설거지는 냄비 하나. 혼자 사는 직장인이 정말 해 먹을 수 있는 집밥만 올립니다. 구독자의 70%가 25~34세 1인 가구입니다.",
    },
    {
      kind: "cards",
      title: "채널과 콘텐츠",
      items: [
        ["유튜브 · 주 2회", "15분 집밥 레시피 영상. 평균 조회수 9만 회"],
        ["인스타그램 · 매일", "릴스 레시피와 장보기 기록. 저장 수가 많은 계정"],
        ["레시피 책", "『냄비 하나 집밥』 2쇄"],
        ["원데이 쿠킹 클래스", "한 달에 두 번, 12명 정원"],
      ],
    },
    {
      kind: "prices",
      title: "협업 안내",
      groups: [
        {
          name: "브랜디드 콘텐츠",
          items: [
            ["유튜브 전용 영상", "협의"],
            ["유튜브 PPL(60초 이내)", "협의"],
            ["인스타그램 릴스", "협의"],
          ],
        },
        {
          name: "그 밖의 협업",
          items: [
            ["레시피 개발", "협의"],
            ["쿠킹 클래스·강연", "협의"],
            ["2차 활용 기간", "기본 3개월"],
          ],
        },
      ],
    },
    {
      kind: "reviews",
      title: "함께한 브랜드가 남긴 말",
      items: [
        ["영상이 올라간 주에 상세페이지 방문이 평소의 네 배였습니다.", "주방용품 브랜드 마케터"],
        ["레시피가 진짜 만들어 먹을 수 있는 거라 댓글 반응이 달랐어요.", "식품 브랜드 담당자"],
        ["기획부터 촬영까지 약속한 날짜를 한 번도 넘기지 않았습니다.", "생활용품 브랜드 담당자"],
      ],
    },
    {
      kind: "contact",
      title: "협업 문의",
      body: "브랜드명, 제품, 원하는 채널과 일정을 보내 주시면 미디어킷 PDF와 함께 사흘 안에 답장드립니다.",
      cta: "협업 문의하기",
    },
  ],
};

export default sample;
