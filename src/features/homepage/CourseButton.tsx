const CourseButton = ({ category }: { category: string }) => {
  return (
    <button className="bg-transparent rounded-full border border-primary-800 text-text-sm py-[6px] px-[14px] text-white web:px-[14px] web:py-2.5 ">
      {category}
    </button>
  );
};

export default CourseButton;
