import { useSelector } from "react-redux";
import Cell from "./Cell";
import styles from "./GamePage.module.css";
import { RootState } from "./store/Store";
type Props = {
  disabled:boolean
}
function GamePad(props:Props) {
  const data = useSelector((s: RootState) => s.data);

  return (
    <div style={{}} className={styles.Col}>
      <div className={styles.Row}>
        <Cell index={0} data={data[0]} disabled={props.disabled}/>
        <Cell index={1} data={data[1]} disabled={props.disabled}/>
        <Cell index={2} data={data[2]} disabled={props.disabled} />
      </div>
      <div className={styles.Row}>
        <Cell index={3} data={data[3]} disabled={props.disabled}/>
        <Cell index={4} data={data[4]} disabled={props.disabled}/>
        <Cell index={5} data={data[5]} disabled={props.disabled}/>
      </div>
      <div className={styles.Row}>
        <Cell index={6} data={data[6]} disabled={props.disabled}/>
        <Cell index={7} data={data[7]} disabled={props.disabled} />
        <Cell index={8} data={data[8]} disabled={props.disabled}/>
      </div>
    </div>
  );
}
export default GamePad;
