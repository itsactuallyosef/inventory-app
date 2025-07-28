import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

export default function Sidebar() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/inventory", label: "Inventory" },
    { to: "/transactions", label: "Transactions" },
    { to: "/invoices", label: "Invoices" },
  ]

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={pathname === to ? "active" : ""}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
