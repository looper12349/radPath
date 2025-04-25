import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
        RadPath Explorer
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Navigate through a radioactive labyrinth finding the safest path with minimal radiation exposure
      </p>
    </header>
  );
};

export default Header;