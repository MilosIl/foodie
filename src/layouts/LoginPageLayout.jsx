import { Outlet } from "react-router";
import { Footer, Navbar } from "@/components";

const LoginPageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-slate-100 mx-auto px-4 py-8 container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { LoginPageLayout };
