import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import EmployeeService from './Services';
 
var divStyle = {
margin: '8% 8%',
};

const ListEmployee = () => {
  const [employees, setEmployees] = useState([])
  
  useEffect(() => {
    getEmployeeList();
  }, [])
  
  const getEmployeeList = () => {
    axios.get('http://localhost:3002/employees')
      .then((response) => {
        console.log(response);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

   // To delete any employee
  const deleteEmployee = (empid) => {
  EmployeeService.delete(empid);
  getEmployeeList();
  }
  
  return (
    <div style={divStyle}>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Photo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.map((employee, i) => {
              console.log("employee",employee);
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <img src={`http://localhost:3002/public/images/${employee.photo}`} height="200" width="200" alt="" />
                  </td>
                  <td>
                    <Link
                      to={"editEmployee/" + employee._id}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListEmployee