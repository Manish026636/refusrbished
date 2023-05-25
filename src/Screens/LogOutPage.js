import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, userLogout } from "../actions/userActions";
import Loader from "../Components/Loader/Loader";
import { showErrors } from "../Components/Tabs/Utilities/errorShow";

const LogOutPage = () => {
  const { loading, error, is_authenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showErrors(error, false, 'logout')
      dispatch(clearErrors());
    }
    if (!is_authenticated) {
      showErrors("Logout successful", true, 'logout-success')
      navigate("/");
    }
  }, [error, is_authenticated, navigate, dispatch]);
  useEffect(() => {
    dispatch(userLogout());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-green-500 text-lg text-center font-bold">
          User Log Out
        </div>
      )}
    </Fragment>
  );
};

export default LogOutPage;
