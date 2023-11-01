import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export default MainLayout;
