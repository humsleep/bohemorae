import { Black_Han_Sans, Gowun_Batang, Hahmlet, IBM_Plex_Sans_KR, Nanum_Myeongjo } from "next/font/google";

// 제목용 웹글꼴. 본문은 Pretendard(layout.tsx). 한글은 글자 범위별로 쪼개져 있어 쓰인 묶음만 내려받는다.
// 테마가 --font-display로 골라 쓴다(lib/themes.ts).
// next/font는 옵션을 글자 그대로 적어야 해서 줄마다 반복한다
const hahmlet = Hahmlet({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-hahmlet" });
const gowun = Gowun_Batang({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-gowun" });
const myeongjo = Nanum_Myeongjo({ subsets: ["latin"], display: "swap", preload: false, weight: ["700", "800"], variable: "--font-myeongjo" });
const blackhan = Black_Han_Sans({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-blackhan" });
const plex = IBM_Plex_Sans_KR({ subsets: ["latin"], display: "swap", preload: false, weight: ["500", "700"], variable: "--font-plex" });

export const fontVars = [hahmlet, gowun, myeongjo, blackhan, plex].map((f) => f.variable).join(" ");
