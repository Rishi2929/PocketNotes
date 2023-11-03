import React from 'react'

const saveToLocalStorage = (data) => {
  localStorage.setItem("groupList", JSON.stringify(data));
}

export default saveToLocalStorage