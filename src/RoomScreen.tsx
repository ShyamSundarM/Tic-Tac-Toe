import styles from "./RoomScreen.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { ref, set, push, onValue, get, child, update } from "firebase/database";
import { database } from ".";
import { useNavigate } from "react-router-dom";

function RoomScreen() {
  const [currentTab, setCurrentTab] = useState("create");
  const [creatorName, setCreatorName] = useState("");
  const [enteredRoomId, setEnteredRoomId] = useState<{
    val: string;
    isError: boolean;
  }>({ val: "", isError: false });
  const [joinerName, setJoinerName] = useState<{
    val: string;
    isError: boolean;
  }>({ val: "", isError: false });
  const [creatorOppName, setCreatorOppName] = useState<string>(null);
  const [genRoomId, setGenRoomId] = useState<string>();
  const [joinedStatus, setJoinedStatus] = useState(false);
  const roomsRef = ref(database, "Rooms");
  const navigate = useNavigate();
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) =>
    setCurrentTab(newValue);

  useEffect(() => {
    if (genRoomId) {
      const otherPlayerRef = ref(database, "Rooms/" + genRoomId + "/p2");
      onValue(otherPlayerRef, (snap) => {
        setCreatorOppName(snap.val());
      });
    }
  }, [genRoomId]);
  useEffect(() => {
    if (!enteredRoomId.isError) {
      const ref_ = child(roomsRef,  enteredRoomId.val + "/start");
      onValue(ref_, (snap) => {
        console.log(snap.val());
        if (snap.val() !== null) {
          navigate("/GamePage?mode=online", {
            state: { roomId:  enteredRoomId.val, isHost: false },
          });
        }
      });
    }
  }, [enteredRoomId]);
  async function generateIdClick() {
    await set(roomsRef, null);
    const rId = Math.floor(Math.random()*100000)+"";
    await set(child(roomsRef,rId), {
      p1: creatorName,
      data: ["", "", "", "", "", "", "", "", ""],
    });
    setGenRoomId(rId);
  }
  async function StartGameClickHandler() {
    await update(child(roomsRef, genRoomId), { start: "yes" });
    navigate("/GamePage?mode=online", {
      state: { roomId: genRoomId, isHost: true },
    });
  }
  async function JoinClickHandler() {
    const reference = child(roomsRef,  enteredRoomId.val + "/p1");
    const resp = await get(reference);
    if (resp.val() === null) {
      setEnteredRoomId((prev) => ({ ...prev, isError: true }));
    } else {
      const ref_ = child(roomsRef,  enteredRoomId.val);
      await update(ref_, { p2: joinerName.val });
      setJoinedStatus(true);
    }
  }
  function ExitClickHandler() {
    setJoinedStatus(false);
  }
  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Create Room" value="create" />
            <Tab label="Join Room" value="join" />
          </TabList>
        </Box>
        <TabPanel value="create" className={styles.CreateRoot}>
          <TextField
            id="outlined-basic"
            label="Enter your name"
            variant="outlined"
            value={creatorName}
            onChange={(event) => setCreatorName(event.target.value)}
          />
          <Button variant="outlined" onClick={generateIdClick}>
            Generate Room Id
          </Button>
          {genRoomId && (
            <div>
              Generated room ID :{" "}
              <span style={{ color: "#56a326" }}>{genRoomId}</span> Please share
              this code to invite them
            </div>
          )}
          {genRoomId && creatorOppName === null && (
            <div>
              <CircularProgress size={20} />
              <span> Waiting for friend to join.....</span>
            </div>
          )}
          {creatorOppName && (
            <div>
              <div>Joined Player Name : {creatorOppName}</div>
            </div>
          )}
          {creatorOppName && (
            <Button
              color="success"
              variant="contained"
              onClick={StartGameClickHandler}
            >
              Start Game
            </Button>
          )}
        </TabPanel>
        <TabPanel value="join" className={styles.JoinRoot}>
          {!joinedStatus && (
            <TextField
              error={joinerName.isError}
              id="outlined-basic"
              label="Enter name"
              variant="outlined"
              value={joinerName.val}
              onChange={(event) =>
                setJoinerName((prev) => ({
                  ...prev,
                  val: event.target.value,
                  isError: false,
                }))
              }
            />
          )}
          {!joinedStatus && (
            <div className={styles.joinInput}>
              <TextField
                error={enteredRoomId.isError}
                id="outlined-basic"
                label="Enter Room Id"
                variant="outlined"
                value={enteredRoomId.val}
                onChange={(event) =>
                  setEnteredRoomId((prev) => ({
                    ...prev,
                    val: event.target.value,
                    isError: false,
                  }))
                }
              />
              <Button variant="contained" onClick={JoinClickHandler}>
                Join
              </Button>
            </div>
          )}
          {joinedStatus && (
            <div>Joined Room Successfully, ask host to start the game</div>
          )}
          {joinedStatus && (
            <Button color="error" variant="outlined" onClick={ExitClickHandler}>
              Exit ?
            </Button>
          )}
        </TabPanel>
      </TabContext>
    </>
  );
}
export default RoomScreen;
