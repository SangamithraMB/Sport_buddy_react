import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-purple-100 text-yellow-900 bg-[url(/assets/prefer_1.jpg)] bg-blend-overlay">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 text-center bg-opacity-25">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold">Welcome to SportBuddy</h1>
          <p className="mt-4 text-lg">Find and join playdates for your favorite sports.</p>
          {/* Linking the Get Started button to the Sign Up page */}
          <Link to="/add-user">
            <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 bg-opacity-25">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Find Local Playdates */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25">
            <h3 className="text-xl font-semibold mb-3">Find Local Playdates</h3>
            <p>Discover and join playdates in your area easily.</p>
            {/* Linking to the Open Playdates page */}
            <Link to="/open-playdates">
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ">
                Explore Playdates
              </button>
            </Link>
          </div>
          {/* Meet New People */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25">
            <h3 className="text-xl font-semibold mb-3">Meet New People</h3>
            <p>Connect with players who share your passion for sports.</p>
            {/* Link to a page where users can connect or a community page */}
            <Link to="/users">
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ">
                Connect with Players
              </button>
            </Link>
          </div>
          {/* Easy Scheduling */}
          <div className="p-6 bg-blue-600 shadow-lg rounded-lg text-center bg-opacity-25">
            <h3 className="text-xl font-semibold mb-3">Easy Scheduling</h3>
            <p>Plan and organize games with just a few clicks.</p>
            {/* Linking to the Create Playdates page */}
            <Link to="/playdates">
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Playdate
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-16 bg-opacity-25">
        <h2 className="text-3xl font-semibold text-center mb-12">What Players Say</h2>
        <div className="container mx-auto px-6 md:flex md:justify-center">
          <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center mx-4 mb-6 bg-opacity-75">
            <p className="italic">&ldquo;SportBuddy has helped me find amazing teammates for soccer games!&ldquo;</p>
            <h4 className="mt-4 font-semibold">- Alex Johnson</h4>
          </div>
          <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center mx-4 mb-6 bg-opacity-75">
            <p className="italic">&ldquo;Love how easy it is to organize basketball matches!&ldquo;</p>
            <h4 className="mt-4 font-semibold">- Emily Brown</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-blue-600 text-white bg-opacity-25">
        <h2 className="text-3xl font-bold">Join the Fun Today!</h2>
        <p className="mt-4 text-lg">Sign up now and start playing.</p>
        {/* Linking the Sign Up button to the Sign Up page */}
        <Link to="/add-user">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Sign Up Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;