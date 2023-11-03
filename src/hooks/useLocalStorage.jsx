import React from "react";

const useLocalStorage = () => {
  let data = [];
  let list = localStorage.getItem("groupList");
  if (list != undefined && list != null) {
    // console.log("list: ", list);
    list = JSON.parse(list);
    data = list;
  }
  console.log("mounted");

  return data;
};

export default useLocalStorage;
