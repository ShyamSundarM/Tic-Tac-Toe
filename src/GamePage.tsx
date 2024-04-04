import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GamePad from "./GamePad";
import { RootState } from "./store/Store";
import { useDispatch, useSelector } from "react-redux";
import { GamePadSliceActions } from "./store/GamePadSlice";
const matchIndexes = [
  { a: 0, b: 1, c: 2 },
  { a: 3, b: 4, c: 5 },
  { a: 6, b: 7, c: 8 },
  { a: 0, b: 3, c: 6 },
  { a: 1, b: 4, c: 7 },
  { a: 2, b: 5, c: 8 },
  { a: 0, b: 4, c: 8 },
  { a: 2, b: 4, c: 6 },
];
function GamePage() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string>();
  const [winnerName, setWinnerName] = useState(null);
  const data = useSelector((s: RootState) => s.data);
  const isUserTurn = useSelector((s: RootState) => s.isUserTurn);
  useEffect(() => {
    setMode(params.get("mode"));
  }, [params]);
  function genComputerResponse() {
    var emptyCellIndexes = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "") {
        emptyCellIndexes.push(i);
      }
    }
    if (emptyCellIndexes.length > 0) {
      var randomNum = Math.random() * 100;
      randomNum = Math.floor(randomNum % emptyCellIndexes.length);
      const chosenVal = emptyCellIndexes[randomNum];
      dispatch(GamePadSliceActions.UpdateCellValue(chosenVal));
    }
  }
  //computer
  useEffect(() => {
    var timer;
    if (mode === "computer") {
      if (!isUserTurn && winnerName === null) {
        timer = setTimeout(() => genComputerResponse(), 1800);
      }
    }
    return () => clearTimeout(timer);
  }, [isUserTurn, mode]);

  useEffect(() => {
    for (var index of matchIndexes) {
      if (data[index.a] === data[index.b] && data[index.b] === data[index.c]) {
        if (data[index.a] === "X") {
          if (mode === "computer") {
            setWinnerName("User");
            return;
          }
          setWinnerName("X");
        } else if (data[index.a] === "O") {
          if (mode === "computer") {
            setWinnerName("Computer");
            return;
          }
          setWinnerName("O");
        }
      }
    }
  }, [data]);
  function NewGameClickHandler() {
    window.location.reload();
  }
  return (
    <div>
      <GamePad />
      {mode === "computer" && winnerName === null && (
        <div>
          {!isUserTurn ? "Computer" : "User"} turn :{" "}
          {!isUserTurn ? "Thinking..." : "Waiting for user input..."}
        </div>
      )}
      {winnerName && (
        <div>
          <div>{winnerName} has won</div>
          <div>
            <button onClick={NewGameClickHandler}>New Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
