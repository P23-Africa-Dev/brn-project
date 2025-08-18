import { Progress } from "./ui/progress"; // Adjust the import path as necessary

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
      <div className="relative w-24 h-24">
        <Progress value={null} className="absolute inset-0" />
        <svg
          className="animate-spin -ml-1 mr-3 h-16 w-16 text-gray-500 absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Preparing Your Dashboard</h2>
        <p className="text-sm text-gray-500">(This will take a few seconds)</p>
        <p className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
      </div>
    </div>
  );
};

export default LoadingState;