"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

function HomePage() {
  const router = useRouter();
  const { auth, isVerified } = useAuthContext();

  console.log("Auth Home:", auth);
  console.log("Is Verified Home:", isVerified);

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  if (!auth || !isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={handleLoginClick}
          className="p-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
    </div>
  );
}

export default HomePage;
