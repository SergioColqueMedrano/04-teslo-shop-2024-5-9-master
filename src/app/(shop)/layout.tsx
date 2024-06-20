'use client'
import { Footer, Sidebar, TopMenu } from "@/components";
import store from "@/components/world/store";
import { Provider } from "react-redux";

export default function ShopLayout({children}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <Provider store={store}>
        <div className="px-0 sm:px-10">
        { children }
      </div>
      </Provider>
      
      <Footer />
    </main>
  );
}