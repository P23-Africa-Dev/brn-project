import images from "@/constants/image";

const StepBottomContent = () => {
  return (
    <>
      <div>
        <div className="">
          <img
            src={images.stepFormsPattern}
            alt="Bottom Decoration"
            className="w-full object-cover"
          />
        </div>

        {/* Bottom Text */}
        <div className="text-left px-4 lg:px-0 w-[400px] mx-auto mt-10   ">
          <p className="text-sm mb-1 font-extralight pl-10 ">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-secondary font-bold italic dark:text-white hover:underline"
            >
              Sign In
            </a>
          </p>
          <p className="text-sm pl-10 ">
            <a
              href="/help"
              className="text-secondary dark:text-white font-bold italic hover:underline"
            >
              Need Help?
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default StepBottomContent;
