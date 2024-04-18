import React from 'react';

const MarginWidthWrapper = ({ children }) => {
  return (
    <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen">
      <div className="pt-[64px]">{children}</div>
    </div>
  );
};

export default MarginWidthWrapper;
