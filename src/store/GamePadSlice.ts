import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  data: Array<string>;
  isUserTurn: boolean;
};
const initialState: StateType = {
  data: ["", "", "", "", "", "", "", "", ""],
  isUserTurn: true,
};

const GamePadSlice = createSlice({
  name: "gamepad",
  initialState: initialState,
  reducers: {
    UpdateCellValue(state, action) {
      var currentData = [...state.data];
      var location = +action.payload;
      var cellData = currentData[location];
      if (cellData === "") {
        cellData = state.isUserTurn ? "X" : "O";
        currentData[location] = cellData;
        state.data = [...currentData];
        state.isUserTurn = !state.isUserTurn;
      }
    },
  },
});

export default GamePadSlice;
export const GamePadSliceActions = GamePadSlice.actions;
