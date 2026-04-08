import Footer from "@/customComponets/Footer/page";
import Navbar from "@/customComponets/Navbar/page";

export default function Leaders({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
