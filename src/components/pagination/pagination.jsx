import React, { memo }  from "react";
import "./pagination.scss";

const Pagination = ({ currentPage, handlePageClick, totalPages }) => {
  const pageList = [...Array(totalPages).keys()].map((num) => {
    const currentNum = num + 1;
    return (
      <span key={`page-${currentNum}`} className={`page-circle ${currentPage ===  currentNum && "active-page"}`} onClick={()=>handlePageClick(currentNum)}>
        {currentNum}
      </span>
    );
  });
  return <div className="pagination-container">{pageList}</div>;
};

export default memo(Pagination);
