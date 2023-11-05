import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

import GroupListContext from "../../context/groupList/GroupListContext";
import dateTime from "../../utils/dateTime";
import "./noteBody.scss";

const NoteBody = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const { groupListData, setGroupListData } = useContext(GroupListContext);
  const [group, setGroup] = useState({});
  const [textAreaValue, setTextAreaValue] = useState("");

  // console.log("NoteBody groupListData: ", groupListData);

  useEffect(() => {
    groupListData.forEach((obj) => {
      if (obj.id == id) {
        setGroup(obj);
      }
    });
  }, [groupListData, id]);

  // console.log("NoteBody group: ", group);
  // console.log("notebody param id", id);
  // console.log("NoteBody textAreaValue: ", textAreaValue, textAreaValue.length);
  console.log("nodebody re-rendered");

  const handleBackBtnClick = () => navigate("/");

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const submitData = () => {
    if (textAreaValue) {
      const { todayDate, realTime } = dateTime();
      const group2 = {
        ...group,
        notes: [
          ...group.notes,
          { addedAt: { date: todayDate, time: realTime }, note: textAreaValue, noteId: uuid() },
        ],
      };

      const indexToUpdate = groupListData.findIndex((obj) => obj.id === id);
      if (indexToUpdate !== -1) {
        const updatedGroupListData = [...groupListData]; // Creating a copy of the groupListData array
        updatedGroupListData[indexToUpdate] = group2; // Replacing the original object at the found index with group2
        setGroupListData(updatedGroupListData); // Updating the state with the updated array
      }
      setTextAreaValue("");
    }
  };

  const handleTextAreaBtn = () => {
    submitData();
  };

  const handleTextAreaKeyDown = (e) => {
    if (e.key == "Enter") {
      if (e.target.value.trim() == "") {
        e.preventDefault(); //prevent adding a new line character
      } else {
        submitData();
      }
    }
  };

  return (
    <div className="note-body-container">
      <header className="header">
        <IoIosArrowRoundBack className="back-btn" onClick={handleBackBtnClick} />
        <div className="group-icon" style={{ background: group?.color }}>
          <span className="group-icon-text">{group?.name?.substring(0, 2)}</span>
        </div>
        <div className="group-title">{group?.name}</div>
      </header>

      <section className="notes-section">
        <div className="notes-container">
          {group.notes?.map((entry) => {
            return (
              <div className="note-entry" key={entry?.noteId}>
                <div className="note-timestamp">
                  <span className="date-time">{entry?.addedAt?.time}</span>
                  <span className="date-time">{entry?.addedAt?.date}</span>
                </div>
                <p className="note-text">{entry?.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <div className="textarea-container">
          <textarea
            placeholder="Enter your text here..........."
            className="textarea-input"
            value={textAreaValue}
            onChange={handleTextAreaChange}
            onKeyDown={(e) => handleTextAreaKeyDown(e)}
          />
          <IoSendSharp className="send-button" onClick={handleTextAreaBtn} />
        </div>
      </footer>
    </div>
  );
};

export default NoteBody;
