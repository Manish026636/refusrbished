import React, { Fragment } from "react";
import MCAUSChairDashboard from "../Chairperson/MCAUS/MCAUSChairDashboard";

const MDSwitcher = ({ is_chair,pendingCommitteeSessionId ,markedRollList, chairperson_info}) => {
  return (
    <Fragment>
      {is_chair ? <div><MCAUSChairDashboard chairperson_info={chairperson_info} pendingCommitteeSessionId={pendingCommitteeSessionId} markedRollList={markedRollList} /></div> : <div>MD Delegate</div>}
    </Fragment>
  );
};

export default MDSwitcher;
