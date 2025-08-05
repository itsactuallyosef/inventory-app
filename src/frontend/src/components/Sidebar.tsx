import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

import { MdDashboard } from "react-icons/md";   // Dashboard
import { FaBoxes } from "react-icons/fa";       // Inventory
import { MdSwapHoriz } from "react-icons/md";   // Transactions
import { FaFileInvoiceDollar } from "react-icons/fa"; // Invoices

export default function Sidebar() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", icon: <MdDashboard /> },
    { to: "/inventory", icon: <FaBoxes/> },
    { to: "/transactions", icon: <MdSwapHoriz/> },
    { to: "/invoices", icon: <FaFileInvoiceDollar/> },
  ]

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map(({ to, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={pathname === to ? "active" : ""}
              >
                {icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
