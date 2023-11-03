import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import Popup from "../../components/Popup";
import GroupListContext from "../../context/groupList/GroupListContext";

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
      <div className="min-h-screen pb-1 pl-5 pt-6">
        <h1 className="whitespace-nowrap text-3xl font-medium tracking-[0.02938rem] text-black">
          Pocket Notes
        </h1>

        <button
          onClick={handleCreateGroupBtn}
          className="mb-4 mt-4 flex w-72 items-center justify-center gap-3 whitespace-nowrap rounded-3xl bg-black px-1 py-2
          text-base font-medium tracking-[0.02519rem] text-white sm:mr-4"
        >
          <FaPlus />
          <span>Create Notes group</span>
        </button>

        <div className="pr-0">
          <div className="h-[79vh] space-y-4 overflow-y-scroll">
            {groupList.map((group) => {
              return (
                <NavLink
                  to={`/${group.id}`}
                  key={group.id}
                  style={({ isActive }) => ({
                    background: isActive ? "#F7ECDC" : "",
                    borderRadius: "1.5rem 0 0 1.5rem",
                  })}
                  className={`flex items-center gap-3 pb-2 pt-2`}
                >
                  <div
                    style={{ background: group.color }}
                    className="ml-4 flex h-12 w-12 items-center justify-center rounded-full"
                  >
                    <span className="text-base font-medium uppercase tracking-[0.02713rem] text-white">
                      {group.name.substring(0, 2)}
                    </span>
                  </div>
                  <h3 className="text-base font-medium capitalize tracking-[0.02325rem]">{group.name}</h3>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {isPopupShowing && (
        <>
          <div
            id="blur"
            className="half-opaque pointer-events-auto fixed left-0 top-0 z-50 h-full w-full"
          ></div>
          <Popup setIsPopupShowing={setIsPopupShowing} />
        </>
      )}
    </>
  );
};

export default GroupList;
