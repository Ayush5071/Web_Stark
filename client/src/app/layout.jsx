"use client"
import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SocketContextProvider } from "@/context/SocketContext";
import { StoreContextProvider } from "@/context/storeContext";
import { AuctionProvider } from "@/context/AuctionContext";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
    script.async = true;
    document.body.appendChild(script);

    window.loadGoogleTranslate = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserProvider>
            <SocketContextProvider>
              <StoreContextProvider> 
                <AuctionProvider>  
                  {children}
                </AuctionProvider>
              </StoreContextProvider>
            </SocketContextProvider>
          </UserProvider>
        </AuthContextProvider>


        
        <div className="text-sm text-center  text-black rounded-lg bg-gray-200 border p-2 shadow-lg">
          <div id="google_translate_element" className="inline mb-12">Change Language</div>
        </div>
      </body>
    </html>
  );
}
