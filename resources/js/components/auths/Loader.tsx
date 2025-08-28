import images from "@/constants/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Animated spinner with different color */}
      <div className="relative w-20 h-20 rounded-full border-10 border-solid border-gray-400 animate-spin">
        <img
          src={images.spinner}
          className="absolute -top-2.5 left-0 w-full h-full rounded-full"
          alt=""
        />
      </div>
      <h3 className="text-2xl font-bold text-primary mt-8 mb-1">
        Preparing Your Dashboard
      </h3>
      <p className="text-gray-500  mb-4">(This will take few seconds)</p>
      <p className="text-primary text-sm text-center max-w-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </p>
    </div>
  );
};

export default Loader;
