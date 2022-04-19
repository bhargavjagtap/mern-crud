import axios from 'axios';

const EmployeeService = {
    delete : (id) => {
    return axios.get('http://localhost:3002/employees/deleteEmp/'+id)
    .then(() => {
        console.log('Employee deleted successfully');
    })
    .catch(error => {
        console.log(error);
    })
    }
}
export default EmployeeService;