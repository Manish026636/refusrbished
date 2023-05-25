/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getDelegateDetails } from "../actions/deligateActions";
import Loader from "../Components/Loader/Loader";
import DashTabs from "../Components/Tabs/DashBoardTabs/DashTabs";
import { showErrors } from "../Components/Tabs/Utilities/errorShow";
import { getMarkedRollList } from "../actions/rollCallActions";
// import PageTabs from "../Components/Tabs/PageTabs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, delegate_info } = useSelector(
    (state) => state.delegate_details
  );

  const { pendingCommitteeSession } = useSelector(
    (state) => state.comm_session
  );

  const params = useParams();
  const { tab } = params;
  // useEffect(() => {
  // }, []);
  useEffect(() => {
    if (error) {
      showErrors(error, false, "delegate-error");
      dispatch(clearErrors());
    }
  }, [error]);
  useEffect(() => {
    dispatch(getDelegateDetails());
    // if (!is_authenticated) {
    //   toast.error("Login first to access the dashboard");
    //   navigate("/login");
    // }
    if (!delegate_info?.id) {
      showErrors("Join your committee", false, "delegate-error2");
      navigate("/me");
    }
    if (pendingCommitteeSession?.id) {
      dispatch(getMarkedRollList(pendingCommitteeSession?.id));
    }
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {delegate_info && (
            <Fragment>
              <DashTabs Routetab={tab} delegate_info={delegate_info} />
            </Fragment>
          )}
        </Fragment>
      )}
      {/* {commLoading && <Loader isOverlay={true} />} */}
    </Fragment>
  );
};

export default Dashboard;
