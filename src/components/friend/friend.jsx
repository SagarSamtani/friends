import React, { memo } from "react";
import "./friend.scss";

const Friend = ({ friendData, deleteFriend, addFav }) => {
  return (
    <div
      id={friendData.name}
      key={friendData.name}
      className="friend-container"
    >
      <div className="name-container">
        <span>{friendData.name}</span>
        <span className="static-text"> is your friend </span>
      </div>
      <div className="action-btns">
        <div className="star-holder" onClick={() => addFav(friendData)}>
          <img
            src={require(`../../assets/images/${
              friendData.fav ? "active" : "inactive"
            }-star.png`)}
            alt="star-ic"
            className="img-cls"
          />
        </div>
        <div className="delete-holder" onClick={() => deleteFriend(friendData)}>
          <img
            className="img-cls"
            src={require("../../assets/images/delete.png")}
            alt="delete-ic"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Friend);
