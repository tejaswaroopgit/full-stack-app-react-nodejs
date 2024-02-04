import React from "react";

function ToDoSort() {
  return (
    <section data-id="quick-actions-section" className="quick-actions-section">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="#"
            //   onClick={handleFilterPills("date")}
          >
            Date
          </a>
        </li>
        <li className="nav-item">
          {/* onClick={handleFilterPills("priority")} */}
          <a className="nav-link" aria-current="page" href="#">
            Priority
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            All Filters
          </a>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                // onClick={() => sortByType("dateAndTime")}
              >
                Date
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                // onClick={() => sortByType("priority")}
              >
                Priority
              </a>
            </li>
            <li>
              <a className="dropdown-item">Over Due</a>
            </li>
            <li>
              <a className="dropdown-item">Flagged</a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default ToDoSort;
