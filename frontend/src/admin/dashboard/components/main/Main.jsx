import React, {useContext} from 'react';
import "./main.css";
import Dashboard from '../../Dashboard';
import { AuthContext } from '../../../context/context';


const Main = () => {
 const {nameOfUser} = useContext(AuthContext);


  return (
     <Dashboard>
            <h1 className='is-size-3'>Hi {nameOfUser}! Welcome to admin panel.</h1>
            <h3 className='is-size-5 mt-3'>Hope you have good news.</h3>
     </Dashboard>
  )
}

export default Main