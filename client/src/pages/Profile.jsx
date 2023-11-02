import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [due, setDue] = useState();
  const [paidAmount, setPaidAmount] = useState("");
  const [addMoreDue, setAddMoreDue] = useState("");
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
          setPaidAmount("");
          console.log(data);
          setDue(due - paidAmount);
        })
        .catch((err) => console.log(err));

      toast.success("successfully paid");
    } else {
      toast.error("data is not currect");
    }
  };
  const handleMoreDue = (e) => {
    if (
      !isNaN(addMoreDue) &&
      Number(addMoreDue) <= Number(store?.amount) &&
      Number(addMoreDue) > 0
    ) {
      fetch(`http://localhost:5000/${id}/addDue`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ newAmaunt: addMoreDue }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAddMoreDue("");
          console.log(data);
          setDue(Number(due) + Number(addMoreDue));
        })
        .catch((err) => console.log(err));

      toast.success("successfully give the due");
    } else {
      toast.error("data is not currect");
    }
  };
  const scrollInto = (elid) => {
    const element = document.getElementById(elid);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bg-black min-h-screen text-white px-2 py-2">
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

            <div className="flex items-center  justify-between pt-2">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  pay :
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="amount"
                  value={paidAmount}
                  onChange={handleChange}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
              >
                pay
              </button>
            </div>
            <div className="flex items-center  justify-between pt-2">
              <div className="mb-4">
                <label htmlFor="moredue" className="block mb-2">
                  add more due :
                </label>
                <input
                  type="text"
                  id="moredue"
                  name="moredue"
                  placeholder="amount"
                  value={addMoreDue}
                  onChange={(e) => setAddMoreDue(e.target.value)}
                  className="bg-gray-700 text-white py-2 px-3 rounded-lg w-full"
                />
              </div>
              <button
                onClick={handleMoreDue}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
              >
                add due
              </button>
            </div>
            <div className=" flex gap-4 mb-3">
              <button
                onClick={() => scrollInto("historyDue")}
                className="bg-green-500 px-2  rounded-sm"
              >
                due history
              </button>
              <button
                onClick={() => scrollInto("historyPayment")}
                className="bg-green-500 px-2 rounded-sm"
              >
                payment history
              </button>
            </div>
            <div id="historyDue" className="border p-1">
              <h1 className="font-bold mb-2">due history</h1>
              {store?.dueDate?.map((dueWDate) => (
                <h1
                  className="border-b"
                  key={
                    dueWDate[0] +
                    Math.floor(Math.random() * 5) +
                    Math.floor(Math.random() * 50)
                  }
                >
                  Due: {dueWDate[1]} <small> tk</small>
                  <br /> Date : {dueWDate[0]}
                </h1>
              ))}
            </div>
            <div id="historyPayment" className="border p-1 mt-4">
              <h1 className="font-bold mb-2">payment history</h1>
              {store?.lastPayment?.map((payWDate) => (
                <h1
                  className="border-b"
                  key={payWDate[0] + Math.floor(Math.random() * 5)}
                >
                  Due: {payWDate[1]} <small> tk</small>
                  <br /> Date : {payWDate[0]}
                </h1>
              ))}
            </div>
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
