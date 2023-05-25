import React, { Fragment } from "react";
import RollCall from "../Chairperson/RollCall/RollCall";

const RollCallSwitcher = ({
  is_chair,
  pendingCommitteeSessionId,
  chairperson_info,
  markedRollList,
  
}) => {
  return (
    <Fragment>
      {is_chair && (
        <div>
          <RollCall
            CommitteeSessionData={pendingCommitteeSessionId}
            chairperson_info={chairperson_info}
            markedRollList={markedRollList}
          />
        </div>
      )}
    </Fragment>
  );
};

export default RollCallSwitcher;
