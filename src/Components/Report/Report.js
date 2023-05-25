import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { reportAction, clearErrors } from "../../actions/reportActions";
import { showErrors } from "../Tabs/Utilities/errorShow";

const RollCallReport = React.lazy(() => import("./RollCallReport"));
const GSLReport = React.lazy(() => import("./GSLReport"));
const MCAUSReport = React.lazy(() => import("./MCAUSReport"));
const UNMCAUSReport = React.lazy(() => import("./UNMCAUSReport"));
const FinalReport = React.lazy(() => import("./FinalReport"));

const Report = () => {
  const { loading, error, report } = useSelector((state) => state.report);
  const { delegate_info } = useSelector((state) => state.delegate_details);
  const {CommitteeSessionData} = useSelector((state) => state.comm_session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reportAction(delegate_info?.community));
  }, []);

  useEffect(() => {
    if (error) {
      showErrors(error, false, "report-error")
      dispatch(clearErrors())
    }
  }, [error])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {report?.committee && (
            <Suspense fallback={<Loader />}>
            <div className="container mx-auto">
              <h1 className="text-center text-indigo-500 my-2 font-bold text-xl">
                Committee Name: {report.committee}
              </h1>
              <RollCallReport report={report} delegate_info={delegate_info} />
              <GSLReport report={report} delegate_info={delegate_info} />
              <MCAUSReport report={report} delegate_info={delegate_info} />
              <UNMCAUSReport report={report} delegate_info={delegate_info} />
              <FinalReport report={report} delegate_info={delegate_info} />
            </div>
            </Suspense>
          )}
        </>
      )}
    </>
  );
};

export default Report;
