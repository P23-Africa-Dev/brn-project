import images from "@/constants/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Animated spinner with different color */}
      <div className="relative w-50 h-50  rounded-full border-[20px] border-solid border-gray-400/75 animate-spin">
        <img
          src={images.spinner}
          className="absolute -top-6 left-0 w-50 h-50 rounded-full"
          alt=""
        />
      </div>
      <h3 className="text-2xl font-bold text-primary dark:text-black mt-8 mb-1">
        Preparing Your Dashboard
      </h3>
      <p className="text-gray-500 dark:text-black  mb-4">(This will take few seconds)</p>
      <p className="text-primary text-sm dark:text-black/40 text-center max-w-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </p>
    </div>
  );
};

export default Loader;
