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
      <b onClick={previousPage}>Prev</b>
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Page{" "}
        <span class="font-semibold text-gray-900 dark:text-white">{page}</span>{" "}
        of{" "}
        <span class="font-semibold text-gray-900 dark:text-white">
          {pageCount}
        </span>{" "}
      </span>
      <b onClick={nextPage}>Next</b>
    </div>
  );
};

export default Pagination;
