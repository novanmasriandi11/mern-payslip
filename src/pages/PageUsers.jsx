import { useEffect, useState } from "react";
import configApi from "../config.api";
import WidgetUserAdd from "../components/WidgetUserAdd";
import WidgetNavbar from "../components/WidgetNavbar";
import WidgetUserDetail from "../components/WidgetUserDetail";

const PageUsers = () => {
  const [user, setUser] = useState([]);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users`, {
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
      setUser(content);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const AddUser = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.status.error);
    }
  };

  const updateUser = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.status.error);
    }
  };

  return (
    <>
      <div className="container-fluid h-max bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r">
        <WidgetNavbar />
        <div className="block mx-5 pt-5">
          <WidgetUserAdd title="Add New User" data={AddUser} />
          <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className=" w-full mb-2 border rounded-lg overflow-hidden text-sm text-left text-gray-500">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                Users
                <p className="mt-1 text-sm font-normal text-gray-500">
                  List Of User Access
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.length > 0 &&
                  user.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.firstName}
                      </th>
                      <td className="px-6 py-4">{item.lastName}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4 text-right">
                        <WidgetUserDetail
                          dataEvent={updateUser}
                          userId={item._id}
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

export default PageUsers;
