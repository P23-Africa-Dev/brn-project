const Loader = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* Animated spinner with different color */}
            {/* <div className="relative w-50 h-50  rounded-full border-[20px] border-solid border-gray-400/75 animate-spin">
        <img
          src={images.spinner}
          className="absolute -top-6 left-0 w-50 h-50 rounded-full"
          alt=""
        />
      </div> */}

            <div className="flex items-center justify-center">
                <div className="relative h-40 w-40">
                    {/* Track */}
                    <div className="absolute inset-0 rounded-full border-23 border-gray-400/70"></div>

                    {/* Rotating arc with rounded ends */}
                    <div className="absolute inset-0 animate-spin">
                        <div
                            className="h-full w-full rounded-full"
                            style={{
                                background: 'conic-gradient(#111827 0deg 90deg, transparent 90deg 360deg)',
                                maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 20px), black 0)',
                                WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 26px), black 0)',
                            }}
                        ></div>

                        {/* Rounded caps */}
                        {/* <div className="absolute top-1/2 left-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900"></div>
                                <div className="absolute top-1/2 -right-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900"></div> */}
                    </div>
                </div>
            </div>

            <h3 className="mt-8 mb-1 text-2xl lg:text-3xl xl:text-4xl font-bold text-primary dark:text-black">Preparing Your Dashboard</h3>
            <p className="mb-4 text-lg lg:text-2xl text-deepBlue">(This will take few seconds)</p>
            <p className="max-w-xs text-center text-sm text-deepBlue">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
        </div>
    );
};

export default Loader;
