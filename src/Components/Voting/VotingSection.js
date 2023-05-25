import React, { useEffect, useState } from "react";
import { w3cwebsocket as Web3CWebsocket } from "websocket";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, voteAction } from "../../actions/voteActions";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const VotingSection = ({ delegate }) => {
  const [discussion, setDiscussion] = useState("");
  const [startPollButtonDisabled, setStartPollButtonDisabled] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const { loading, error, vote } = useSelector((state) => state.vote);

  const handleDiscussionChange = (event) => {
    setDiscussion(event.target.value);
    setStartPollButtonDisabled(false);
  };

  const socket = new Web3CWebsocket(
    "ws://127.0.0.1:8000/ws/vote_notifications/"
  );

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    setMessages(data);
  };
  socket.onopen = function () {
    console.log("Connection established");
  };

  const handleStartPoll = () => {
    const message = {
      topic_id: discussion,
      start_poll: true,
    };
    socket.send(JSON.stringify(message));
  };

  const handleVote = (vote, id) => {
    const message = {
      delegate: delegate.id,
      topic: id,
      vote_choice: vote,
    };
    setIsLoading(vote === true ? "yes" : "no");
    dispatch(voteAction(message));
  };

  useEffect(() => {
    if (error) {
      Object.keys(error).map((key) => {
        return toast.error(error[key][0]);
      });
      dispatch(clearErrors());
    }
    if (vote) {
      toast.success(vote);
    }
  }, [error, dispatch, vote]);
  console.log(messages);
  return (
    <div>
      {delegate?.is_chair_person && (
        <div>
          <label>Discussion:</label>
          <input
            className="border-black border"
            type="text"
            value={discussion}
            onChange={handleDiscussionChange}
          />
          <button onClick={handleStartPoll} disabled={startPollButtonDisabled}>
            Start Poll
          </button>
        </div>
      )}
      {messages && (
        <div>
          {messages.topic?.map((message, index) => {
            if (message.topic_name) {
              return (
                <div key={index}>
                  <p>{message.topic_name}</p>
                  <button
                    className="flex py-2 px-3 border rounded mx-1 my-2 transition-all ease-linears border-green-500 hover:bg-green-500 hover:border-green-600 active:bg-green-700"
                    onClick={() => handleVote(true, message.id)}
                  >
                    <span className="mr-2">Yes</span>
                    {loading && isLoading === "yes" && (
                      <FaSpinner className="animate-spin" />
                    )}
                  </button>
                  <button
                    className="flex py-2 px-3 border rounded mx-1 transition-all ease-linears border-red-500 hover:bg-red-500 hover:border-red-600 active:bg-red-700"
                    onClick={() => handleVote(false, message.id)}
                  >
                    <span className="mr-2">No</span>
                    {loading && isLoading === "no" && (
                      <FaSpinner className="animate-spin" />
                    )}
                  </button>
                </div>
              );
            } else {
              return <p key={index}>{message.message}</p>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default VotingSection;
