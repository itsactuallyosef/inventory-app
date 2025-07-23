import type React from "react"
import styles from "../style/TopBar.module.css"

type Props = {
    children: React.ReactNode
}

function TopBar({children}: Props) {
    return (
        <div className={styles.topbar}>
            <h1>{children}</h1>
        </div>
    )
}

export default TopBar