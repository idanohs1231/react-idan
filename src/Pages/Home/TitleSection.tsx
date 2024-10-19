import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Link } from "react-router-dom";
import videoFile from "../../Media/video.mp4"; // Import the video

const TitleSection = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <section className="relative flex items-center justify-center w-full min-h-[50vh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600 to-blue-500 dark:from-green-700 dark:to-teal-600 opacity-80 z-10"></div>

      {/* Content Section */}
      <div className="relative z-20 flex flex-col items-center text-white text-center p-10">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 animate-fade-in-down dark:text-green-300">
          What The Card
        </h1>
        <p className="text-2xl font-light mb-6 animate-fade-in-up">
          All the cards in one home
        </p>
        <div className="h-1 w-24 bg-white rounded-full mt-4 animate-grow"></div>

        {!user && (
          <div className="flex space-x-4 m-10">
            <Link to="/signin">
              <button
                className="relative border-4 border-white text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-white-300 bg-transparent"
              >
                Sign In
              </button>
            </Link>
            <button className="relative bg-white hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleSection;
