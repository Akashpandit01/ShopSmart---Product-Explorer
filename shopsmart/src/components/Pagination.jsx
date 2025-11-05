import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);
  return (
    <div>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            background: p === currentPage ? "gray" : "white",
            margin: "2px",
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
