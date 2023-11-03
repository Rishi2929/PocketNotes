import React, { useContext, useState } from "react";
import uuid from "react-uuid";
import GroupListContext from "../context/groupList/GroupListContext";

const colorArr = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

const Popup = (props) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const { groupListData, setGroupListData } = useContext(GroupListContext);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleCreateBtnClick = () => {
    if (nameInput && selectedColor) {
      setGroupListData([...groupListData, { name: nameInput, color: selectedColor, id: uuid(), notes: [] }]);
      props.setIsPopupShowing(false);
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 z-[999] flex translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg bg-white p-4">
      <h1 className="text-xl font-medium tracking-[0.02rem] text-black sm:text-2xl">
        Create New Notes group
      </h1>

      <div className="flex items-center gap-2">
        <h2 className="whitespace-nowrap text-sm font-medium tracking-[0.02rem] sm:text-lg">Group Name</h2>
        <input
          className="h-6 w-4/6 rounded-xl border border-[#CCC] pb-[0.5rem] pl-3 pt-[0.3rem] placeholder:text-[0.60rem] placeholder:tracking-[0.02188rem] placeholder:text-[#979797] sm:h-8 sm:w-72 sm:pb-[0.4rem] sm:pt-[0.4rem] sm:placeholder:text-[1rem]"
          placeholder="Enter your group name...."
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <h2 className="tracing-[0.03194rem] whitespace-nowrap text-sm font-medium sm:text-lg">
          Choose Colour
        </h2>
        <div className="flex items-center gap-2">
          {colorArr.map((color) => (
            <span
              key={color}
              className="h-4 w-4 cursor-pointer rounded-full sm:h-6 sm:w-6"
              style={{ background: color, outline: selectedColor == color ? "1px solid black" : "" }}
              onClick={() => handleColorClick(color)}
            ></span>
          ))}
        </div>
      </div>

      <button
        className="mx-auto mt-6 h-8 w-52 rounded-md bg-black tracking-[0.03719rem] text-white sm:ml-auto sm:mr-0 sm:w-44 sm:rounded-lg"
        onClick={handleCreateBtnClick}
      >
        Create
      </button>
    </div>
  );
};

export default Popup;
