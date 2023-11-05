import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Information from './components/information/Information'
import "./index.css"
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

export default Dashboard;