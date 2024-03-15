import { useMemo, useState } from "react";
import SalaryModel from "../models/SalaryModel";
import Modal from "../Elements/Modal";
import EmployeeModel from "../models/EmployeeModel";
import CommonCurrency from "./CommonCurrency";
import { PiTrashDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import AllowanceModel from "../models/AllowanceModel";
import DeductionModel from "../models/DeductionModel";
import configApi from "../config.api";
import WidgetEmployeeChoice from "./WidgetEmployeeChoice";

const WidgetSalaryAdd = ({ dataEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [salary, setSalary] = useState(SalaryModel);
  const [employee, setEmployee] = useState(EmployeeModel);
  const [otherAllowance, setOtherAllowance] = useState(AllowanceModel);
  const [otherDeduction, setOtherDeduction] = useState(DeductionModel);
  const [totalSalary, setTotalSalary] = useState(0);

  const handleOtherAllowance = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (type === "number") {
      value = parseInt(value);
    }

    setOtherAllowance((values) => ({ ...values, [name]: value }));
  };

  const handleOtherDeduction = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (type === "number") {
      value = parseInt(value);
    }

    setOtherDeduction((values) => ({ ...values, [name]: value }));
  };

  const addOtherAllowance = (e) => {
    if (!otherAllowance.name && !otherAllowance.total) return;

    setSalary((salary) => {
      let currentSalary = { ...salary };
      let currentOtherAllowance = { ...otherAllowance };
      currentSalary.othersAllowance.push(currentOtherAllowance);
      setOtherAllowance(AllowanceModel);
      return currentSalary;
    });
  };

  const addOtherDeduction = (e) => {
    if (!otherDeduction.name && !otherDeduction.total) return;
    setSalary((salary) => {
      let currentSalary = { ...salary };
      let currentOtherDeduction = { ...otherDeduction };
      currentSalary.othersDeduction.push(currentOtherDeduction);
      setOtherDeduction(DeductionModel);
      return currentSalary;
    });
  };

  const removeOtherAllowance = (index) => {
    setSalary((salary) => {
      let currentSalary = { ...salary };
      currentSalary.othersAllowance.splice(index, 1);
      return currentSalary;
    });
  };

  const removeOtherDeduction = (index) => {
    setSalary((salary) => {
      let currentSalary = { ...salary };
      currentSalary.othersDeduction.splice(index, 1);
      return currentSalary;
    });
  };

  const employeeChoice = (e) => {
    setEmployee(e.detail.employee);
    setSalary((values) => ({ ...values, employeeId: e.detail.employee._id }));
  };

  useMemo(() => {
    let total = () => {
      let totalAllowances = 0;
      let totalDeductions = 0;

      if (salary.othersAllowance.length > 0) {
        totalAllowances += salary.othersAllowance.reduce(
          (total, item) => total + item.total,
          0
        );
      }

      if (salary.othersDeduction.length > 0) {
        totalDeductions += salary.othersDeduction.reduce(
          (total, item) => total + item.total,
          0
        );
      }

      if (employee._id) {
        totalAllowances += employee.allowances.reduce(
          (total, item) => total + item.total,
          0
        );
        totalDeductions += employee.deductions.reduce(
          (total, item) => total + item.total,
          0
        );
        setTotalSalary(
          employee.basicSalary + (totalAllowances - totalDeductions)
        );
      }
    };
    total();
    return () => {};
  }, [salary, employee]);

  const pay = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(salary),
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const content = await response.json();
      setSalary(SalaryModel);
      setOtherAllowance(AllowanceModel);
      setOtherDeduction(DeductionModel);
      setTotalSalary(0);
      setEmployee(EmployeeModel);
      setShowModal(false);
      dataEvent({ detail: { content, status: true } });
    } catch (error) {
      dataEvent({ detail: { error, status: false } });
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="block inline-flex flex items-center gap-4 text-white bg-blue-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        <GiMoneyStack className="text-2xl" />
        Pay Slip
      </button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={"Pay Slip"}
        IconTitle={<GiMoneyStack className="text-5xl mr-3" />}
      >
        <Modal.Body
          content={
            <>
              <WidgetEmployeeChoice dataEvent={employeeChoice} />
              <div className="grid gap-5 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Other Allowances
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      name="name"
                      placeholder={"Name"}
                      value={otherAllowance.name}
                      onChange={handleOtherAllowance}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="total"
                      placeholder={0}
                      value={otherAllowance.total || 0}
                      onChange={handleOtherAllowance}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addOtherAllowance}
                      className="p-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-teal-500 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                    {salary.othersAllowance.length > 0 && (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-black">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                            >
                              Name
                            </th>
                            <th
                              colSpan={2}
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
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() => removeOtherAllowance(index)}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                  <PiTrashDuotone />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Other Deductions
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      name="name"
                      placeholder={"Name"}
                      value={otherDeduction.name}
                      onChange={handleOtherDeduction}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="total"
                      placeholder={0}
                      value={otherDeduction.total}
                      onChange={handleOtherDeduction}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addOtherDeduction}
                      className="p-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-teal-500 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                    {salary.othersDeduction.length > 0 && (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-black">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                            >
                              Name
                            </th>
                            <th
                              colSpan={2}
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
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() => removeOtherDeduction(index)}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                  <PiTrashDuotone />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-black">
                    <tr>
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
                        <CommonCurrency value={totalSalary} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
        />
        <Modal.Footer btnYes={"Save Changes"} onClick={pay} />
      </Modal>
    </>
  );
};

export default WidgetSalaryAdd;
