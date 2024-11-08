import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SocketContextProvider } from "@/context/SocketContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserProvider>
            <SocketContextProvider>
          {children}
            </SocketContextProvider>
          </UserProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
