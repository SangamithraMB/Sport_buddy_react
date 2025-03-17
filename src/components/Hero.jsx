const Hero = () => {
    return (
      <div className="relative h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full [&>div]:absolute [&>div]:bottom-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-b [&>div]:from-blue-200 [&>div]:to-white">
            <div></div>
          </div>
        </div>
  
        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
              Find Your <span className="text-sky-900">Sport Buddy</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
              Connect with like-minded sports enthusiasts, join local activities, and stay active together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="rounded-lg px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800">
                Get Started
              </button>
              <button className="rounded-lg border px-6 py-3 font-medium border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;