import Navbar from "@/customComponets/Navbar/page";
import Footer from "@/customComponets/Footer/page";

export default function FinSensorConnectLayout({
  children,
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
