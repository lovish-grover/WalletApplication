import axios from '../api/backendAPI'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import AllAcc from '../components/AllAcc'

function ShowAllAccounts() {

    return(
        <>
            <Navbar/>
            <AllAcc/>
        </>
    )
}

export default ShowAllAccounts