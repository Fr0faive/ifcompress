"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="w-full bg-white flex justify-between items-center p-5 text-slate-800">
      <h1
        className={
          path === "/" ? "font-semibold text-blue-500" : "font-semibold"
        }
      >
        <Link href="/">IF-Compress</Link>
      </h1>
      <ul className="flex gap-4 items-center">
        <li
          className={
            path === "/image-compress"
              ? " text-blue-700 font-semibold underline underline-offset-[6px]"
              : "hover:text-blue-500"
          }
        >
          <Link href="/image-compress">Image Processing</Link>
        </li>
        <li
          className={
            path === "/audio-compress"
              ? " text-blue-700 font-semibold underline underline-offset-[6px]"
              : "hover:text-blue-500"
          }
        >
          <Link href="/audio-compress">Audio Processing</Link>
        </li>
        <li
          className={
            path === "/about"
              ? " text-blue-700 font-semibold underline underline-offset-[6px]"
              : "hover:text-blue-500"
          }
        >
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
