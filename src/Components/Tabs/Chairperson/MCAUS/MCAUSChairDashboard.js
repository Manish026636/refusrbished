/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessages,
  getALLMCAUSDataChairPOV,
  getMCAUSId,
} from "../../../../actions/MCAUSActions";
import { showErrors } from "../../Utilities/errorShow";
import Loader from "../../../Loader/Loader";
const DoYouHaveMotionsOnFloor = lazy(() =>
  import("./Stage0/DoYouHaveMotionsOnFloor")
);
const AddMotions = lazy(() => import("./Stage1/AddMotions"));
const ContainerTopicSelection = lazy(() =>
  import("./Stage2/ContainerTopicSelection")
);
const VotingSection = lazy(() => import("./Stage3/VotingSection"));
const MCAUSCheckboxRegSelection = lazy(() =>
  import("./Stage4/MCAUSCheckboxRegSelection")
);
const MCAUSInfo = lazy(() => import("./Stage5/MCAUSInfo"));

const MCAUSChairDashboard = ({
  pendingCommitteeSessionId,
  markedRollList,
  chairperson_info,
}) => {
  const {
    loading: MCAUSLoading,
    pendingMCAUSId,
    error: MCAUSError,
    msg: MCAUSMsg,
    MCAUSChairDetails,
  } = useSelector((state) => state.MCAUS);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMCAUSId(pendingCommitteeSessionId));
  }, []);

  useEffect(() => {
    if (MCAUSError) {
      showErrors(MCAUSError, false, "mcaus-error");
      dispatch(clearErrors());
    }
    if (MCAUSMsg) {
      showErrors(MCAUSMsg, true, "mcaus-msg");
      dispatch(getALLMCAUSDataChairPOV());
      dispatch(clearMessages());
    }
  }, [MCAUSError, MCAUSMsg, dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        {MCAUSLoading && <Loader isOverlay={true} />}
        {!pendingMCAUSId?.id ? (
          <DoYouHaveMotionsOnFloor
            pendingCommitteeSessionId={pendingCommitteeSessionId}
          />
        ) : (
          <>
            {pendingMCAUSId.stage === 1 && (
              <AddMotions
                chairperson_info={chairperson_info}
                MCAUSChairDetails={MCAUSChairDetails}
                pendingMCAUSId={pendingMCAUSId}
              />
            )}
            {pendingMCAUSId.stage === 2 && (
              <ContainerTopicSelection
                chairperson_info={chairperson_info}
                pendingMCAUSId={pendingMCAUSId}
                MCAUSChairDetails={MCAUSChairDetails}
              />
            )}
            {pendingMCAUSId.stage === 3 && (
              <VotingSection
                chairperson_info={chairperson_info}
                pendingMCAUSId={pendingMCAUSId}
                markedRollList={markedRollList}
                pendingCommitteeSessionId={pendingCommitteeSessionId}
              />
            )}
            {pendingMCAUSId.stage === 4 && (
              <MCAUSCheckboxRegSelection
                chairperson_info={chairperson_info}
                pendingMCAUSId={pendingMCAUSId}
                markedRollList={markedRollList}
              />
            )}
            {pendingMCAUSId.stage === 5 && (
              <MCAUSInfo
                chairperson_info={chairperson_info}
                pendingMCAUSId={pendingMCAUSId}
                markedRollList={markedRollList}
              />
            )}
          </>
        )}
      </Suspense>
    </>
  );
};

export default MCAUSChairDashboard;
