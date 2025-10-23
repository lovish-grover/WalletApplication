import HomePage from "./pages/HomePage"
import "./index.css"
import { Route, Routes } from "react-router-dom"
import LogIn from "./pages/Login"
import SignUp from "./pages/SignUp"
import CreateAcc from "./pages/CreateAcc"
import ShowAllAccounts from "./pages/ShowAllAccounts"
import TransferPage from "./pages/TransferPage"
import DepositPage from "./pages/DepositPage"
import WithdrawPage from "./pages/WithdrawPage"
import UploadDocumentPage from "./pages/UploadDocumentPage"
import AadhaarVerifier from "./pages/AadharVerifier"

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <HomePage/> }></Route>
      <Route path='/login' element={ <LogIn/> }></Route>
      <Route path='/signup' element={ <SignUp/> }></Route>
      <Route path='/documents' element={ <UploadDocumentPage/> }></Route>
      <Route path="/createAcc" element={<CreateAcc></CreateAcc>}></Route>
      <Route path="/allAccounts" element={<ShowAllAccounts/>}></Route>
      <Route path="/transfer" element={<TransferPage></TransferPage>}></Route>
      <Route path="/deposit" element={<DepositPage/>}></Route>
      <Route path="/withdraw" element={<WithdrawPage/>}></Route>
      <Route path="/test" element={<AadhaarVerifier/>}></Route>
    </Routes>
    </>
  )
}

export default App
