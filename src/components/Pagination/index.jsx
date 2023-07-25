import React, { useState } from "react";

const Pagination = ({ totalCount, limit }) => {
  const [activePage, setActivePage] = useState(1);
  const countPages = Math.ceil(totalCount / limit);

  const handlePageClick = (index) => {
    setActivePage(index);
  };

  return {
    content:
      totalCount < limit ? (
        <div className="pagination">
          <div className="pagination--item">
            <button className="active">1</button>
          </div>
        </div>
      ) : (
        <div className="pagination">
          {/* first page */}
          {activePage >= 3 && (
            <button onClick={() => handlePageClick(1)}>1</button>
          )}
          {activePage >= 3 && countPages > 3 && <p>...</p>}

          {/* prev page */}
          {activePage >= 2 && (
            <button onClick={() => handlePageClick(activePage - 1)}>
              {activePage - 1}
            </button>
          )}

          {/* active page */}
          <button className="active">{activePage}</button>

          {/* next page */}
          {activePage <= countPages - 1 && (
            <button onClick={() => handlePageClick(activePage + 1)}>
              {activePage + 1}
            </button>
          )}

          {/* last page */}

          {activePage < countPages - 1 && countPages > 3 && <p>...</p>}

          {activePage < countPages - 1 && (
            <button onClick={() => handlePageClick(countPages)}>
              {countPages}
            </button>
          )}
        </div>
      ),
    activePage,
    setActivePage,
  };
};

export default Pagination;
