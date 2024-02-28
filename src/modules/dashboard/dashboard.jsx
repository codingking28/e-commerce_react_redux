import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.jpg";
import "./style.css";

import TableComponent from "../../components/Table/table";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import CreateRecords from "../CreateRecord/createRecord";

export default function Dashboard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3010/app/getDashboardData").then((data) => {
      console.log(data);
    });
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="body">
      <div className="container">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={logo} alt="logo" />
              <h2>
                BRAND <span className="danger">NAME</span>
              </h2>
            </div>
            <div className="close" id="close-btn">
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div className="sidebar">
            <a href="#" className="active">
              <span className="material-symbols-outlined">dashboard</span>
              <h3>Dashboard</h3>
            </a>
            <a href="#">
              <span className="material-symbols-outlined">person_add</span>
              <h3>Create</h3>
            </a>
            <a href="#">
              <span className="material-symbols-outlined">
                settings_account_box
              </span>
              <h3>Settings</h3>
            </a>
            <a href="#">
              <span className="material-symbols-outlined">logout</span>
              <h3>Logout</h3>
            </a>
          </div>
        </aside>
        <main>
          <h1>DASHBOARD</h1>
          <div className="date">
            <input type="date" name="" id="" />
          </div>

          <div className="insights">
            <div className="records">
              <span className="material-symbols-outlined">monitoring</span>
              <div className="middle">
                <div className="left">
                  <h3>Total Records</h3>
                  <h1>250</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="50" cy="50" r="36"></circle>
                  </svg>
                  {/* <div className="number">
                    <p>62%</p>
                  </div> */}
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>

            <div className="users">
              <span className="material-symbols-outlined">group</span>
              <div className="middle">
                <div className="left">
                  <h3>Total Users</h3>
                  <h1>150</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="50" cy="50" r="36"></circle>
                  </svg>
                  {/* <div className="number">
                    <p>50%</p>
                  </div> */}
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>

            <div className="sessions">
              <span className="material-symbols-outlined">co_present</span>
              <div className="middle">
                <div className="left">
                  <h3>Total Sessions</h3>
                  <h1>80</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="50" cy="50" r="36"></circle>
                  </svg>
                  {/* <div className="number">
                    <p>40%</p>
                  </div> */}
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>
          </div>

          <div className="recent-records">
            <h2>Recent Records</h2>
            <TableComponent />
          </div>
        </main>

        <div className="right">
          <div className="top">
            <button id="menu-btn">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="profile">
              <div className="info">
                <p>
                  Hey, <b>Mohan</b>
                </p>
                <small className="text-muted">Admin</small>
              </div>
              <div className="profile-pic">
                <img src={profile} alt=""></img>
              </div>
            </div>
          </div>

          <div className="record-analytics">
            <h2>Record Analytics</h2>
            <div className="item valid">
              <div className="icon">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="item-right">
                <div className="info">
                  <h3>ACTIVE RECORDS</h3>
                  <small className="text-muted">Last 24 hours</small>
                </div>
                <h5 className="success">25</h5>
              </div>
            </div>

            <div className="item in-valid">
              <div className="icon">
                <span className="material-symbols-outlined">error</span>
              </div>
              <div className="item-right">
                <div className="info">
                  <h3>INACTIVE RECORDS</h3>
                  <small className="text-muted">Last 24 hours</small>
                </div>
                <h5 className="danger">15</h5>
              </div>
            </div>

            <div className="item refresh">
              <div className="icon">
                <span className="material-symbols-outlined">
                  published_with_changes
                </span>
              </div>
              <div className="item-right">
                <div className="info">
                  <h3>REFRESHED RECORDS</h3>
                  <small className="text-muted">Last 24 hours</small>
                </div>
                <h5 className="warning">05</h5>
              </div>
            </div>

            <div className="item add-record button">
              <div onClick={handleShow}>
                <span className="material-symbols-outlined">add</span>
                <h3>Add Record</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRecords />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
