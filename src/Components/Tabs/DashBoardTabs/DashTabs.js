import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import CPDashboard from "../Chairperson/Dashboard/CPDashboard";
import { clearErrors, clearMessages, getALLCommitteeSessionDataChairPOV } from "../../../actions/committeeSessionActions";
import { getMarkedRollList } from "../../../actions/rollCallActions";
import NavTab from "../../Common/NavTab";
import SessionInfo from "../../Common/SessionInfo";
import { showErrors } from "../Utilities/errorShow";
import CommitteeSessionGenerator from "../../CommitteSessionGenerator/CommitteeSessionGenerator";

const GSLSwitcher = lazy(() => import("../TabSwitcher/GSLSwitcher"));
const MDSwitcher = lazy(() => import("../TabSwitcher/MDSwitcher"));
const RollCallSwitcher = lazy(() => import("../TabSwitcher/RollCallSwitcher"));
const UNMDSwitcher = lazy(() => import("../TabSwitcher/UNMDSwitcher"));


const tabs = [
  { id: "roll", label: "Roll", component: RollCallSwitcher },
  { id: "gsl", label: "GSL", component: GSLSwitcher },
  { id: "mdcaus", label: "MD", component: MDSwitcher },
  { id: "unmcaus", label: "UNMD", component: UNMDSwitcher },
];
const DashTabs = ({ Routetab, delegate_info }) => {
  const { markedRollList } = useSelector((state) => state.roll_call);
  const finalRoute = Routetab ? Routetab.toLowerCase() : null;
  const activeTab = tabs.find((tab) => tab.id === finalRoute);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, pendingCommitteeSession, error, msg } = useSelector((state) => state.comm_session);
  // console.log("🚀 ~ file: DashTabs.js:32 ~ DashTabs ~ CommitteeSessionData:", CommitteeSessionData);  
  // console.log(markedRollList);

  // console.log(pendingCommitteeSession);  
  useEffect(() => {
    if (!activeTab && finalRoute) {
      navigate("/404");
    }
  }, [finalRoute]);
  useEffect(() => {
    dispatch(getALLCommitteeSessionDataChairPOV(delegate_info.community));
    if (pendingCommitteeSession?.id) {
      dispatch(getMarkedRollList(pendingCommitteeSession.id));
    }
  }, []);
  useEffect(() => {
    if (error) {
      showErrors(error, false, 'comm_error')
      dispatch(clearErrors())
    }
    if (msg) {
      showErrors(msg, true, 'comm_success')
      dispatch(clearMessages())
    }
  }, [error, msg, dispatch])
  return (
    <>
      {pendingCommitteeSession?.id ?
        (
          <Suspense fallback={<Loader />}>
            <div className="mt-10">
              <SessionInfo pendingCommitteeSession={pendingCommitteeSession} committeName={delegate_info.community_name} />
              <NavTab routeTab={finalRoute} />
            </div>
            <div>
              {finalRoute ? (
                <>
                  {activeTab && (
                    <>
                  
                        <>
                          <activeTab.component
                            {...{

                              is_chair: delegate_info.is_chair_person,
                              pendingCommitteeSessionId: pendingCommitteeSession.id,
                              chairperson_info: delegate_info,
                              markedRollList: markedRollList,
                            }}
                          />
                        </>
                
                    </>
                  )}
                </>
              ) : (
                <CPDashboard committeName={delegate_info.community_name} />
              )}
            </div>
          </Suspense>
        ) : <CommitteeSessionGenerator />
      }
    </>

  );
};

export default DashTabs;
