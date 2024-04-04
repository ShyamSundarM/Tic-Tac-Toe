import styles from './RoomScreen.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
function RoomScreen(){
    const [currentTab, setCurrentTab] = useState("create");
    return <Tabs
        value={currentTab}
        onChange={(event: React.SyntheticEvent, newValue: string)=>setCurrentTab(newValue)}
      >
        <Tab value="create" label="Item Two" />
        <Tab value="join" label="Item Three" />
      </Tabs>
}
export default RoomScreen