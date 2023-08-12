import { useState, useMemo } from "react";

function usePagination(dataLength, offset, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const startingIndex = (currentPage - 1) * itemsPerPage;
  const endingIndex = Math.min(
    startingIndex + itemsPerPage - 1,
    dataLength - 1
  );

  const pages = useMemo(() => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [totalPages]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startingIndex,
    endingIndex,
    pages,
  };
}

export default usePagination;
