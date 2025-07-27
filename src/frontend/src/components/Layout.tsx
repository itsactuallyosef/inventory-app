import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar title={title} />
        <div style={{ flex: 1, padding: "1rem", overflowY: "auto", margin: "1rem 1.3rem"}}>
          {children}
        </div>
      </div>
    </div>
  );
}
