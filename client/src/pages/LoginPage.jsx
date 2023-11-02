import { useContext, useState } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { logInUserEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can implement your authentication logic here
    logInUserEmailPassword(email, password)
      .then((res) => {
        console.log(res);
        setErrorMessage("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err?.code);
        setErrorMessage(
          err?.message == "Firebase: Error (auth/invalid-login-credentials)."
            ? "wrong email and passwod"
            : "some error"
        );
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black text-white">
      <div className="flex items-center justify-between w-full px-2 py-2">
        <h2 className="text-2xl font-semibold mb-4">Log in</h2>
        <Link to="/">
          <BiArrowToLeft className="w-6 h-6" />
        </Link>
      </div>
      <div className="p-6 bg-black rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-black"
          placeholder="Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
