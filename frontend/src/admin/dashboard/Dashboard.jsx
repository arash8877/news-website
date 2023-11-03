Dashboard.jsx

import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/context'
import Sidebar from './components/sidebar/Sidebar'
import Information from './components/information/Information'
import "./index.css"
import Main from './components/main/Main'
const Dashboard = ({children}) => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-info">
        <Information />
        <div className="main">
           {children}
        </div>
      </div>
    </div>
  )
}

export default Dashboard