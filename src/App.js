import React, { memo, Profiler } from "react";
import "./App.scss";
import FriendDirectory from "./components/friend-directory/friend-directory";

const data = {};

function App() {
  const profilerCallback = (...args) => {
    const id = args[0];
    if(data[id]){
      data[id] += 1;
    } else {
      data[id] = 1;
    }
    console.log(id, { args, data });
  };

  return (
    <div className="App">
      <Profiler id="app" onRender={profilerCallback}>
        <FriendDirectory />
      </Profiler>
    </div>
  );
}

export default memo(App);
