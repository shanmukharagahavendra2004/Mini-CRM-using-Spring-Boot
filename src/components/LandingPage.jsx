import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10 md:gap-60 p-4 text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold w-full md:w-1/2">
        Connect with Your Customers Easily
      </h1>
      <div className="flex flex-col gap-4 md:gap-5 text-lg w-full md:w-auto">
        <h1 className="border-2 border-black px-4 py-2 rounded bg-white">
          Don't have an account click Register
        </h1>
        <h1 className="border-2 border-black px-4 py-2 rounded bg-white">
          Already have an account click Login
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
