import { useSelect } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const CPDashboard = ({ committeName }) => {
  // const { delegate_info } = useSelector((state) => state.delegate_details);

  const params = useParams();
  const { tab } = params;
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => { }, []);
  return (
    <>
    <div className="flex flex-col items-center justify-center">
    <div className="mt-10">
      <h1 className="text-3xl lg:text-4xl text-[#A8A8A8] font-bold text-center">Greetings, Chairperson</h1>
    </div>
    <div className="flex flex-col gap-6 justify-center sm:flex-row">
      <div className="bg-[#f4f6f9] border-4 mt-10 lg:mt-10 mb-10 rounded-3xl border-[#D3D3D3] w-[40vh] h-60">
        <h1 className="text-center pt-12 font-bold">Committee Name</h1>
        <h1 className="text-center text-5xl font-bold pt-10 text-[#42A0F6]">{committeName}</h1>
      </div>
      <div className="bg-[#f4f6f9] border-4 mt-10 lg:mt-10 mb-10 rounded-3xl border-[#D3D3D3] w-[40vh] h-60">
        <h1 className="text-center pt-12 font-bold">Total Members</h1>
        <h1 className="text-center text-5xl font-bold pt-8 text-[#42A0F6]">50</h1>
      </div>
    </div>
  </div>
    </>
  );
};

export default CPDashboard;
