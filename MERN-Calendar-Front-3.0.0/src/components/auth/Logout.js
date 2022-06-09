import React from 'react'
import { startLogout } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux'



const Logout = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch( startLogout() );
    }
  return (
    <div>

        {handleLogout()}

    </div>
  )
}

export default Logout