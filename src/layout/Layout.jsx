import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col ml-auto mr-auto items-center overflow-hidden h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
