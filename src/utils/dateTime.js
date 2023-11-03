import React from 'react'

const dateTime = () => {

  const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); //month is coming as 0 based indexing
    const today = now.getDate();

    const todayDate = `${today} ${monthsArr[month]} ${year}`;
    
    return todayDate;
  }

  const getTime = () => {
    let now  = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    let amOrPm = "Am";

    if(hour >= 12) {
      amOrPm = "Pm";
      if(hour > 12) {
        hour = hour - 12;
      }
    }

    hour = String(hour).padStart(2, "0");
    minute = String(minute).padStart(2, "0");
    
    const presentTime = `${hour}:${minute} ${amOrPm}`
    return presentTime;
  }

  const todayDate = getDate()
  const realTime = getTime()  
  
  return {todayDate, realTime};
}

export default dateTime