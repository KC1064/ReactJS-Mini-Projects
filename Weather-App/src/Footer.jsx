import React from "react";

const Footer = ({ isDarkMode }) => {
  return (
    <div className={`text-xl flex gap-[200px] h-min justify-center items-center pr-3 pl-3 ${
      isDarkMode ? "text-white" : "text-black"
    }`}>
      <p>Made By Kiron</p>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mr-4">
        <img
          src={isDarkMode ? "./src/assets/github-light.svg" : "./src/assets/github.svg"}
          className="h-[28px] w-[28px]"
          alt="GitHub"
        />
      </a>
    </div>
  );
};

export default Footer;
