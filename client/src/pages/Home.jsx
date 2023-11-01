import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate("/addstore");
  };
  useEffect(() => {
    fetch("http://localhost:5000/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
      })
      .catch((err) => {
        console.log("an error while fetching", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          <span>H</span>
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Todo"
              className="bg-gray-700 text-white py-2 px-3 pr-10 rounded-lg w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-3">
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
      <div className="flex flex-col gap-1">
        {stores.map((store) => (
          <Store key={store._id} store={store} />
        ))}
      </div>
    </div>
  );
};

const Store = ({ store }) => {
  return (
    <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-wrap justify-between items-center border-gray-600 border px-1 py-1 rounded-sm bg-[#1a1a1a]">
        <div className="text-gray-400">
          <Link to={`/user/${store?._id}`}>
            <h1 className="underline">name: {store?.name}</h1>
          </Link>
          <p>Phone: {store?.phoneNumber}</p>
          <h3>due amount: {store?.amount}</h3>
        </div>
        <div className="text-gray-400 flex">
          <button className="bg-green-500 text-white px-3 py-1 text-sm rounded-md">
            pay
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
