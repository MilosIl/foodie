import { Outlet } from "react-router";
import { Navbar, Footer } from "@/components";
const RegisterPageLayout = () => {
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

export { RegisterPageLayout };
