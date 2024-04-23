import { createSlice } from "@reduxjs/toolkit";
import { child, ref, set, update } from "firebase/database";
import { database } from "..";

type StateType = {
  data: Array<string>;
  isUserTurn: boolean;
  p1: string;
  p2: string;
  mode: string;
  roomId: string;
  isHost: boolean;
};
const initialState: StateType = {
  data: ["", "", "", "", "", "", "", "", ""],
  isUserTurn: true,
  p1: "",
  p2: "",
  mode: "",
  roomId: "",
  isHost: null,
};

const GamePadSlice = createSlice({
  name: "gamepad",
  initialState: initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
    UpdateCellValue(state, action) {
      var currentData = [...state.data];
      var location = +action.payload;
      if (state.mode === "online") {
        const reference = ref(database, "Rooms/" + state.roomId);
        update(reference, {
          isCreatorTurn: state.isHost,
        });
        set(child(reference, "data/" + location), "X");
      } else {
        var cellData = currentData[location];
        if (cellData === "") {
          cellData = state.isUserTurn ? "X" : "O";
          currentData[location] = cellData;
          state.data = [...currentData];
          state.isUserTurn = !state.isUserTurn;
        }
      }
    },
    setRoomData(state, action) {
      state.p1 = action.payload.p1;
      state.p2 = action.payload.p2;
      state.roomId = action.payload.roomId;
    },
    setPadData(state, action) {
      const currentData = [...state.data];
      currentData[+action.payload.key] = action.payload.val;
      state.data = [...currentData];
    },
  },
});

export default GamePadSlice;
export const GamePadSliceActions = GamePadSlice.actions;
