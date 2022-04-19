import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';//to get params from req url

const customStyle = {
    width: '300px',
    margin: '0 auto'
}

const EditEmployee = ({match}) => {
    const [emp, setEmp] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    })
    const {id} = useParams();

    useEffect(() => {
        getEmployeeById();
    }, [])

     
 // To get employee based on ID
    const getEmployeeById = () => {
    axios.get('http://localhost:3002/employees/editEmp/' + id)
    .then((response) => {
    setEmp({
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    phone: response.data.phone
    });
    })
    .catch((error) => {
    console.log(error);
    })
    }

    const handleChange = (event) => {
        setEmp({ ...emp,[event.target.name]: event.target.value });
    }
    // To update the record on submit
    const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone } = emp;
    axios.post('http://localhost:3002/employees/updateEmp/' + id, {
    firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
    })
    .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <div className="container">
      <form style={customStyle} onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            name="firstName"
            type="text"
            value={emp.firstName}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Last Name
          <input
            name="lastName"
            type="text"
            value={emp.lastName}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Email
          <input
            name="email"
            type="text"
            value={emp.email}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Phone No
          <input
            name="phone"
            type="text"
            value={emp.phone}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <input type="submit" value="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default EditEmployee