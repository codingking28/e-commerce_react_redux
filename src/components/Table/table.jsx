import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./style.css";
import { getRecordsAPI } from "../../store/slice/filecrudSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const singlePageLimit = 5;

export default function TableComponent({ Customers }) {
  const [count, setCount] = useState(46);
  const [modal, setModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

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
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const handleDeleteShow = () => setDeleteModal(true);
  const handleDeleteClose = () => setDeleteModal(false);
  const handleDelete = () => {
    axios
      .post("http://localhost:3010/app/deleteData", modalData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setDeleteModal(false);
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
            value={search}
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
                {APIdata.data.length > 0 ? (
                  APIdata.data.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.delegate_id}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>
                          <span
                            className="material-symbols-outlined button danger"
                            onClick={() => {
                              setModalData(data.records);
                              handleShow(true);
                            }}
                          >
                            visibility
                          </span>
                        </td>
                        <td className={data.found ? "success" : "warning"}>
                          {data.found ? "Active" : "InActive"}
                        </td>
                        <td className="primary">
                          {/* <Link to={`/form/${data.delegate_id}`}>
                            <span className="material-symbols-outlined button">
                              app_registration
                            </span>
                          </Link> */}
                          <span
                            className="material-symbols-outlined button"
                            onClick={() => {
                              setModalData(data);
                              handleDeleteShow(true);
                            }}
                          >
                            delete
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Records</td>
                  </tr>
                )}
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
      <Modal
        show={modal}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Courses History</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Table style={{ tableLayout: "fixed" }} table table-borderless>
            <thead style={{ position: "sticky", top: "0" }}>
              <tr>
                <th>Title</th>
                <th>Trainer</th>
                <th>Country</th>
                <th>Course ID</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Completed On</th>
                <th>Previous Course Validity</th>
              </tr>
            </thead>
            <tbody>
              {modalData.length > 0 ? (
                modalData.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.course_title}</td>
                      <td>{data.training_provider}</td>
                      <td>{data.country}</td>
                      <td>{data.course_code}</td>
                      <td>{data.valid_from}</td>
                      <td>{data.valid_until}</td>
                      <td>{data.completed_on}</td>
                      <td>{data.previous_course_valid_until}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteModal}
        onHide={handleDeleteClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete user{" "}
          {(modalData.first_name, modalData.last_name)}
          <div>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={handleDeleteClose}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
