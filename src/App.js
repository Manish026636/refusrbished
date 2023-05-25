import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./Screens/SignUpPage";
import LoginPage from "./Screens/LoginPage";
import Home from "./Screens/Home";
import LogOutPage from "./Screens/LogOutPage";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Dashboard from "./Screens/Dashboard";
import DelegateCommiteeJoinForm from "./Screens/DelegateCommiteeJoinForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Screens/NotFound";
import About from "./Screens/About";
import Layout from "./utils/Layout";
import './App.css'
import Report from "./Components/Report/Report";
function App() {

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Committee form route */}
          <Route exact path="/me" element={<ProtectedRoute isAdmin={false} />}>
            <Route path="/me" element={<DelegateCommiteeJoinForm />} />
          </Route>
          {/* Dashboard route */}
          <Route path="/dashboard" element={<ProtectedRoute isAdmin={false} />}>
            <Route path="/dashboard/:tab?" element={<Dashboard />} />
          </Route>
          <Route path="/dashboard/report" element={<ProtectedRoute isChair={true} isAdmin={false} />}>
            <Route path="/dashboard/report" element={<Report />} />
          </Route>
          {/* <Route exact path="/session" element={<ProtectedRoute isAdmin={false} />}>
          <Route path="/session" element={<CommitteeSessionGenerator/>} />
          </Route> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
