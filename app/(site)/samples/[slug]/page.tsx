import { permanentRedirect } from "next/navigation";

// 예전 샘플 소개 페이지 주소. 샘플은 이제 바로 데모(샘플 사이트 그대로)로 연다.
export default async function SamplePage(props: PageProps<"/samples/[slug]">) {
  permanentRedirect(`/demo/${(await props.params).slug}`);
}
