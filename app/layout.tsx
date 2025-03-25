"use client";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "plyr-react/plyr.css";
import SideBar from "../components/SideBar";
import { Bell, Search, Mic, User } from "lucide-react";
import SearchInput from "../components/SearchComponent";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="flex h-screen bg-[#14171F] bg-[url('/bg-image.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-[url('/bg-image.jpg')] bg-cover bg-center opacity-50 w-[100vw] h-[100vh] pointer-events-none"></div>
            <SideBar />
            <div className="h-full flex-1 overflow-y-auto">
              <nav className="flex items-center justify-end px-[16px] py-[16px]">
                <div className="mr-[16px] flex items-center bg-[#2C2C3E] px-[16px] py-2 w-1/3 rounded-[4px] h-10">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <SearchInput />
                  <Mic className="text-gray-400 ml-3" size={20} />
                </div>

                <div className="flex items-center px-3 py-2 rounded-[4px] h-10">
                  <button className="mr-[16px] text-white p-2 bg-[#2C2C3E]">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                      <Bell size={20} />
                    </div>
                  </button>
                  <button className="text-white p-2 bg-[#2C2C3E]">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                      <User size={20} />
                    </div>
                  </button>
                </div>
              </nav>
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
