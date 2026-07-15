import Sidebar from "@/components/Sidebar";
import Intro from "@/components/Intro";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Intro />
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
}
