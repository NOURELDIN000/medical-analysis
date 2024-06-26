import "./UploadedTests.css";
import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { BsChatFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import axios from "axios";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import moment from "moment-timezone"; // Import moment-timezone

const UploadedTests = () => {
  const [uploadedTest, setUploadedTest] = useState({});

  // const baseUrl = "https://bload-test.icanforsoftware.com/api/";
  const baseUrl = "http://127.0.0.1:8000/api/";

  const cookie = Cookie();

  const token = cookie.get("Bearer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}Profile?api_password=AHMED$2024`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        console.log(data);
        setUploadedTest(data);
      } catch (err) {
        console.error("error", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="uploaded-dashboard">
      <Navbar
        expand="lg"
        className="uploaded-nav  d-flex align-items-center justify-content-center "
      >
        <Container>
          <Navbar.Brand
            href="#home"
            style={{
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "30px",
            }}
          >
            Medic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to={"/home"}>
                  <GoHomeFill />
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/profile"}>
                  <IoPerson />
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/chat"}>
                  <BsChatFill />
                </Link>
              </Nav.Link>
              {/* <Nav.Link>
              <Link to={"/settings"}>
                <IoSettingsSharp />
              </Link>
            </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container text-center" style={{ marginTop: "100px" }}>
        <div className="row ">
          <div className=" col-sm-6   col-md-4 col-lg-3   d-flex align-items-center justify-content-center">
            <h4 className="fw-bold">Patient_id:</h4>{" "}
            <h4 style={{ fontSize: "23px", marginLeft: "10px" }}>
              {uploadedTest.user_Data?.id}
            </h4>
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3  d-flex align-items-center justify-content-center">
            <h4 className="fw-bold">Patient_name:</h4>{" "}
            <h4 style={{ fontSize: "23px", marginLeft: "10px" }}>
              {uploadedTest.user_Data?.name}
            </h4>
          </div>
          <div className=" col-sm-6  col-md-4  col-lg-3 d-flex align-items-center justify-content-center">
            <h4 className="fw-bold">Patient_age:</h4>{" "}
            <h4 style={{ fontSize: "23px", marginLeft: "10px" }}>
              {uploadedTest.user_Data?.age}
            </h4>
          </div>
          <div className=" col-sm-6 col-md-12 col-lg-3 d-flex align-items-center justify-content-center">
            <h4 className="fw-bold">Patient_gender:</h4>{" "}
            <h4 style={{ fontSize: "23px", marginLeft: "10px" }}>
              {uploadedTest.user_Data?.female === 1 ? "Female" : "Male"}
            </h4>
          </div>
        </div>
      </div>

      {uploadedTest.user_tests?.[0]?.test_result ? (
        <Table striped bordered className=" uploaded-table text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Analysis_test</th>
              <th>Date</th>
              <th>Test_type</th>
              <th>Test_result</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {uploadedTest.user_tests.map((test, index) => (
              <tr key={index}>
                {/* <td><img src={getTestImagePath(test.analysis_test)} alt="Test_image" width="100px" height="100px" onClick={() => openImage(test.analysis_test)} /></td> */}
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`Analysis_Test_Images/${test.analysis_test}`}
                    // src={`${test.analysis_test}`}
                    alt="Test_image"
                    width="100px"
                    height="100px"
                  />
                </td>
                <td>{test.date}</td>
                <td>{test.test_type}</td>
                <td>{test.test_result}</td>
                <td>{test.time}</td>
                {/* <td> <RiDeleteBin6Line  style={{color:"red", cursor:"pointer"}}  /></td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center align-items-center  uploaded-h3">
          <h3 className=""> You didn't upload any test</h3>
        </div>
      )}
    </div>
  );
};

export default UploadedTests;
