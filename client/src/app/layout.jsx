import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserProvider>
          {children}
          </UserProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
