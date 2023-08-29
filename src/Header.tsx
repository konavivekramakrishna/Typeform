import React from "react";
import logo from "./logo.svg";
import { ActiveLink } from "raviger";

export default function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />

      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <ActiveLink
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase"
            key={link.url}
            exactActiveClass="text-blue-800"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>

      <h1 className="text-center text-xl flex-1">{props.title}</h1>
    </div>
  );
}
