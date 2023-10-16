import { range } from "./range.utils";

export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  const pageNeighbours: number = 1;
  const ellipsis: string = "...";
  let startPage: number =
    currentPage < pageNeighbours + 1 ? 1 : currentPage - pageNeighbours;
  const endPage: number =
    totalPages < pageNeighbours * 2 + startPage
      ? totalPages
      : pageNeighbours * 2 + startPage;

  const diff: number = startPage - endPage + pageNeighbours * 2;
  startPage -= startPage - diff > 0 ? diff : 0;
  let actualPageRange: (number | string)[] = range(startPage, endPage);

  if (actualPageRange[0] !== 1) {
    actualPageRange = [1, ellipsis, ...actualPageRange];
  }

  if (actualPageRange[actualPageRange.length - 1] !== totalPages) {
    actualPageRange = [
      ...actualPageRange.slice(0, actualPageRange.length),
      ellipsis,
      totalPages,
    ];
  }

  return actualPageRange;
};
