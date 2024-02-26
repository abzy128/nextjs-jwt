import { Button } from "./button";
import Link from "next/link";
export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12 px-6 py-4 bg-slate-200">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        News.
      </h1>
      <h4 className="text-center md:text-left text-lg md:pl-8">
        <Link href="/admin">
          <Button className="mx-2 p-6" variant={"outline"}>Admin</Button>
        </Link>
        <Link href="/register">
          <Button className="mx-2 p-6" variant={"secondary"}>Register</Button>
        </Link>
        <Link href="/login">
          <Button className="mx-2 p-6">Login</Button>
        </Link>
      </h4>
    </section>
  );
}