import React, { useContext, useState } from "react";
import uuid from "react-uuid";

import GroupListContext from "../context/groupList/GroupListContext";
import "./popup.scss";

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
    <div className="popup-container">
      <h1 className="popup-title">Create New Notes group</h1>

      <div className="input-container">
        <h2 className="input-label">Group Name</h2>
        <input
          className="input-field"
          placeholder="Enter your group name...."
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </div>

      <div className="color-chooser">
        <h2 className="color-label">Choose Colour</h2>
        <div className="color-options">
          {colorArr.map((color) => (
            <span
              key={color}
              className={`color-option`}
              style={{ background: color, outline: selectedColor == color ? "1px solid black" : "" }}
              onClick={() => handleColorClick(color)}
            ></span>
          ))}
        </div>
      </div>

      <button className="create-button" onClick={handleCreateBtnClick}>
        Create
      </button>
    </div>
  );
};

export default Popup;
