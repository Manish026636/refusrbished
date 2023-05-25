import React from 'react'
import Header from '../Components/Navbar/Header'

import About from "./About";
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoutes/ProtectedRoute';
import DelegateCommiteeJoinForm from './DelegateCommiteeJoinForm';
import NotFound from './NotFound';
import Home from './Home';
import DashTabs from '../Components/Tabs/DashBoardTabs/DashTabs';
const MainPage = () => {
  return (

    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route exact path="/me" element={<ProtectedRoute isAdmin={false} />}>
          <Route path="" element={<DelegateCommiteeJoinForm />} />
        </Route>
        {/* <Route
          exact
          path="/dashboard"
          element={<ProtectedRoute isAdmin={false} />}
        >
          {/* <Route path='/dashboard' element={<NavHead />}>

<Route path=':cptab' element={null}>

<Route path='gsl' element={<GSL />} />
<Route path='md' element={<MD />} />

<Route path='unmd' element={<UNMD />}></Route>
<Route path='roll' element={<UNMD />}></Route>
</Route>  
          </Route> */}

        {/* </Route> */}
        <Route

          path="/dashboard"
          element={<ProtectedRoute isAdmin={false} />}
        >
          <Route path='/dashboard' element={<DashTabs />}>

            <Route path=':cptab' element={null}>

              <Route path='gsl' element={<About />} />
              <Route path='md' element={<About />} />

              <Route path='unmd' element={<About />}></Route>
              <Route path='roll' element={<About />}></Route>
            </Route>
          </Route>

        </Route>
        <Route path='/about' element={<About />}></Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default MainPage