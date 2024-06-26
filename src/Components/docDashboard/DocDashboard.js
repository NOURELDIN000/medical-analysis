import { Link } from "react-router-dom";
import DocNavBar from "../DocNavBar/DocNavBar";
import "./docDashboard.css";
import Table from "react-bootstrap/Table";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import Alert from "react-bootstrap/Alert";
import { IoMdClose } from "react-icons/io";

const DocDashboard = ({ showAlert, setShowAlert }) => {
  const [doctors, setDoctors] = useState({});
  // const [patients, setPatients] = useState([]);
  const [patientsDetails, setPatientsDetails] = useState({});

  // const baseUrl = "https://bload-test.icanforsoftware.com/api/"
  const baseUrl = "http://127.0.0.1:8000/api/";

  const cookie = Cookie();

  const token = cookie.get("DocBearer");

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `${baseUrl}Doctor/Dashboard?api_password=AHMED$2024&id=${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        console.log(data.doctor);
        console.log(data.patients);
        setDoctors(data.doctor);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchPatientId = async (id) => {
      try {
        const response = await axios.get(
          `${baseUrl}test/info/${id}?api_password=AHMED$2024`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        console.log(data);
        setPatientsDetails(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientId(29);
  }, [token]);

  setTimeout(() => {
    setShowAlert(false);
  }, 3000);

  return (
    <div className="docdashboard ">
      {showAlert && (
        <div className="centered-alert-doc-dash">
          <Alert
            variant="success"
            style={{ color: "#fff", background: "#75b798" }}
          >
            You have logged in successfully.
            <IoMdClose
              className="close-icon-doc-dash"
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        </div>
      )}
      <DocNavBar />
      <div className="row d-flex">
        <div className="  col-3 col-md-4   col-lg-2 sidebar">
          <Link className="dashSidebarLink" to={"/patientdashboard"}>
            {" "}
            get Patient Test
          </Link>
        </div>

        <div className="  col-9 col-md-8    col-lg-10  p-0">
          <Table striped bordered className="">
            <thead>
              <tr>
                <th>Doc_id</th>
                <th>Doc_name</th>
                <th>Doc_email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{patientsDetails.doc_id?.user_id}</td>
                <td>{doctors.name}</td>
                <td>{doctors.email}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DocDashboard;

//       {/* { <div style={{position:"relative"}}> <Alert variant="success" style={{zIndex:"3", textAlign:"center", position:"absolute",display:"inline-block",}}>
//             You have logged in successfully
//           </Alert>      <IoMdClose style={{ position: "absolute",  left:"220px", bottom:"-25px" ,zIndex:"3", cursor:"pointer" }} onClick={()=> {setShowAlert(false)}} />
//  </div>
//  } */}

//  {/* {patients.map((item, index)=> {
//       return (

//         <tr key={index}>
//          <td>{index + 1}</td>
//          <td>{item.patient_name}</td>
//          <td>{item.Patient_age}</td>

//          <td><RiDeleteBin6Line className='dashDelete'  /></td>
//        </tr>

//        )})} */}

// useEffect( ()=>{
//   let res =  axios.get(`${baseUrl}Doctor/Dashboard?api_password=AHMED$2024`, {

//   headers: {
//     Authorization: 'Bearer ' + token
//   }
// // eslint-disable-next-line no-use-before-define
// }).then((doctors)=> {
//   console.log(doctors.patients)
//   setDoctors(doctors.patients)
// })
// },[])
