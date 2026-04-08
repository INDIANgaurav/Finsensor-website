import Footer from "@/customComponets/Footer/page"
import { NavigationBar } from "@/customComponets/Navbar/Navigation-bar"
import Navbar from "@/customComponets/Navbar/page"

export default function Aboutus({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <div className="overflow-hidden">
                {children}
            </div>
            <Footer />
        </>
    )
}