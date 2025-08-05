import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout({ children, title, button }: { children: React.ReactNode; title: string, button: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh"}}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", margin: "20px" }}>
        <Topbar title={title} button={button}/>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column"}}>
          {children}
        </div>
      </div>
    </div>
  );
}
