import React, { useEffect } from "react";
import usePagination from "../hooks/usePagination";

const Pagination = (props) => {
  const { page, pageChange, pageData, nextPage, previousPage } = usePagination(
    props.items,
    props.pageLimit
  );

  useEffect(() => {
    props.setPageItems(pageData);
    window.scrollTo(0, 0);
  }, [page, props.items]);

  return (
    <div>
      <b onClick={previousPage}>Prev</b>
      <div>{page}</div>
      <b onClick={nextPage}>Next</b>
    </div>
  );
};

export default Pagination;
