import React, { memo } from "react";
import "./input.scss";

const Input = ({ onInput, currentFriend }) => {
  return (
    <input
        type="text"
        onInput={onInput}
        onKeyPress={onInput}
        value={currentFriend}
        placeholder="Enter your friend's name"
        className="friend-input"
      />
  );
};

export default memo(Input);
