import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualificatons: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {};

  const updateProfileHandler = async (e) => {
    e.preventDefault();
  };

  // reuseable function for adding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  // reuseable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const [name, value] = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualificatons", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualificatons", index, event);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name</p>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form__input"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            readonly=""
            name="email"
            placeholder="Enter Your Email"
            className="form__input"
            aria-readonly="true"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            className="form__input"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            maxlength="100"
            placeholder="Bio"
            className="form__input"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender</p>
              <select
                name="gender"
                className="form__input py-3.5"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                className="form__input py-3.5"
                value={formData.specilaization}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                name="ticketPrice"
                placeholder="100"
                className="form__input"
                value={formData.ticketPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>

          {formData.qualificatons?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    className="form__input"
                    value={item.startingDate}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    className="form__input"
                    value={item.endingDate}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form__label">Degree*</p>
                  <input
                    type="text"
                    name="degree"
                    className="form__input"
                    placeholder="Degree"
                    value={item.degree}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form__label">University*</p>
                  <input
                    type="text"
                    name="university"
                    className="form__input"
                    placeholder="University"
                    value={item.university}
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>
              <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experiences*</p>

          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    className="form__input"
                    value={item.startingDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    className="form__input"
                    value={item.endingDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form__label">Position*</p>
                  <input
                    type="text"
                    name="position"
                    className="form__input"
                    placeholder="Position"
                    value={item.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="form__label">Hospital*</p>
                  <input
                    type="text"
                    name="hospital"
                    className="form__input"
                    placeholder="Hospital"
                    value={item.hospital}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white">
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[30px]"
            >
              <div>
                <p className="form__label">Day*</p>
                <select
                  name="day"
                  className="form__input py-3.5"
                  value={item.day}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                </select>
              </div>
              <div>
                <p className="form__label">Starting Time*</p>
                <input
                  type="time"
                  name="startingTime"
                  className="form__input"
                  value={item.startingTime}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="form__label">Ending Time*</p>
                <input
                  type="time"
                  name="endingTime"
                  className="form__input"
                  value={item.endingTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white">
            Add TimeSlot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            type="text"
            rows="5"
            name="about"
            placeholder="Write about you"
            className="form__input"
            value={formData.about}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className=" relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpeg,.png"
              className=" absolute w-full h-full top-0  left-0 opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute inset-0 flex justify-center items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
