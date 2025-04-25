import { Outlet } from 'react-router-dom';

const EditLayout = () => {
  return (
    <div className="flex flex-col items-center h-dvh mx-auto web:w-[724px]">
      <div className="w-full h-full grow">
        <Outlet />
      </div>
    </div>
  );
};

export default EditLayout;
