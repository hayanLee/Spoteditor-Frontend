import { Outlet } from 'react-router-dom';

const RegisterLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen mx-auto web:w-[724px]">
      <div className="w-full h-full grow px-4 py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
