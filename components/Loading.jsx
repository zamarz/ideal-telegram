import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <div
        class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-pink2 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <h2 className="text-center  text-2xl  tracking-wide px-2">Loading...</h2>
    </div>
  );
};

export default Loading;
