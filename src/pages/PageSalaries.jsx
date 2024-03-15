import { useEffect, useState } from "react";
import WidgetNavbar from "../components/WidgetNavbar";
import CommonDate from "../components/CommonDate";
import CommonCurrency from "../components/CommonCurrency";
import configApi from "../config.api";
import WidgetSalaryDetail from "../components/WidgetSalaryDetail";
import WidgetSalaryAdd from "../components/WidgetSalaryAdd";

const PageSalaries = () => {
  const [salary, setSalary] = useState([]);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      const content = await response.json();
      setSalary(content);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const SalaryAdd = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error);
    }
  };

  return (
    <>
      <div className="container-fluid h-screen bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r">
        <WidgetNavbar />
        <div className="block mx-5 pt-5">
          <WidgetSalaryAdd dataEvent={SalaryAdd} />
          <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className=" w-full mb-2 border rounded-lg overflow-hidden text-sm text-left text-gray-500">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                Salaries
                <p className="mt-1 text-sm font-normal text-gray-500">
                  List Of Our Payroll
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payroll Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Allowance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Deduction
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {salary.length > 0 &&
                  salary.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.employeeId}
                      </th>
                      <td className="px-6 py-4">
                        <CommonDate date={item.payrollDate} />
                      </td>
                      <td className="px-6 py-4">
                        <CommonCurrency value={item.totalAllowance} />
                      </td>
                      <td className="px-6 py-4">
                        <CommonCurrency value={item.totalDeduction} />
                      </td>
                      <td className="px-6 py-4">
                        <CommonCurrency value={item.totalSalary} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <WidgetSalaryDetail salaryId={item._id} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSalaries;
