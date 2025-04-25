"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "@/components/navbar/Navbar";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </PersistGate>
    </Provider>
  );
}
