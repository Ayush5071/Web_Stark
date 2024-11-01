function Login() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/back.png')",
      }}
    >
      <div className="relative z-10 p-10 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-white/30 w-96 md:w-104 lg:w-112 max-w-lg">
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          Login
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg mb-4 bg-white/30 placeholder-black text-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg mb-6 bg-white/30 placeholder-black text-black focus:outline-none"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <hr className="border-t border-white w-1/4" />
          <span className="px-2 text-gray-800">or</span>
          <hr className="border-t border-white w-1/4" />
        </div>

        <button
          type="button"
          className="w-full p-3 mt-4 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-900 transition duration-300 flex items-center justify-center"
        >
          <img
            src="/google_icon.png"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-black">
          Don't have an account?{" "}
          <a href="/signup" className="text-pink-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
