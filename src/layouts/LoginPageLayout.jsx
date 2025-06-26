import { Outlet } from "react-router";
import { Footer } from "@/components";

const LoginPageLayout = () => {
  return (
    <>
      <main className="flex justify-center items-center bg-slate-100 mx-auto h-screen container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { LoginPageLayout };
