import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);
  return (
    <div
      className="flex flex-col ml-auto mr-auto w-full items-center overflow-hidden h-screen"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Navbar />
      <main className="w-[86%] md:w-[310px]">{children}</main>
    </div>
  );
}
