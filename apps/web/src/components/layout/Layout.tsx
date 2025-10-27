import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="fixed inset-x-0 top-16 bottom-0 md:left-52  transition-all duration-300 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
