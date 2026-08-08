import { Headline, CtaBand, Footer } from "@/components/ui";

/** 各店舗のオーナー紹介 */
export const OWNERS = [
  {
    name: "渡辺 宏恵",
    roman: "HIROE WATANABE",
    role: "cocolu hairsalon",
    bio: "尾道市栗原町の美容室cocoluのオーナー。髪を整える外見のケアと、よもぎ蒸しで内側から整えるケアの両方に寄り添います。",
    photo: "/stores/cocolu/cocolu-1.jpg",
  },
  {
    name: "物部 沙織",
    roman: "SAORI MONOBE",
    role: "Cherie CoCo",
    bio: "福山市松永町のCherie CoCoのオーナー。顔なじみの安心感の中で、気軽に体を温めて本来の自分を取り戻せる場所をつくっています。",
    photo: "/stores/cherie/cherie-1.jpg",
  },
  {
    name: "花岡 樹里",
    roman: "JURI HANAOKA",
    role: "YOSA PARK Larimar",
    bio: "福山市新涯町のYOSA PARK Larimarのオーナー。冷えやむくみ、女性特有の揺らぎに寄り添う温活ケアをお届けします。",
    photo: "/stores/larimar/larimar-2.jpg",
  },
  {
    name: "高戸 真理",
    roman: "MARI TAKATO",
    role: "Larimar",
    bio: "福山市沼隈町のLarimarのオーナー。落ち着いた個室で、よもぎ蒸しと水素・酸素発生器によるケアをお届けします。",
    photo: "/stores/larimar-numakuma/larimar-numakuma-2.jpg",
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
