import { useEffect, useState } from "react";
import WidgetNavbar from "../components/WidgetNavbar";
import configApi from "../config.api";
import WidgetEmployeeAdd from "../components/WidgetEmployeeAdd";
import WidgetEmployeeDetail from "../components/WidgetEmployeeDetail";
import CommonCurrency from "../components/CommonCurrency";

const PageEmployee = () => {
  const [employee, setEmployee] = useState([]);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee`, {
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
      setEmployee(content);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const AddEmployee = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error);
    }
  };

  const DetailEmployee = (e) => {
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
          <WidgetEmployeeAdd data={AddEmployee} />
          <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className=" w-full mb-2 border rounded-lg overflow-hidden text-sm text-left text-gray-500">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                Employees
                <p className="mt-1 text-sm font-normal text-gray-500">
                  List Of Our Employee
                </p>
              </caption>
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
                {employee.length > 0 &&
                  employee.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.firstName}
                      </th>
                      <td className="capitalize px-6 py-4">{item.lastName}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.department}</td>
                      <td className="px-6 py-4">
                        <CommonCurrency value={item.basicSalary} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <WidgetEmployeeDetail
                          dataEvent={DetailEmployee}
                          employeeId={item._id}
                        />
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

export default PageEmployee;
