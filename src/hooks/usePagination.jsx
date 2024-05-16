import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function usePagination(items, pageLimit) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const { pageNumber } = useParams();
  const { category } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);


  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);

  const pageChange = (newPage) => {
    if (category) {
      navigate(`/${category}/${newPage}`);
    } else {
      navigate(`/${newPage}`);
    }
  };

  const pageData = () => {
    const s = (page - 1) * pageLimit;
    const e = s + pageLimit;
    console.log(items.slice(s, e));
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
  };

  return {
    page,
    pageChange,
    pageCount,
    pageData,
    nextPage,
    previousPage,
  };
}

export default usePagination;
