import { useState } from "react";
import configApi from "../config.api";
import Modal from "../Elements/Modal";
import { BsPersonFillAdd } from "react-icons/bs";
import { ImMail4 } from "react-icons/im";
import {
  PiTextboxDuotone,
  PiPasswordDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import InputField from "../Elements/InputField";
import Swal from "sweetalert2";

const WidgetUserAdd = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
    e.target.reset;
  };

  const create = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      let content = await response.json();
      data({ detail: { status: true, content } });

      setShowModal(false);
      Swal.fire("Good Job!", "Adding new user successfully!", "success");
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
        <BsPersonFillAdd className="text-xl" /> Add New User
      </button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        IconTitle={<PiUserCircleDuotone className="text-3xl mr-2" />}
        title="Add New User"
      >
        <Modal.Body
          content={
            <>
              <InputField
                label={"First Name"}
                icon={<PiTextboxDuotone />}
                type={"text"}
                name={"firstName"}
                value={user.firstName}
                placeholder={"Your First Name"}
                onChange={handleInput}
              />
              <InputField
                label={"Last Name"}
                icon={<PiTextboxDuotone />}
                type={"text"}
                name={"lastName"}
                value={user.lastName}
                onChange={handleInput}
                placeholder={"Your Last Name"}
              />
              <InputField
                label={"Email"}
                icon={<ImMail4 />}
                type={"email"}
                name={"email"}
                value={user.email}
                onChange={handleInput}
                placeholder={"name@mail.com"}
              />
              <InputField
                label={"Password"}
                icon={<PiPasswordDuotone />}
                type={"password"}
                name={"password"}
                value={user.password}
                onChange={handleInput}
                placeholder={"***********"}
              />
            </>
          }
        />
        <Modal.Footer btnYes={"Save Changes"} onClick={create} />
      </Modal>
    </>
  );
};

export default WidgetUserAdd;
