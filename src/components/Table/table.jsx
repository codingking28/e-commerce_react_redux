import React, { useEffect, useState } from "react";
import { Table, Modal } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./style.css";
import { getRecordsAPI } from "../../store/slice/filecrudSlice";
import { useDispatch, useSelector } from "react-redux";

const singlePageLimit = 5;

export default function TableComponent({ Customers }) {
  const [count, setCount] = useState(46);
  const [modal, setModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const APIdata = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(
      getRecordsAPI({
        pageLimit: singlePageLimit,
        activePage: activePage,
        searchParam: search,
      })
    );
  }, [dispatch, search, activePage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const searchBtnPress = (data) => {
    setSearch(data);
  };
  const enterKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchBtnPress(event.target.value);
    }
  };
  return (
    <div className="table-container">
      {APIdata.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <input
            type="search"
            placeholder="search..."
            className="date"
            onKeyDown={(e) => enterKeyPress(e)}
          ></input>
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <Table style={{ tableLayout: "fixed" }} table table-borderless>
              <thead style={{ position: "sticky", top: "0" }}>
                <tr>
                  <th>Delegate ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>View Records</th>
                  <th>Found Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {APIdata.data.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.delegate_id}</td>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>
                        <span
                          className="material-symbols-outlined"
                          onClick={() => setModal(true)}
                        >
                          visibility
                        </span>
                      </td>
                      <td className={data.found ? "success" : "warning"}>
                        {data.found ? "Active" : "InActive"}
                      </td>
                      <td className="primary">
                        <span className="material-symbols-outlined">
                          drag_indicator
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="paginationOuter text-right">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={singlePageLimit}
              totalItemsCount={count}
              itemClass="nav-item"
              linkClass="nav-link"
              activeClass="active"
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
