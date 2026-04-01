import { memo } from "react";

import styles from "./Spinner.module.css";

export const Spinner = memo(() => {
    return (
        <div className={styles.spinner}></div>
    )
})