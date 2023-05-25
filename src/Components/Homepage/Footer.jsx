import React from "react";

const Footer = () => {
  return (
    <>
      <div className=" mt-20 bg-gray-100">
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
            <div className="md:max-w-md lg:col-span-2">
              <a
                href="/"
                aria-label="Go home"
                title="Company"
                className="inline-flex items-center"
              >
                <img src="/static/media/footnav.png" height="20px" width="28px" alt="" />
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                  MÉLANGE x MUNITY
                </span>
              </a>
              <div className="mt-4 lg:max-w-sm">
                <p className="text-sm text-gray-800">
                  Powering to you !
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row ">
            <p className="text-sm text-gray-600 text-cente r">
              © Copyright 2023 Quantafile | Munity
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
