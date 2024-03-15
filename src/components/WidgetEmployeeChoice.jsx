import { useMemo, useState } from "react";
import EmployeeModel from "../models/EmployeeModel";
import configApi from "../config.api";
import Card_ from "../Elements/Card";
import CommonCurrency from "./CommonCurrency";
import Modal from "../Elements/Modal";
import { PiUsersDuotone } from "react-icons/pi";

const WidgetEmployeeChoice = ({ dataEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      const content = await response.json();
      //  console.log(content);
      setEmployees(content);
    } catch (error) {
      alert(error);
    }
  };

  const modalGet = () => {
    setShowModal(true);
    get();
  };

  const choose = (e) => {
    setEmployee(e);
    dataEvent({ detail: { employee: e, status: true } });
    setShowModal(false);
  };

  return (
    <>
      <Card_>
        {!employee._id && (
          <Card_.Body
            title={"Employee"}
            content={
              <>
                <div className="py-2">
                  {"Please choose employee to add."}
                  <button
                    type="submit"
                    onClick={modalGet}
                    className="mt-2 block items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Choose Employee
                  </button>
                </div>
              </>
            }
          />
        )}
        {employee._id && (
          <>
            <Card_.Body title={employee.firstName} />
            <div className="mt-5 z-50 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className=" w-full mb-2 border rounded-lg overflow-hidden text-sm text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Email
                    </th>
                    <td className="lowercase px-6 py-4">{employee.email}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Department
                    </th>
                    <td className="capitalize px-6 py-4">
                      {employee.department}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Basic Salary
                    </th>
                    <td className="capitalize px-6 py-4">
                      {<CommonCurrency value={employee.basicSalary} />}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid gap-5 mb-6 md:grid-cols-2">
              <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                {employee.allowances.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-200">
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
                      {employee.allowances.map((item, index) => (
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
                {employee.deductions.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-200">
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
                      {employee.deductions.map((item, index) => (
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
              <Card_.Body
                content={
                  <>
                    <div className="py-2 text-sm">
                      {"To add employee again, click this button below"}
                      <button
                        type="submit"
                        onClick={modalGet}
                        className="mt-2 block items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Choose Employee
                      </button>
                    </div>
                  </>
                }
              />
            </div>
          </>
        )}
      </Card_>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={"Choose Employee"}
        IconTitle={<PiUsersDuotone className="text-5xl mr-3" />}
      >
        <Modal.Body
          content={
            <>
              <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" w-full mb-2 border rounded-lg overflow-hidden text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Basic Salary
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 &&
                      employees.map((item) => (
                        <tr key={item._id} className="bg-white border-b">
                          <td className="capitalize px-6 py-4">
                            {item.firstName}
                          </td>
                          <td className="capitalize px-6 py-4">
                            {item.lastName}
                          </td>
                          <td className="px-6 py-4 lowercase">{item.email}</td>
                          <td className="px-6 py-4">{item.department}</td>
                          <td className="px-6 py-4">
                            <CommonCurrency value={item.basicSalary} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="submit"
                              onClick={() => choose(item)}
                              className="mt-2 block items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              Choose
                            </button>
                          </td>
                        </tr>
                      ))}
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

export default WidgetEmployeeChoice;
