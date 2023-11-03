import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupListContext from "../../context/groupList/GroupListContext";
import dateTime from "../../utils/dateTime";
import uuid from "react-uuid";

const NoteBody = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  // id = id.substring(1); //removing : from front

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
  }, [groupListData,id]);

  // console.log("NoteBody group: ", group);
  // console.log("NoteBody textAreaValue: ", textAreaValue, textAreaValue.length);

  const handleBackBtnClick = () => [navigate("/")];

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
    <div className="h-screen bg-[#E8E8E8] sm:w-full">
      <header className="flex h-[10vh] items-center space-x-2 pb-2 pl-1 pr-1 pt-2 text-black">
        <IoIosArrowRoundBack
          className="cursor-pointer text-4xl text-[#5C5C5C]"
          onClick={handleBackBtnClick}
        />
        <div
          style={{ background: group?.color }}
          className="flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 "
        >
          <span className="text-base font-medium uppercase tracking-[0.02713rem] text-white">
            {group?.name?.substring(0, 2)}
          </span>
        </div>
        <div className="text-base font-medium  capitalize tracking-[0.02088rem] sm:text-xl">
          {group?.name}
        </div>
      </header>

      <section className="h-[70vh] overflow-auto bg-[#F7ECDC] px-4 pb-4 pt-8 sm:pb-8 sm:pl-10 sm:pr-8 sm:pt-12">
        <div className="space-y-5 sm:space-y-10">
          {group.notes?.map((entry) => {
            return (
              <div className="flex justify-start space-x-3 sm:space-x-8" key={entry?.noteId}>
                <div className="">
                  <span className="date-time block">{entry?.addedAt?.time}</span>
                  <span className="date-time block">{entry?.addedAt?.date}</span>
                </div>
                <p className="sm:tracing-[0.03938rem] text-sm font-normal tracking-[0.02844rem] sm:text-xl">
                  {entry?.note}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="h-[20vh] px-2 py-2 sm:px-4 sm:py-4">
        <div className="relative h-full">
          <textarea
            placeholder="Enter your text here..........."
            className="min-h-full w-full resize-none pl-2 pr-1 pt-1 text-base placeholder:tracking-[0.02rem] placeholder:text-[#9A9A9A] sm:text-xl"
            value={textAreaValue}
            onChange={handleTextAreaChange}
            onKeyDown={(e) => handleTextAreaKeyDown(e)}
          />
          <IoSendSharp
            className="absolute bottom-1 right-1 cursor-pointer text-[#ABABAB] sm:bottom-2 sm:right-2 sm:h-6 sm:w-6"
            onClick={handleTextAreaBtn}
          />
        </div>
      </footer>
    </div>
  );
};

export default NoteBody;
