import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { generatePageNumbers } from "utils/generatePageNumbers.utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  const renderPaginationItem = (pageItem: string | number, key: number) => {
    if (typeof pageItem === "string") {
      return <span key={key}>{pageItem}</span>;
    }

    return (
      <li
        key={key}
        onClick={() => handlePageChange(pageItem)}
        className={pageItem === currentPage ? "currentPage" : ""}
      >
        {pageItem}
      </li>
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="btn"
      >
        <BsArrowLeft />
        <span>Previous</span>
      </button>
      <ul>
        {pageNumbers.map((pageNumber, index) =>
          renderPaginationItem(pageNumber, index)
        )}
      </ul>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="btn"
      >
        <span>Next</span>
        <BsArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
