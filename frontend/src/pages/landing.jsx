import NavBar from "../components/NavBar";


const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <NavBar />

      <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 text-center">
        <section className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#e50914]">
            Mulyankanam
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Rate What Matters.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Discover stores, share your experience, and help others make
            better choices through trusted ratings and reviews.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              className="rounded-md bg-[#e50914] px-7 py-3 font-semibold
                         text-white transition hover:bg-[#b80710]"
            >
              Get Started
            </button>

            <button
              className="rounded-md border border-gray-600 px-7 py-3
                         font-semibold text-gray-200 transition
                         hover:border-white hover:text-white"
            >
              Login
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;