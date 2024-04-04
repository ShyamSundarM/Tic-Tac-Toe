import { useDispatch } from "react-redux";
import styles from "./Cell.module.css";
import { GamePadSliceActions } from "./store/GamePadSlice";
export type CellData = {
  index: number;
  data: string;
};
function Cell(props: CellData) {
  const dispatch = useDispatch();
  function cellClickHandler() {
    dispatch(GamePadSliceActions.UpdateCellValue(props.index));
  }
  return (
    <button onClick={cellClickHandler} className={styles.Cell}>
      {props.data}
    </button>
  );
}

export default Cell;
