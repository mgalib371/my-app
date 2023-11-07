import "./Course_List.css";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-modal";
import axios from "axios";

const Dashboard = () => {
  const [record, setRecord] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [rs,setrs] = useState({
    id: "",
    userName: "",
    username: "",
    email: "",
    website: ""
  })

  const [search, setSearch] = useState("");                         // for search
  console.log(search);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then(res => setRecord(res))

      //   axios.get('http://localhost:3031/student')
      //  .then((response) => setData(response.data))
      //  .catch(res => console.log(res))

  }

  useEffect(() => {
    getData();
  }, [])

  const showDetail = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then(res => setrs(res))
  }

  return (
    <div className="container mt-2">
      <div className="row mt-2 ">
        <div className="col-lg-1 col-md-6 col-sm-12"></div>
        <div className="col-lg-11 col-md-6 col-sm-12">
          <h4 className="mt-3 mb-3 text-secondary">Student Course List</h4>
          <div className=" mt-5">
            <Form className="search">
              <InputGroup>
                <Form.Control
                  className="fa fa-search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Name"
                />
              </InputGroup>
            </Form>
            <table className="table table-striped table-sm">
              <thead className="thead-light">
                <tr>
                  <th>Enrollment_ID</th>
                  <th>Student_Name</th>
                  <th>Course_Name</th>
                  <th>Show Details</th>
                </tr>
              </thead>
              <tbody>
                {
                record
                  .filter((names) => {                              // for search
                    return search.toLowerCase() === ""
                      ? names
                      : names.name.toLowerCase().includes(search);
                  })
                  .map((names, index) => 
                    <tr key={index.id}>
                      <td>{names.id}</td>
                      <td>{names.name}</td>
                      <td>{names.username}</td>
                      <td>
                        <button 
                          className="btn btn-success"
                          onClick={(e) => showDetail(names.id)}
                          data-bs-toggle="modal"
                          data-bs-target="#myModa"
                        ><button className="btn btn-success" onClick={setModalOpen}>View Details</button>

                        </button>

                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <div className="modal-body sdetail">
          
          <h2>Student Class Details</h2>
              <p>id : {rs.id}</p>
              <p>Sname : {rs.name}</p>
              <p>Course Name : {rs.username}</p>
              <p>Instructor's Name : {rs.email}</p>
              <p>Description : {rs.website}</p>
              <p>Enrollment status : {rs.website}</p>
              <p> Course duration : {rs.website}</p>
              <p> Schedule : {rs.website}</p>
              <p>Location : {rs.website}</p>
              <p>Pre-requisites : {rs.website}</p>
              <p>Syllabus as an expandable item : {rs.website}</p>
            </div>

        <button  onClick={() => setModalOpen(false)}>Go Back</button>
      </Modal>

    </div>
  );
};
export default Dashboard;
