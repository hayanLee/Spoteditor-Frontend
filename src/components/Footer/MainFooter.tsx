const MainFooter = () => {
  return (
    <footer className="w-full bg-black px-50px">
      <div className="flex gap-4 text-primary-200 border-b border-primary-950 mt-20 web:mt-[200px] py-4 web:py-8">
        <div className="flex gap-4 web:gap-8 web:grow">
          <a href={'https://tally.so/r/nrYJEo'} target="_blank">
            Contact Us
          </a>
        </div>
        <p>Instragram</p>
      </div>

      <div className="flex flex-col web:flex-row gap-3 justify-between text-primary-600 mt-4 mb-10">
        <p>©2025 Spoteditor. All Rights are reserved️</p>
        <div className="flex gap-6">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
