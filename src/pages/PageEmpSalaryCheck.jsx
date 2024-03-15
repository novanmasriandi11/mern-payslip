import { useState } from "react";
import EmployeeModel from "../models/EmployeeModel";
import SalaryModel from "../models/SalaryModel";
import configApi from "../config.api";

const PageEmpSalaryCheck = () => {
  const [showModal, setShowModal] = useState(false);
  const [salary, setSalary] = useState(SalaryModel);
  const [employee, setEmployee] = useState(EmployeeModel);
  const [input, setInput] = useState({});

  const get = async () => {
    const response = await fetch(`${configApi.BASE_URL}/cek/slip-gaji`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    if (!response.ok) {
      throw new Error(`Error Status ${response.status}`);
    }

    let content = await response.json();
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  return (
    <div className="container-xxl bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-6 md:p-8">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 mb-5">
              Pay Slip Empoyee
            </h5>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInput}
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                placeholder="name@company.com"
              />
            </div>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                </svg>
              </span>
              <input
                type="month"
                name="period"
                value={input.period}
                onChange={handleInput}
                id="period"
                placeholder="Payroll Month"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <button
              type="submit"
              //     onClick={handleInput}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Check Pay Slip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEmpSalaryCheck;
