import React, { Fragment } from "react";
import GSLChairDashboard from "../Chairperson/GSL/GSLChairDashboard";
const GSLSwitcher = ({ is_chair ,chairperson_info,markedRollList,CommitteeSessionData}) => {
  return (
    <Fragment>
      {is_chair ? <div> <GSLChairDashboard chairperson_info={chairperson_info} markedRollList={markedRollList} CommitteeSessionData={CommitteeSessionData} /> </div> : <div>GSL Delegate</div>}
    </Fragment>
  );
};

export default GSLSwitcher;
