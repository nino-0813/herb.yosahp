import type { Metadata } from "next";
import { Headline, CtaBand, Footer } from "@/components/ui";

const TITLE = "オーナー紹介｜各店舗のオーナー";
const DESC = "尾道・福山4店舗、それぞれのオーナーをご紹介。自分たちも揺らいだ経験があるから、深く寄り添える。よもぎ蒸し（ハーブ蒸し）サロンON:U。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/staff" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.jpg"] },
};

/** 各店舗のオーナー紹介 */
export const OWNERS = [
  {
    name: "渡辺 宏恵",
    roman: "HIROE WATANABE",
    role: "cocolu hairsalon",
    bio: "尾道市栗原町の美容室cocoluのオーナー。髪を整える外見のケアと、ハーブ蒸しで内側から整えるケアの両方に寄り添います。",
    photo: "/staff/watanabe.jpg",
  },
  {
    name: "物部 沙織",
    roman: "SAORI MONOBE",
    role: "Cherie CoCo",
    bio: "福山市松永町のCherie CoCoのオーナー。顔なじみの安心感の中で、気軽に体を温めて本来の自分を取り戻せる場所をつくっています。",
    photo: "/staff/monobe.jpg",
  },
  {
    name: "花岡 樹里",
    roman: "JURI HANAOKA",
    role: "YOSA PARK Larimar（新涯店）",
    bio: "福山市新涯町のYOSA PARK Larimarのオーナー。冷えやむくみ、女性特有の揺らぎに寄り添う温活ケアをお届けします。",
    photo: "/staff/hanaoka.jpg",
  },
  {
    name: "高戸 真理",
    roman: "MARI TAKATO",
    role: "Larimar（沼隈店）",
    bio: "福山市沼隈町のLarimarのオーナー。落ち着いた個室で、ハーブ蒸しと水素・酸素発生器によるケアをお届けします。",
    photo: "/staff/takato.jpg",
  },
];

export default function Staff() {
  return (
    <>
      <Headline en="owners" jp="各店舗のオーナー" />
      <div className="container">
        <p className="lede">
          自分たちも揺らいだ経験があるから、深く寄り添える。
          <br />
          裏表のない言葉で、あなたが本来の自分を取り戻す時間に寄り添います。
        </p>
      </div>

      <div className="grid-2 owners-grid">
        {OWNERS.map((s) => (
          <div className="staff-card" key={s.roman}>
            <div className="staff-card__photo"><img src={s.photo} alt={`${s.role}／${s.name}`} /></div>
            <div className="staff-card__name">{s.name}</div>
            <div className="staff-card__roman">{s.roman}</div>
            <div className="staff-card__role">{s.role}</div>
            <div className="staff-card__bio">{s.bio}</div>
          </div>
        ))}
      </div>

      <div className="spacer" />
      <CtaBand />
      <Footer />
    </>
  );
}
