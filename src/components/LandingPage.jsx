import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";
import Iridescence from "./Iridescence"; // Background Effect

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const whyChooseUsRef = useRef(null); // Reference for smooth scrolling

  // Scroll to "Why Choose Us" when clicking "Get Started"
  const handleGetStarted = () => {
    if (whyChooseUsRef.current) {
      whyChooseUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen Background */}
      <div className="h-screen w-screen absolute inset-0 z-0">
        <Iridescence />
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-900 px-6 h-full pt-20">
        <h1 className="text-5xl font-bold">Welcome to SportBuddy</h1>
        <p className="mt-4 text-lg">Find and join playdates for your favorite sports.</p>

        {!user && (
          <button 
            onClick={handleGetStarted} 
            className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
          >
            Get Started
          </button>
        )}
      </div>

      {/* Why Choose Us Section */}
      <section ref={whyChooseUsRef} className="container mx-auto py-16 px-6 bg-opacity-25 animate-fadeIn relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Find Local Playdates */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25 animate-slideInUp h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">Find Local Playdates</h3>
              <p>Discover and join playdates in your area easily.</p>
            </div>
            <Link to="/open-playdates">
              <button className="mt-4 w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all duration-300">
                Explore Playdates
              </button>
            </Link>
          </div>

          {/* Meet New People */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25 animate-slideInUp h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">Meet New People</h3>
              <p>Connect with players who share your passion for sports.</p>
            </div>
            <Link to="/users">
              <button className="mt-4 w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all duration-300">
                Connect with Players
              </button>
            </Link>
          </div>

          {/* Easy Scheduling */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25 animate-slideInUp h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">Easy Scheduling</h3>
              <p>Plan and organize games with just a few clicks.</p>
            </div>
            <Link to="/playdates">
              <button className="mt-4 w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all duration-300">
                Create Playdate
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!user ? (
        <section className="py-16 text-center bg-blue-600 text-gray-900 bg-opacity-25 animate-fadeIn">
          <h2 className="text-3xl font-bold">Join the Fun Today!</h2>
          <p className="mt-4 text-lg">Sign up now and start playing.</p>
          <Link to="/add-user">
            <button className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300">
              Sign Up Now
            </button>
          </Link>
        </section>
      ) : (
        <section className="py-16 text-center bg-blue-600 text-gray-900 bg-opacity-25 animate-fadeIn">
          <h2 className="text-3xl font-bold">
            You&lsquo;re Doing Great, {user.firstName}!
          </h2>
          <p className="mt-4 text-lg">
            Keep playing and challenge your friends to join the fun!
          </p>
          <div className="mt-6">
            <Link to="/playdates">
              <button className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300">
                Continue Playing
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;