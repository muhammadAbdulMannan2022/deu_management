import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (!loading) {
    return user ? (
      <>{children}</>
    ) : (
      <>
        <Navigate to="/login"></Navigate>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center py-10">
          <div className="relative inline-block">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full border-t-2 border-blue-500 rounded-full animate-spin"
              style={{
                borderWidth: "2rem",
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full border-t-2 border-blue-200 rounded-full animate-spin"
              style={{
                borderWidth: "2rem",
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                animationDelay: "0.15s",
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }
};

export default Private;
