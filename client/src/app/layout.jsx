import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SocketContextProvider } from "@/context/SocketContext";
import { StoreContextProvider } from "@/context/storeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserProvider>
            <SocketContextProvider>
              <StoreContextProvider>   
                {children}
              </StoreContextProvider>
            </SocketContextProvider>
          </UserProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
