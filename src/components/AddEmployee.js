import React,{useState} from 'react';
import axios from 'axios';
// import {useHistory} from "react-dom";

const customStyle = {
    width: '300px',
    margin: '0 auto'
}

const AddEmployee = () => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        photo: ""
    });
    const handleChange = (event) => {
        setUser({ ...user,[event.target.name]: event.target.value });
    }
    const handlePhoto = (event) => {
        setUser({ ...user,photo: event.target.files[0] });
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', user.photo);
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('phone', user.phone);

        axios.post('http://localhost:3002/employees/addEmp', formData)
        .then((response) => {
        console.log(response);
        // history.push('/');
        })
        .catch((error) => {
        console.log(error);
        });
    }
  
    return (
      <div className="container">
        <form style={customStyle} onSubmit={handleSubmit} encType='multipart/form-data'>
          <label>
            First Name
            <input
              name="firstName"
              type="text"
              value={user.firstName}
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
              value={user.lastName}
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
              value={user.email}
              onChange={handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Phone No
            <input
              name="phone"
              type="number"
              value={user.phone}
              onChange={handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Photo
            <input
              name="photo"
              type="file"
              accept=".png, .jpg, .jpeg"
              value={user.photo}
              onChange={handlePhoto}
              className="form-control"
            />
          </label>
          <br />
          <input type="submit" value="submit" className="btn btn-primary" />
        </form>
      </div>
    );
}

export default AddEmployee