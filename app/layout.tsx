"use client";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "plyr-react/plyr.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
