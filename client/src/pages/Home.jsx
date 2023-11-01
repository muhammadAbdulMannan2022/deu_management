import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate("/addstore");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div>{/* items */}</div>
    </div>
  );
};

export default Home;
