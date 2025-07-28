import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout({ children, title, button }: { children: React.ReactNode; title: string, button: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh"}}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
        <Topbar title={title} button={button}/>
        <div style={{ flex: 1, padding: "1rem", overflowY: "auto", margin: "1rem 1.3rem"}}>
          {children}
        </div>
      </div>
    </div>
  );
}
