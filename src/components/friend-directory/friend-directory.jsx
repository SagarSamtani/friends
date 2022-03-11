import React, { useState, useEffect, useRef, useCallback, memo, Profiler } from "react";
import FriendList from "../friend-list/friend-list";
import Input from "../input/input";
import Pagination from "../pagination/pagination";
import "./friend-directory.scss";

const data = {};

const FriendDirectory = () => {
  const [totalList, setTotalList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentFriend, setCurrentFriend] = useState("");

  const firstRender = useRef(true);

  const handleFriendList = useCallback(() => {
    const index = currentPage - 1;
    const start = index * 4;
    const end = (index + 1) * 4;
    setFriendList(totalList.slice(start, end));
  }, [currentPage, totalList]);

  const handleSearch = (value) => {
    /* Filtering elements starting with searchItem */
    const favStartList = [];
    const nonFavStartList = [];
    totalList.forEach((item) => {
      if (item.name.toLowerCase().startsWith(value.toLowerCase())) {
        item.fav ? favStartList.push(item) : nonFavStartList.push(item);
      }
    });

    /* Filtering elements those includes searchItem */
    const favIncludeList = [];
    const nonfavIncludeList = [];
    totalList.forEach((item) => {
      if (
        item.name.includes(value) &&
        !favStartList.find((fItem) => fItem.name === item.name) &&
        !nonFavStartList.find((fItem) => fItem.name === item.name)
      ) {
        item.fav ? favIncludeList.push(item) : nonfavIncludeList.push(item);
      }
    });

    setFriendList([
      ...favStartList,
      ...nonFavStartList,
      ...favIncludeList,
      ...nonfavIncludeList,
    ]);
  };

  const fetchList = () => {
    fetch("/friends-list.json")
      .then((response) => response.json())
      .then((result) => {
        setTotalList(result.list);
      });
  };

  useEffect(fetchList, []);

  useEffect(() => {
    handleFriendList();

    const calculatePages = () => {
      const divisiblePages = Math.floor(totalList.length / 4);
      const remainderPages = totalList.length % 4;
      const newTotalPages = divisiblePages + (remainderPages ? 1 : 0);
      if (newTotalPages < currentPage) setCurrentPage(newTotalPages);
      setTotalPages(newTotalPages);
    };

    if (!firstRender.current) {
      calculatePages();
    } else {
      firstRender.current = false;
    }
  }, [currentPage, totalList, handleFriendList]);

  const addFriend = useCallback((event) => {
    const { value } = event.target;
    if (value) {
      if (event?.key === "Enter" || event?.keyCode === 13) {
        const friendData = {
          name: value,
          fav: false,
        };
        const newTotalList = [...totalList, friendData];
        setTotalList(newTotalList);
        setCurrentFriend("");
      } else {
        setCurrentFriend(value);
        handleSearch(value);
      }
    } else {
      setCurrentFriend("");
      handleFriendList();
    }
  }, [totalList]);

  const deleteFriend = (friendData) => {
    const modifiedList = [...totalList];
    modifiedList.splice(
      modifiedList.findIndex((item) => item.name === friendData.name),
      1
    );
    setTotalList(modifiedList);
  };

  const addFav = (friendData) => {
    friendData.fav = !friendData.fav;
    const modifiedList = [...friendList];
    const startIndex = modifiedList.findIndex(
      (friend) => friend.name === friendData.name
    );
    modifiedList.splice(startIndex, 1, friendData);
    setFriendList(modifiedList);
  };

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
  };


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
    <div className="friend-list-container">
      <div className="header">Friends List</div>
      <Profiler id="input" onRender={profilerCallback}>
        <Input onInput={addFriend} currentFriend={currentFriend} />
      </Profiler>
      <Profiler id="friendList" onRender={profilerCallback}>
      <FriendList
        friendList={friendList}
        deleteFriend={deleteFriend}
        addFav={addFav}
      />
      </Profiler>
      {!currentFriend && (
      <Profiler id="pagination" onRender={profilerCallback}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
        </Profiler>
      )}
    </div>
  );
};

export default memo(FriendDirectory);
