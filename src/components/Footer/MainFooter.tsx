import { Link } from 'react-router-dom';

const MainFooter = () => {
  return (
    <footer className="w-full bg-black px-4 web:px-[50px] text-text-sm web:text-text-md">
      <div className="flex gap-4 text-light-200 border-b border-light-950 mt-20 web:mt-[200px] py-4 web:py-8">
        <div className="flex gap-4 web:gap-8 web:grow">
          <a href={'https://tally.so/r/nrYJEo'} target="_blank">
            Contact Us
          </a>
        </div>
        <Link to={'#'}>Instragram</Link>
      </div>

      <div className="flex flex-col web:flex-row gap-3 justify-between text-light-600 mt-4 mb-10">
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
