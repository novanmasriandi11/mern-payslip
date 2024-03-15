import { useEffect, useState } from "react";
import EmployeeModel from "../models/EmployeeModel";
import configApi from "../config.api";
import CommonCurrency from "./CommonCurrency";

const WidgetEmployeePreview = ({ employeeId, dataEvent }) => {
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(
        `${configApi.BASE_URL}/employee/${employeeId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      let content = await response.json();
      setEmployee(content);
      dataEvent({ detail: { status: true, content } });
    } catch (error) {
      dataEvent({ detail: { status: false, error } });
    }
  };

  useEffect(() => {
    get();
    return () => {};
  }, [employeeId]);

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-lg my-5">
        <table className="min-w-full divide-y divide-gray-200">
          <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
            Employee
          </caption>
          <thead className="bg-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
              >
                Basic Salary
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-6 py-4 lowercase whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                <CommonCurrency value={employee.basicSalary} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid gap-5 mb-6 md:grid-cols-2">
        <div className="border rounded-lg overflow-hidden shadow-lg my-5">
          <table className="min-w-full divide-y divide-gray-200">
            <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
              Allowance
            </caption>
            <thead className="bg-black">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                >
                  Name
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
              {employee.allowances &&
                employee.allowances.map((item, index) => (
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
        </div>
        <div className="border rounded-lg overflow-hidden shadow-lg my-5">
          <table className="min-w-full divide-y divide-gray-200">
            <caption className="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
              Deduction
            </caption>
            <thead className="bg-black">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                >
                  Name
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
              {employee.deductions &&
                employee.deductions.map((item, index) => (
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
        </div>
      </div>
    </>
  );
};

export default WidgetEmployeePreview;
