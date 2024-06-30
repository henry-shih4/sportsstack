import React, { useEffect } from "react";
import usePagination from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    page,
    pageChange,
    pageData,
    nextPage,
    previousPage,
    pageCount,
    itemCount,
  } = usePagination(props.items, props.pageLimit);

  useEffect(() => {
    props.setPageItems(pageData);
    window.scrollTo(0, 0);
  }, [page, props.items]);

  return (
    <div>
      <button className="font-bold px-3" onClick={previousPage}>
        Prev
      </button>
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{page}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {pageCount}
        </span>{" "}
      </span>
      <button className="font-bold px-3" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
