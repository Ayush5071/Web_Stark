"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

function HomePage() {
  const router = useRouter();
  const { auth, isVerified, logoutUser } = useAuthContext();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      router.push("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white">
      <Navbar onLogout={handleLogoutClick} />
      <div className="flex flex-col items-center justify-center h-screen space-y-10 px-6 md:px-12 lg:px-24 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
          Welcome to CampusX
        </h1>
        <p className="text-xl font-medium text-gray-300">
          A revolutionary platform for your college marketplace. Buy, sell, and discover what you need with ease.
        </p>
        <p className="text-lg text-gray-400">
          Join a community where students connect, trade, and thrive—whether it’s textbooks, gadgets, or anything in between.
        </p>
        <div className="space-x-4">
          {auth && isVerified ? (
            <>
              <button
                onClick={handleLogoutClick}
                className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
              <span className="text-gray-400">or</span>
              <Link href="/auth/register">
                <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar({ onLogout }) {
  const { auth } = useAuthContext();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800 py-4 px-8 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white hover:text-gray-200 transition duration-300">
          CampusX
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link href="/profile" className="text-white hover:text-gray-200">Profile</Link>
          <Link href="/auction" className="text-white hover:text-gray-200">Auction</Link>
          <Link href="/ad" className="text-white hover:text-gray-200">Ads</Link>
          <Link href="/chat" className="text-white hover:text-gray-200">Chat</Link>
          <Link href="/lnf" className="text-white hover:text-gray-200">Lost & Found</Link>
          <Link href="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
          <Link href="/store" className="text-white hover:text-gray-200">Store</Link>
          {auth ? (
            <button
              onClick={onLogout}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="text-white hover:text-gray-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HomePage;
