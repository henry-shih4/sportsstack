import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function usePagination(items, pageLimit) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);
  const itemCount = items.length;

  const { pageNumber } = useParams();
  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (pageCount > 0) {
      if (pageNumber > pageCount || pageNumber < 1) {
        navigate("/all/1");
      }
    }
  }, [pageNumber, pageCount]);

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);

  const pageChange = (newPage) => {
    if (newPage < 1) {
      return;
    }
    if (category && newPage <= pageCount) {
      navigate(`/${category}/${newPage}`);
    } else {
      console.log("invalid page");
      return;
    }
  };

  const pageData = () => {
    const s = (page - 1) * pageLimit;
    const e = s + pageLimit;
    return items.slice(s, e);
  };

  const nextPage = () => {
    // setPage(Math.max(page + 1, 0));
    // console.log("next page");
    pageChange(Number(page) + 1);
  };

  const previousPage = () => {
    // setPage(Math.max(page - 1, 0));
    // console.log("prev page");
    pageChange(Number(page) - 1);
  };

  return {
    page,
    pageChange,
    pageCount,
    pageData,
    nextPage,
    previousPage,
    itemCount,
  };
}

export default usePagination;
