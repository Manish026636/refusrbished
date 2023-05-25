/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Table from "../../Utils/Table";
import NextStageButton from "../../Utils/NextStageButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLMCAUSDataChairPOV,
  putMCAUSId,
} from "../../../../../actions/MCAUSActions";
import ReactCountryFlag from "react-country-flag";

import Loader from "../../../../Loader/Loader";
import { countryName2Code } from "../../../../CountriesName/countryName2Code";
import {
  clearErrorsVotes,
  clearMessagesVotes,
  voteChairAction,
} from "../../../../../actions/voteActions";
import { showErrors } from "../../../Utilities/errorShow";
import convertSecondsToMinutesAndSeconds from "../../Utils/convertSecondsToMinutesAndSeconds";

export default function ContainerTopicSelection({
  pendingMCAUSId,
  MCAUSChairDetails,
  chairperson_info,
}) {
  const [items, setItems] = useState(MCAUSChairDetails);
  console.log("MCAUSChairDetails: ", MCAUSChairDetails);

  const { loading, msg, error } = useSelector((state) => state.vote);
  const dispatch = useDispatch();
  const handleNextStage = (e) => {
    e.preventDefault();
    const topicIds = items?.slice(0, 3).map((item) => {
      return item.subtopic_id;
    });

    const data = {
      topicIds: topicIds,
      eligible_for_vote: true,
    };

    dispatch(voteChairAction(data));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toIndex) => {
    const id = e.dataTransfer.getData("id");
    const fromIndex = items.findIndex((item) => item.id === Number(id));
    const newItemOrder = [...items];
    const [removed] = newItemOrder.splice(fromIndex, 1);
    newItemOrder.splice(toIndex, 0, removed);
    setItems(newItemOrder);
  };
  const columns = [
    "Sr No.",
    chairperson_info?.is_portfolio ? "Portfolio" : "Country",
    "Proposed By",
    "Topic",
    "Total Time",
    "Per Person Time",
  ];
  useEffect(() => {
    if (msg) {
      showErrors(msg, true, "votes-msg");
      dispatch(clearMessagesVotes());
      dispatch(
        putMCAUSId({
          ...pendingMCAUSId,
          stage: pendingMCAUSId.stage + 1,
        })
      );
      dispatch(getALLMCAUSDataChairPOV());
    } else if (error) {
      showErrors(error, false, "votes-error");
      dispatch(clearErrorsVotes());
    }
  }, [error, msg, dispatch]);
  useEffect(() => {
    dispatch(getALLMCAUSDataChairPOV());
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen">
          <div className="mt-5 container mx-auto pl-4 ">
            <h1 className="text-red-500">
             Topics are arranged as per order of disruption. If you want to change the order, please click and drag for
              arranging the topic of your own choice.
            </h1>
          </div>
          <Table columns={columns}>
            {MCAUSChairDetails?.length > 0 ? (
              <>
                {items.map((MCAUSChairDetail, index) => {
                             const  maxTime= convertSecondsToMinutesAndSeconds(MCAUSChairDetail.max_time)
                             const  perPersonTime= convertSecondsToMinutesAndSeconds(MCAUSChairDetail.per_person_time)
                  return (
                    <tr
                      key={MCAUSChairDetail.id}
                      className={`${
                        index + 1 < 4
                          ? "bg-light-green-100 border-collapse"
                          : ""
                      }`}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, MCAUSChairDetail.id)
                      }
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <td className="border p-2 h-10 py-2">{index + 1}</td>
                      <td className="border p-2 h-10 py-2 text-left">
                        {chairperson_info?.is_portfolio ? (
                          ""
                        ) : (
                          <ReactCountryFlag
                            countryCode={
                              countryName2Code[MCAUSChairDetail?.country]
                            }
                            style={{
                              fontSize: "2em",
                              lineHeight: "2em",
                            }}
                            aria-label={MCAUSChairDetail.country}
                            svg
                          />
                        )}
                        <span className="m-3 text-xl">
                          {MCAUSChairDetail.country}
                        </span>
                      </td>
                      <td className="border p-2 h-10 py-2 text-center align-middle">
                        {MCAUSChairDetail.name}
                      </td>
                      <td className="border p-2 h-10 py-2 text-center align-middle">
                        {MCAUSChairDetail.subtopic_name}
                      </td>
                      <td className="border p-2 h-10 py-2 text-center align-middle">
                        {/* {MCAUSChairDetail.max_time} */}
                        <span className="text-3xl text-blue-700 font-medium mr-2">{maxTime.minutes}</span>
                          <span className="text-gray-600 font-medium mr-2">Min</span>
                          <span className="text-3xl text-blue-700 font-medium mr-2">{maxTime.seconds}</span>
                          <span className="text-gray-600 font-medium">Sec</span>

                      </td>
                      <td className="border p-2 h-10 py-2 text-center align-middle">
                      <span className="text-3xl text-gray-700 font-medium mr-2">{perPersonTime.minutes}</span>
                          <span className="text-gray-600 font-medium mr-2">Min</span>
                          <span className="text-3xl text-gray-700 font-medium mr-2">{perPersonTime.seconds}</span>
                          <span className="text-gray-600 font-medium">Sec</span>
                        {/* {MCAUSChairDetail.per_person_time} */}
                        
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-3 text-red-500 text-2xl"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </Table>
          <NextStageButton
            btnLabel={"Proceed for Passing the Motions"}
            handleNextStage={handleNextStage}
          />
          {/* {items.map(item=>{
           return(
             
             <h1>
               {item.id}
           </h1>
           )

          })} */}
        </div>
      )}
    </Fragment>
  );
}

// export default ContainerTopicSelection;
