import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import Popup from "../../components/Popup";
import GroupListContext from "../../context/groupList/GroupListContext";
import "./groupList.scss";

const GroupList = () => {
  const [groupList, setGroupList] = useState([]);
  const [isPopupShowing, setIsPopupShowing] = useState(false);
  const { groupListData, setGroupListData } = useContext(GroupListContext);

  useEffect(() => {
    setGroupList(groupListData);
  }, [groupListData.length]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isPopupShowing && e.target.closest("#blur")) {
        setIsPopupShowing(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupShowing]);

  const handleCreateGroupBtn = () => {
    setIsPopupShowing((prev) => !prev);
  };

  return (
    <>
      <div className="group-list-container">
        <h1 className="title">Pocket Notes</h1>

        <button onClick={handleCreateGroupBtn} className="create-group-button">
          <FaPlus />
          <span>Create Notes group</span>
        </button>

        <div className="group-list-wrapper">
          <div className="group-list rtl">
            {groupList.map((group) => {
              return (
                <NavLink
                  to={`/${group.id}`}
                  key={group.id}
                  style={({ isActive }) => ({
                    background: isActive ? "#F7ECDC" : "",
                    borderRadius: "1.5rem 0 0 1.5rem",
                  })}
                  className={`group-link ltr`}
                >
                  <div style={{ background: group.color }} className="group-color">
                    <span className="group-initials">{group.name.substring(0, 2)}</span>
                  </div>
                  <h3 className="group-name">{group.name}</h3>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {isPopupShowing && (
        <>
          <div id="blur" className="blur"></div>
          <Popup setIsPopupShowing={setIsPopupShowing} />
        </>
      )}
    </>
  );
};

export default GroupList;
