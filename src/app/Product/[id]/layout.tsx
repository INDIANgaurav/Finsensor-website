import type { Metadata } from "next";
import Footer from "@/customComponets/Footer/page";
import Navbar from "@/customComponets/Navbar/page";

export const metadata: Metadata = {
  title: "FinSoEasy360 - Financial Reporting Tool | Finsensor Limited",
  description:
    "Elevate your financial management with FinSoEasy360. Advanced, fully automated software for generating balance sheets, profit and loss statements, and financial reports.",
  keywords:
    "financial reporting, balance sheet, profit and loss, Excel export, automated reporting, FinSoEasy360",
  openGraph: {
    title: "FinSoEasy360 - Financial Reporting Tool",
    description:
      "Advanced financial reporting software for automated balance sheets and profit & loss statements",
    type: "website",
  },
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
