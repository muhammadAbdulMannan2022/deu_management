import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [due, setDue] = useState();
  const [paidAmount, setPaidAmount] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/store/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStore(data);
        setDue(data?.amount);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setPaidAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    if (
      !isNaN(paidAmount) &&
      Number(paidAmount) <= Number(store?.amount) &&
      Number(paidAmount) > 0
    ) {
      fetch(`http://localhost:5000/${id}/pay`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount: paidAmount }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDue(due - paidAmount);
        })
        .catch((err) => console.log(err));

      toast.success("successfully paid");
    } else {
      toast.error("data is not currect");
    }
  };
  return (
    <div className="bg-black h-screen text-white px-2 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">
          {store ? store?.name : "...."}
        </h2>
        <Link to="/">
          <BiArrowToLeft className="w-6 h-6" />
        </Link>
      </div>
      {store ? (
        <>
          <Toaster />
          <div>
            <h1>name: {store?.name}</h1>
            <h1>Phone: {store?.phoneNumber}</h1>
            <h1>
              Due ammount: {due}
              <small> tk</small>
            </h1>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                paid amount:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="paid amount"
                value={paidAmount}
                onChange={handleChange}
                className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              pay
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-white text-2xl">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
