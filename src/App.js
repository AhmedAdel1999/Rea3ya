import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getAllUsers } from './features/reducers/userSlice';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import CreateAcount from './components/createacount/CreateAcount';
import Volunteer from './components/createacount/Volunteer';
import Needy from "./components/createacount/Needy"
import Login from './components/login/Login';
import Organization from './components/createacount/Organization';
import User from './components/createacount/User';
import kindofuser from './utils/Services';
import ProfileData from './components/profiles/profileData/ProfileData';
import MainProfile from './components/profiles/mainProfile/MainProfile';
import DonateCases from './components/profiles/donateCases/DonateCases';
import HelpCases from './components/profiles/helpCases/HelpCases';
import CreateCase from './components/createacount/CreateCase';
import ForgetPassword from './components/forgetpassword/ForgetPassword';
import AllAdmins from './components/admin/allAdmins/AllAdmins';
import AddAdmin from './components/admin/addAdmin/AddAdmin';
import AddPart from './components/admin/addPart/AddPart';
import AllParts from './components/admin/allparts/AllParts';
import HowToUsePage from './components/basicHomes/HowToUsePage';
import ContactUsPage from './components/basicHomes/ContactUsPage';
import DepartMentsPage from './components/basicHomes/DepartMentsPage';
import CommonQuesPage from './components/basicHomes/CommonQuesPage';
import PageNotFound from './components/pagenotfound/PageNotFound';
import ResetPassword from './components/resetpassword/ResetPassword';
import SingleCase from './components/singlecase/SingleCase';
import NeedyCasePage from './components/basicHomes/NeedyCasesPage';
import "./App.css"




function App() {
  const {token,role} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllUsers())
  },[])
  return (
    <div className="App" id='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
        
          <Route path='/' element={(token || role)?kindofuser(role):<Home/>}>
            {
              role==="super_admin"?
              <Route index element={<AllAdmins />} />
              :
              <Route index element={<AllParts />} />
            }
            <Route path='allAdmins' element={<AllAdmins />} />
            <Route path='allParts' element={<AllParts />} />
            <Route path='donatecases' element={<DonateCases />} />
            <Route path='helpcases' element={<HelpCases />} />
          </Route>
          <Route path='/helpcases/:id' element={<SingleCase />} />
          
          <Route path='/addAdmin' element={<AddAdmin />} />
          <Route path='/addAdmin/:id' element={<AddAdmin />} />

          <Route path='/addPart' element={<AddPart />} />
          <Route path='/addPart/:id' element={<AddPart />} />

          <Route path='/createacount' element={<CreateAcount />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/forgetpassword' element={<ForgetPassword />} />
          <Route path='/login/resetpassword' element={<ResetPassword />} />

          <Route path='/howtousepage' element={<HowToUsePage />} />
          <Route path='/contactus' element={<ContactUsPage />} />
          <Route path='/departmentspage' element={<DepartMentsPage />} />
          <Route path='/commonques' element={<CommonQuesPage />} />
          <Route path='/needycasespage' element={<NeedyCasePage />} />
          
          <Route path='/createacount/volunteer' element={<Volunteer route="volunteer" />} />
          <Route path='/createacount/needy' element={<Needy route="needy" />} />
          <Route path='/createacount/organization' element={<Organization route="organization" />} />
          <Route path='/createacount/user' element={<User route="user" />} />
          <Route path='/createcase' element={<CreateCase />} />
          <Route path='/createcase/:id' element={<CreateCase />} />
          
          <Route path='/profile' element={token?<MainProfile />:<PageNotFound />}>
            <Route index element={<ProfileData />} />
            <Route path='/profile/profiledata' element={<ProfileData />} />
            <Route path='donatecases' element={<DonateCases />} />
            <Route path='helpcases' element={<HelpCases />} />
          </Route>
          
          <Route path='*' element={<PageNotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
