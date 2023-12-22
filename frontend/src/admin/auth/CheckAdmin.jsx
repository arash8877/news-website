import React, {useContext} from 'react';
import { AuthContext } from '../context/context';


const CheckAdmin = () => {
    const {admin} = useContext(AuthContext);
  return (
    <div>CheckAdmin</div>
  )
}

export default CheckAdmin;