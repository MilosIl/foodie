import { IconArrowDown } from "@/assets";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('./assets/hero-background.jpg')] bg-cover bg-no-repeat h-screen text-left">
      <header className="bg-black/40 p-2 rounded-lg text-white">
        <h1 className="mb-2 w-[22ch] font-extrabold text-3xl">
          Place where <span className="text-orange-400">recipes</span> meets
          with your taste
        </h1>
        <p>
          Find over{" "}
          <span className="font-bold text-orange-400 text-xl">
            200+ recipes
          </span>{" "}
        </p>
      </header>
      <p className="bottom-0 absolute bg-slate-50/40 p-1 font-medium text-base uppercase">
        scroll down to see more <IconArrowDown className="animate-bounce" />
      </p>
    </div>
  );
};

export { HeroSection };
