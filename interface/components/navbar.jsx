import { auth, signIn } from "@/auth";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  const nav_menu = ["Challenges", "Diet", "Recipes"];
  return (
    <nav className="flex items-center justify-between min-w-[100svw] px-8 py-2 border-b-2">
      <h1 className="text-primary">
        <Link href={"/"}>Tracky</Link>
      </h1>

      {session && session?.user ? (
        <span className="flex gap-4 items-center">
          {nav_menu.map((menu, index) => (
            <Link
              key={index}
              href={`/${menu.toLowerCase()}`}
              className="btn  smooth-animation  px-3 py-1 rounded-md hover:bg-primary hover:text-white"
            >
              {menu}
            </Link>
          ))}
          <Link href="/profile">
            <Image
              src={session?.user?.image}
              width={40}
              height={40}
              alt={session.user?.name}
              className="size-10 rounded-full border-2 border-primary cursor-pointer btn smooth-animation"
            />
          </Link>
        </span>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button className="btn" type="submit">
            Get Started
          </Button>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
