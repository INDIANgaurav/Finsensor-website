"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; description: string; href: string }[] = [
  {
    title: "FinSoEasy360",
    description:
      "A powerful tool for seamless financial reconciliation and reporting. Automate variance detection, resolve discrepancies, and generate Schedule III-compliant statements with real-time insights and user-friendly dashboards.",
    href: "finsoeasy360",
  },
  {
    title: "LAMsoEasy360",
    description: "From calculation to recognition, our solution covers the entire lease lifecycle, ensuring compliance with Ind AS 116 accounting standards.",
    href: "lease-tool",
  },
  {
    title: "RPTsoEasy360",
    description: "Stay compliant by checking the status of vendors and debtors, ensuring they are not strike-off from the Registrar of Companies (ROC)",
    href: "rpt",
  },
  {
    title: "FamSoEasy360",
    description: "Effortlessly manage and verify physical assets, ensuring compliance with Schedule III of the Indian Companies Act 2013. Streamline your Fixed Assets Schedule with accurate tracking and reporting, ensuring alignment with regulatory requirements.",
    href: "famso-easy-360",
  },
  {
    title: "ReconSoEasy360",
    description: "Identify and resolve discrepancies with detailed reasons for mismatches, ensuring your financial records reflect the true financial position Stay on top of your financial reconciliation with instant, automated reports",
    href: "reconso-easy-360",
  },
];

export function NavigationBar() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user?.role === "admin") setIsAdmin(true); })
      .catch(() => {});
  }, []);

  const handleClick = () => {
    const secondElement = document.getElementById("leaders_pagejs");
    if (secondElement) {
      window.scrollTo({ top: secondElement.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex md:space-x-4">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "")}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="z-50 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components?.map((component) => (
                <ListItem key={component?.title} title={component?.title} href={`/Product/${component?.href}`}>
                  {component?.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/leaders" legacyBehavior passHref>
            <NavigationMenuLink onClick={handleClick} className={cn(navigationMenuTriggerStyle(), "")}>Leaders</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <Link href="/about-us" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "")}>About us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact-us" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "")}>Contact us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {!isAdmin && (
          <NavigationMenuItem>
            <Link href="/finsensor-connect" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "")}>FinSensorConnect</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
       
      </NavigationMenuList>
    </NavigationMenu>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <Link href={href || "#"}>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
