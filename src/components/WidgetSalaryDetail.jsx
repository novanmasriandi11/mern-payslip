import { useState } from "react";
import { PiUserListDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import Modal from "../Elements/Modal";
import configApi from "../config.api";
import SalaryModel from "../models/SalaryModel";
import CommonCurrency from "./CommonCurrency";
import CommonDate from "./CommonDate";
import WidgetEmployeePreview from "./WidgetEmployeePreview";
import EmployeeModel from "../models/EmployeeModel";

const WidgetSalaryDetail = ({ salaryId }) => {
  const [showModal, setShowModal] = useState(false);
  const [salary, setSalary] = useState(SalaryModel);
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary/${salaryId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      let content = await response.json();
      setSalary(content);
      //  dataEvent({ detail: { status: true, content } });
    } catch (error) {
      //  dataEvent({ detail: { status: false, error } });
    }
  };

  const handleClick = () => {
    setShowModal(true);
    get();
  };

  const userListener = (e) => {
    e.detail.status && setEmployee(e.detail.content);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="block inline-flex gap-4 text-white bg-teal-400 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        <PiUserListDuotone className="text-lg" />
        Detail
      </button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={
          <>
            <div className="text-left">
              {employee.firstName} {employee.lastName}
              <br />
              <div className="lowercase flex d-flex">{employee.email}</div>
              {<CommonDate date={salary.payrollDate} />}
            </div>
          </>
        }
        IconTitle={<GiMoneyStack className="text-5xl mr-3" />}
      >
        <Modal.Body
          content={
            <>
              <WidgetEmployeePreview
                employeeId={salary.employeeId}
                dataEvent={userListener}
              />
              <div className="grid gap-5 mb-6 md:grid-cols-2">
                <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                  {salary.othersAllowance.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
                        Others Allowance
                      </caption>
                      <thead className="bg-black">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                          >
                            Allowance
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {salary.othersAllowance.map((item, index) => (
                          <tr className="hover:bg-gray-100" key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                              <CommonCurrency value={item.total} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                  {salary.othersDeduction.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
                        Others Deduction
                      </caption>
                      <thead className="bg-black">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                          >
                            Deduction
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {salary.othersDeduction.map((item, index) => (
                          <tr className="hover:bg-gray-100" key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                              <CommonCurrency value={item.total} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                <table className="min-w-full divide-y divide-gray-200">
                  <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
                    Pay Slip
                  </caption>
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Total Allowance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Total Deduction
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Total Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                        <CommonCurrency value={salary.totalAllowance} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                        <CommonCurrency value={salary.totalDeduction} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                        <CommonCurrency value={salary.totalSalary} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
        />
      </Modal>
    </>
  );
};

export default WidgetSalaryDetail;
