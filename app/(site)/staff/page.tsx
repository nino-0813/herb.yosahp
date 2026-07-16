import { Ph, Headline, CtaBand, Footer } from "@/components/ui";

const STAFF = [
  { name: "森近 美優", roman: "MIYU MORICHIKA", role: "Esthetician", bio: "趣味：カフェ巡り、岩盤浴。心も身体もリフレッシュできる空間で素敵な時間をご提供します！" },
  { name: "津村 夏実", roman: "NATSUMI TSUMURA", role: "Esthetician", bio: "趣味：カフェ巡り、映画鑑賞。お客様に合ったコースで、身体の内側から整えられるようサポートします！" },
  { name: "陽菜", roman: "HINA", role: "Therapist", bio: "趣味：お散歩、サウナ。お一人おひとりに寄り添った施術を心がけています。" },
  { name: "彩花", roman: "AYAKA", role: "Therapist", bio: "趣味：ヨガ、温泉巡り。心からゆるめる時間をお届けします。" },
  { name: "結衣", roman: "YUI", role: "Receptionist", bio: "趣味：植物を育てること。笑顔でお出迎えいたします。" },
  { name: "莉子", roman: "RIKO", role: "Esthetician", bio: "趣味：アロマ、読書。お悩みに寄り添うカウンセリングが得意です。" },
];

export default function Staff() {
  return (
    <>
      <Headline en="staff" jp="スタッフ紹介" />
      <div className="container">
        <p className="lede">
          自分たちも揺らいだ経験があるから、深く寄り添える。
          <br />
          裏表のない言葉で、あなたが本来の自分を取り戻す時間に寄り添います。
        </p>
      </div>

      <div className="grid-3">
        {STAFF.map((s) => (
          <div className="staff-card" key={s.roman}>
            <div className="staff-card__photo"><Ph label={s.name} /></div>
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
