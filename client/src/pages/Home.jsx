import { useContext, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { logOutUser } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate("/addstore");
  };
  const handleCount = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    fetch("https://server-weld-five.vercel.app/stores", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ count }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
      })
      .catch((err) => {
        console.log("an error while fetching", err);
      });
  }, [count]);
  const handleLogOut = () => {
    logOutUser()
      .then((data) => {
        // do somthing
        console.log("logout success full");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSerch = () => {
    if (searchTerm !== "") {
      fetch("https://server-weld-five.vercel.app/search", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: searchTerm }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length >= 0) {
            setStores(data);
          }
          console.log(data);
        })
        .catch((err) => {
          console.log("an error while fetching", err);
        });
    }
  };
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold shadow rounded-full">
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="border px-1 rounded-lg cursor-pointer"
          >
            D
          </span>
        </h1>
        <div
          className={`absolute z-10 top-12 left-12 ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <button
            onClick={handleLogOut}
            className="px-2 py-1 rounded bg-green-500 shadow-xl"
          >
            log out
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Todo"
              className="bg-gray-700 text-white py-2 px-3 pr-10 rounded-lg w-48"
              value={searchTerm}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSerch();
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              onClick={handleSerch}
              className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
            >
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            onClick={handleAddTodo}
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll">
        {stores.length <= 0 ? (
          <h1 className="text-center mt-5 text-xl text-gray-600">
            you did not add any store. <br />
            add a store now!
          </h1>
        ) : (
          stores.map((store) => <Store key={store._id} store={store} />)
        )}
      </div>
      <div className="flex items-center justify-center relative bottom-0 mt-5">
        <button
          onClick={handleCount}
          className={`px-2 rounded-md bg-green-500 ${
            stores.length < 49 && "hidden"
          }`}
        >
          more ...
        </button>
      </div>
    </div>
  );
};

const Store = ({ store }) => {
  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      <div className="flex flex-wrap justify-between items-center border-gray-600 border px-1 py-1 rounded-sm bg-[#1a1a1a]">
        <div className="text-gray-400">
          <Link to={`/user/${store?._id}`}>
            <h1 className="underline">name: {store?.name}</h1>
          </Link>
          <p>Phone: {store?.phoneNumber}</p>
          <h3>
            current due: {store?.amount} <small>tk</small>
          </h3>
        </div>
        <div className="text-gray-400 flex">
          <Link to={`/user/${store?._id}`}>
            <button className="bg-green-500 text-white px-3 py-1 text-sm rounded-md">
              pay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
