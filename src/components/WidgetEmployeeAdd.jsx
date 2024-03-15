import { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import Modal from "../Elements/Modal";
import InputField from "../Elements/InputField";
import { PiTextboxDuotone, PiTrashDuotone } from "react-icons/pi";
import { ImMail4 } from "react-icons/im";
import EmployeeModel from "../models/EmployeeModel";
import AllowanceModel from "../models/AllowanceModel";
import DeductionModel from "../models/DeductionModel";
import configApi from "../config.api";
import CommonCurrency from "./CommonCurrency";
import Swal from "sweetalert2";

const WidgetEmployeeAdd = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState(EmployeeModel);
  const [allowance, setAllowance] = useState(AllowanceModel);
  const [deduction, setDeduction] = useState(DeductionModel);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (type === "number") {
      value = parseInt(value);
    }

    setEmployee((employee) => ({ ...employee, [name]: value }));
    e.target.reset;
  };

  const handleAllowanceAndDeduction = (e, isAllowance) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (type === "number") {
      value = parseInt(value);
    }

    if (isAllowance) {
      setAllowance((allowance) => ({ ...allowance, [name]: value }));
    } else {
      setDeduction((deduction) => ({ ...deduction, [name]: value }));
    }
    e.target.reset;
  };

  const addAllowance = () => {
    if (allowance.name && allowance.total) {
      setEmployee((employee) => {
        let currentData = { ...employee };
        currentData.allowances.push(allowance);
        return currentData;
      });
    }
  };

  const addDeduction = () => {
    if (deduction.name && deduction.total) {
      setEmployee((employee) => {
        let currentData = { ...employee };
        currentData.deductions.push(deduction);
        return currentData;
      });
    }
  };

  const removeAllowance = (index) => {
    setEmployee((employee) => {
      let currentData = { ...employee };
      currentData.allowances.splice(index, 1);
      return currentData;
    });
  };

  const removeDeduction = (index) => {
    setEmployee((employee) => {
      let currentData = { ...employee };
      currentData.deductions.splice(index, 1);
      return currentData;
    });
  };

  const create = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      let content = await response.json();

      setEmployee(() => {
        let currentData = { ...EmployeeModel };
        currentData.allowances = [];
        currentData.deductions = [];
        return currentData;
      });

      data({ detail: { status: true, content } });
      setShowModal(false);
      Swal.fire("Good Job!", "Adding new employee successfully!", "success");
    } catch (error) {
      data({ detail: { status: false, error } });
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="block inline-flex gap-4 text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        <BsPersonFillAdd className="text-xl" /> Add New Employee
      </button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Employee"
      >
        <Modal.Body
          content={
            <>
              <div className="grid gap-5 mb-6 md:grid-cols-2">
                <div>
                  <InputField
                    label={"Email"}
                    icon={<ImMail4 />}
                    type={"email"}
                    name={"email"}
                    value={employee.email}
                    placeholder={"name@mail.com"}
                    onChange={handleInput}
                  />
                  <InputField
                    label={"First Name"}
                    icon={<PiTextboxDuotone />}
                    type={"text"}
                    name={"firstName"}
                    value={employee.firstName}
                    placeholder={"Your First Name"}
                    onChange={handleInput}
                  />
                  <InputField
                    label={"Last Name"}
                    icon={<PiTextboxDuotone />}
                    type={"text"}
                    name={"lastName"}
                    value={employee.lastName}
                    placeholder={"Your Last Name"}
                    onChange={handleInput}
                  />
                  <InputField
                    label={"Department"}
                    icon={<PiTextboxDuotone />}
                    type={"text"}
                    name={"department"}
                    value={employee.department}
                    placeholder={"Software Architect"}
                    onChange={handleInput}
                  />
                  <InputField
                    label={"Basic Salary"}
                    icon={<PiTextboxDuotone />}
                    type={"number"}
                    name={"basicSalary"}
                    value={employee.basicSalary}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Allowance
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      name="name"
                      placeholder={"Name"}
                      value={allowance.name}
                      onChange={(e) => handleAllowanceAndDeduction(e, true)}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="total"
                      placeholder={0}
                      value={allowance.total}
                      onChange={(e) => handleAllowanceAndDeduction(e, true)}
                      className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addAllowance}
                      className="p-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-teal-500 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden shadow-lg my-5">
                    {employee.allowances.length > 0 && (
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
                          {employee.allowances.map((item, index) => (
                            <tr className="hover:bg-gray-100" key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                <CommonCurrency value={item.total} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() => removeAllowance(index)}
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
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Deduction
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <input
                        type="text"
                        name="name"
                        placeholder={"Name"}
                        value={deduction.name}
                        onChange={(e) => handleAllowanceAndDeduction(e)}
                        className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="total"
                        placeholder={0}
                        value={deduction.total}
                        onChange={(e) => handleAllowanceAndDeduction(e)}
                        className="ps-1 p-2.5 w-full bg-gray-50 border border-gray-300 shadow-sm  text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addDeduction}
                        className="p-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-teal-500 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Add
                      </button>
                    </div>
                    <div className="border rounded-lg overflow-hidden shadow-xl mt-5">
                      {employee.deductions.length > 0 && (
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
                            {employee.deductions.map((item, index) => (
                              <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  <CommonCurrency value={item.total} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                  <button
                                    type="button"
                                    onClick={() => removeDeduction(index)}
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
              </div>
            </>
          }
        />
        <Modal.Footer btnYes={"Save Changes"} onClick={create} />
      </Modal>
    </>
  );
};

export default WidgetEmployeeAdd;
