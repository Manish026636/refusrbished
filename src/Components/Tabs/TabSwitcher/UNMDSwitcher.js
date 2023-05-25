import React, { Fragment } from "react";
import UNMCAUSChairDashboard from "../Chairperson/UNMCAUS/UNMCAUSChairDashboard";

const UNMDSwitcher = ({ is_chair, markedRollList, chairperson_info }) => {
  return (
    <Fragment>
      {is_chair ? <div><UNMCAUSChairDashboard chairperson_info={chairperson_info} markedRollList={markedRollList}/></div> : <div>UNMD Delegate</div>}

    </Fragment>
  );
};

export default UNMDSwitcher;
