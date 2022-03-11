import React, { memo } from "react";
import Friend from "../friend/friend";
import "./friend-list.scss";

const FriendList = ({ friendList, deleteFriend, addFav }) => {
  const list = friendList.map((item, index) => {
    return (
      <Friend
        key={`friend-${index}`}
        friendData={item}
        deleteFriend={deleteFriend}
        addFav={addFav}
      />
    );
  });

  return (
    <div className="list-container">
      {friendList.length ? list : <h3 className="no-items">No items Found</h3>}
    </div>
  );
};

export default memo(FriendList);
