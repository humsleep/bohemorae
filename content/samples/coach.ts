import type { Sample } from "@/lib/samples";

// 가상의 전문가. 이름·경력·숫자·후기는 모두 지어낸 값이다.
const sample: Sample = {
  slug: "coach",
  type: "강연자·코치",
  category: "개인",
  plan: 1,
  theme: "stage",
  name: "강서윤",
  tagline: "자기 이름으로 일하는 사람의 브랜딩을 돕습니다",
  intro:
    "강연, 코칭, 책을 한 사람의 이름 아래 묶는 전문가 개인 브랜딩 사이트입니다. 검은 무대 위에 큰 명조 이름과 형광 연두 한 줄기로 무대에 선 사람처럼 보이게 합니다.",
  phone: "010-0000-0000",
  cta: "프로그램 보기",
  links: [
    { kind: "email", label: "이메일", handle: "talk@example.com", href: "mailto:talk@example.com" },
    { kind: "instagram", label: "인스타그램", handle: "@seoyun.brand", href: "https://www.instagram.com/" },
    { kind: "youtube", label: "유튜브", handle: "강서윤 TV", href: "https://www.youtube.com/" },
    { kind: "blog", label: "블로그", handle: "브랜딩 노트", href: "https://blog.naver.com/" },
  ],
  stats: [
    ["320회+", "기업·기관 강연"],
    ["1,800명", "1:1 코칭"],
    ["2권", "출간 도서"],
    ["11년", "브랜드 컨설팅"],
  ],
  sections: [
    {
      kind: "about",
      title: "회사 이름이 아니라 내 이름으로",
      body: "11년 동안 브랜드 컨설턴트로 일하다, 지금은 프리랜서와 1인 사업자의 퍼스널 브랜딩을 돕습니다. 무엇을 잘하는지, 누구에게 말할지, 어떤 말로 소개할지를 함께 정합니다.",
    },
    {
      kind: "cards",
      title: "하는 일",
      items: [
        ["강연", "퍼스널 브랜딩, 커리어 전환. 기업·대학·공공기관 90분 과정"],
        ["1:1 코칭", "4회 과정. 내 일의 한 문장 소개와 포트폴리오 구성을 완성합니다"],
        ["팀 워크숍", "조직 안에서 전문가로 보이는 법. 반나절·종일 과정"],
        ["책", "『이름으로 일하기』, 『한 문장 소개법』"],
      ],
    },
    {
      kind: "prices",
      title: "프로그램 안내",
      groups: [
        {
          name: "개인",
          items: [
            ["1:1 코칭 4회", "120만원"],
            ["단회 진단 세션(90분)", "35만원"],
          ],
        },
        {
          name: "기업·기관",
          items: [
            ["강연 90분", "협의"],
            ["팀 워크숍", "협의"],
          ],
        },
      ],
    },
    {
      kind: "reviews",
      title: "먼저 만난 분들",
      items: [
        ["7년을 하고도 내 일을 한 문장으로 말하지 못했는데, 이제는 첫 미팅이 달라졌습니다.", "프리랜서 UX 디자이너"],
        ["강연이 끝나고 질문이 30분 넘게 이어졌습니다. 다음 분기에 다시 모십니다.", "IT 기업 인사 담당자"],
      ],
    },
    {
      kind: "contact",
      title: "강연·코칭 문의",
      body: "원하는 프로그램, 대상, 일정을 적어 보내 주세요. 이틀 안에 직접 답장드립니다.",
      cta: "문의하기",
    },
  ],
};

export default sample;
