import React, { useState } from "react";
import { FaMoneyBill1Wave } from "react-icons/fa6";

export default function WidgetNavbar() {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 bg-teal-400">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-flex gap-4 mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#"
            >
              <FaMoneyBill1Wave className="text-2xl" /> Payslip
            </a>
          </div>
          <div className="lg:flex flex-grow items-center">
            <ul className="flex flex-col gap-5 px-5 lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <div className="text-xs uppercase font-bold text-white flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:cursor-pointer group">
                  <span>Master</span>
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  <div className="absolute top-10 z-50 hidden group-hover:block hover:block font-normal bg-white divide-y divide-x-2 divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href="/users"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Users
                        </a>
                      </li>
                      <li>
                        <a
                          href="/employee"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Employee
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="text-xs uppercase font-bold text-white flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:cursor-pointer group">
                  <span>Transactions</span>
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  <div className="absolute top-10 z-50 hidden group-hover:block hover:block font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <a
                          href="/salaries"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Salary (payroll)
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
