import React, { useState } from 'react'
import UserManagerConsole from './UserManagerConsole'
import { Button } from '@mui/material'


const User = () => {

    const [show,setShow] = useState(false);

    function toShow(){
        setShow(true);
    }

  return (
    <>
        <Button onClick={toShow}>User Manager</Button>
        {show && <UserManagerConsole/>}
    </>
  )
}

export default User
