import { useSelector } from "react-redux";
import Cell from "./Cell";
import styles from "./GamePage.module.css";
import { RootState } from "./store/Store";
import { useEffect } from "react";

function GamePad() {
  const data = useSelector((s: RootState) => s.data);

  return (
    <div className={styles.Col}>
      <div className={styles.Row}>
        <Cell index={0} data={data[0]} />
        <Cell index={1} data={data[1]} />
        <Cell index={2} data={data[2]} />
      </div>
      <div className={styles.Row}>
        <Cell index={3} data={data[3]} />
        <Cell index={4} data={data[4]} />
        <Cell index={5} data={data[5]} />
      </div>
      <div className={styles.Row}>
        <Cell index={6} data={data[6]} />
        <Cell index={7} data={data[7]} />
        <Cell index={8} data={data[8]} />
      </div>
    </div>
  );
}
export default GamePad;
