// Table.tsx
import React from "react";

export interface TableColumn<T> {
  Header: string;
  accessor: keyof T;
  Cell?: React.FC<{ row: { original: T } }>;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  hideHeader?: boolean;
  loading?: boolean;
  handleRowClick: (row: T) => void;
}

const loadingSpinerIcon = "/assets/images/loading-circle.svg";

function Table<T>({
  data,
  columns,
  hideHeader,
  loading,
  handleRowClick,
}: TableProps<T>) {
  return (
    <div className="table-container">
      <div className="custom-table">
        {loading && (
          <div className="loading-table">
            <img
              className="loader-spinner"
              src={loadingSpinerIcon}
              alt="Loader"
            />
          </div>
        )}
        <table className="custom-table">
          {hideHeader && (
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.Header}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex < data.length - 1 ? "table-row-divider" : ""
                }
                onClick={() => handleRowClick(row)}
              >
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column.Cell ? (
                      column.Cell({ row: { original: row } })
                    ) : (
                      <p>{row[column.accessor] as any}</p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
