import React from "react";
import { formateDate } from "../../utils/formatedate";

const DoctorAbout = ({name ,qualifications,experiences, about}) => {
  return (
    <div>
      <div className="">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className=" text-irisBlueColor font-bold text-[24px] leading-9">
            Tech Zain
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vel
          delectus distinctio, molestias nam repudiandae at! Illum ipsa
          doloribus dolorum provident omnis natus delectus, ab excepturi quis,
          vel itaque dolorem. , molestias nam repudiandae at! Illum ipsa
          doloribus dolorum provident omnis natus delectus, ab excepturi quis,
          vel itaque dolorem. lectus, ab excepturi quis, vel itaque dolorem.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Education
        </h3>
        <ul className="mt-5 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div className="">
              <span className=" text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2012")} - {formateDate("01-04-2014")}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hostipals, New York.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div className="">
              <span className=" text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("05-04-2014")} - {formateDate("12-04-2017")}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hostipals, New York.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Experience
        </h3>
        <ul className="grid flex-row sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className=" text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("05-04-2014")} - {formateDate("12-04-2017")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hostipals, New York.
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className=" text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("05-04-2014")} - {formateDate("12-04-2017")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hostipals, New York.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
