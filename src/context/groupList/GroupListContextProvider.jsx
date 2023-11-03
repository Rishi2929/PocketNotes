import { useEffect, useState } from "react";

import GroupListContext from "./GroupListContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import saveToLocalStorage from "../../utils/saveToLocalStorage";

const GroupListContextProvider = ({children}) => {
  const [groupListData, setGroupListData] = useState([]);

  useEffect(() => {
    const data = useLocalStorage();
    setGroupListData(data);
  }, [])

  useEffect(() => {
    saveToLocalStorage(groupListData);
  }, [groupListData])

  console.log("provider groupListData: ", groupListData)

  return (
    <GroupListContext.Provider value={{groupListData, setGroupListData}}>
      {children}
    </GroupListContext.Provider>
  )
}

export default GroupListContextProvider;