const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = [1, currentPage, totalPages].filter(
    (n) => n >= 1 && n <= totalPages
  );

  return (
    <div className="join w-auto flex gap-0 sm:gap-0">
      <button
        className="join-item btn btn-md sm:btn-md"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <button
            key={idx}
            className="join-item btn btn-disabled btn-md sm:btn-md"
          >
            ...
          </button>
        ) : (
          <button
            key={idx}
            className={`join-item btn btn-md sm:btn-md${
              currentPage === page ? " btn-active" : ""
            }`}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
      <button
        className="join-item btn btn-md sm:btn-md"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
