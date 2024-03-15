import { useState } from "react";
import UserModel from "../models/UserModel";
import configApi from "../config.api";
import { PiUserCircleDuotone, PiUserListDuotone } from "react-icons/pi";

const WidgetUserDetail = ({ dataEvent, userId }) => {
  const [user, setUser] = useState(UserModel);
  const [showModal, setShowModal] = useState(false);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      let content = await response.json();
      setUser(content);
    } catch (error) {
      alert(error);
    }
  };

  const handleClick = () => {
    setShowModal(true);
    get();
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
    e.target.reset;
  };

  const update = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`Error Status ${response.status}`);
      }
      setShowModal(false);
      let content = await response.json();
      setUser(UserModel);
      dataEvent({ detail: { status: true, content } });
    } catch (error) {
      dataEvent({ detail: { status: false, error } });
    }
  };

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={handleClick}
        className="block inline-flex gap-4 text-white bg-teal-400 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        <PiUserListDuotone className="text-lg" /> Detail
      </button>

      {/* <!-- Main modal --> */}
      {showModal ? (
        <>
          {user && (
            <>
              <div className="shadow-xl justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-sm">
                  {/* <!-- Modal content --> */}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                      <div className="inline-flex gap-3 text-3xl font-black">
                        <PiUserCircleDuotone />{" "}
                        <h3 className="text-xl capitalize font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                      </div>
                      <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5">
                      <div className="space-y-4">
                        <div>
                          <label className="flex mb-2 text-sm font-medium text-gray-900">
                            Your email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@company.com"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="flex mb-2 text-sm font-medium text-gray-900">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleInput}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Your First Name"
                            required
                          />
                        </div>
                        <div>
                          <label className="flex mb-2 text-sm font-medium text-gray-900">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleInput}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Your Last Name"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={update}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default WidgetUserDetail;
