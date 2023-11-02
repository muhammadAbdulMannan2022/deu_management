import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowToLeft } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [date, month, time] = new Date()
    .toLocaleString()
    .split(",")[0]
    .split("/");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    amount: "",
    dueDate: [],
    lastPayment: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission of the form data here
    // For now, we'll just display the entered data in the console
    console.log(formData);
    formData.dueDate = [[`${date}/${month}/${time}`, formData.amount]];
    if (
      typeof formData.name === "string" &&
      !isNaN(formData.phoneNumber) &&
      !isNaN(formData.amount) &&
      Number(formData.amount) > 0
    ) {
      fetch("http://localhost:5000/addStore", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormData({
            name: "",
            phoneNumber: "",
            amount: "",
          });
          toast.success("the store successfully added");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        });
    } else {
      toast.error("plese fill up the data currectly");
    }
  };

  return (
    <div className="bg-black text-white p-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Add store</h2>
        <Link to="/">
          <BiArrowToLeft className="w-6 h-6" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="store name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
          />
        </div>
        <Toaster />
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="store phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">
            Due amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="due amount"
            value={formData.amount}
            onChange={handleChange}
            className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Add store
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
