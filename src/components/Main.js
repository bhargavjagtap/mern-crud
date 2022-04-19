import React from 'react'
import {Routes,Route} from 'react-router-dom'

import ListEmployee from "./ListEmployee";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const Main = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<ListEmployee />}/>
            <Route path="/list" element={<ListEmployee />}/>
            <Route path="/addemployee" caseSensitive element={<AddEmployee />}/>
            <Route exact path="/editEmployee/:id" element={<EditEmployee />}/>
        </Routes>
    </main>
  )
}

export default Main