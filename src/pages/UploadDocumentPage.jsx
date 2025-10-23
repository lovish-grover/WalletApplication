import axios from '../api/backendAPI';
import React, { use, useState } from 'react'
import Navbar from '../components/Navbar';
import UploadDocuments from '../components/UploadDocumenrts';
import Footer from '../components/Footer';

function UploadDocumentPage() {
    return(
        <>
        <Navbar></Navbar>
        <UploadDocuments/>
        <Footer/>
        </>
    )
}
export default UploadDocumentPage