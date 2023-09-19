import React, { useEffect } from "react";
import logo from "./logo.svg";
import { ActiveLink, navigate } from "raviger";
import { User } from "./types/types";

export default function Header(props: { currentUser: User }) {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case "x":
          navigate("/");
          break;
        case "y":
          navigate("/about");
          break;
        case "z":
          localStorage.removeItem("token");
          window.location.reload();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
          ...(props.currentUser?.username?.length > 0
            ? [
                {
                  page: "Logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "Login", url: "/login" }]),
        ].map((link, id) => (
          <div key={id}>
            {link.url ? (
              <ActiveLink
                href={link.url}
                className="text-gray-800 p-2 m-2 uppercase"
                key={link.url}
                exactActiveClass="text-indigo-400"
              >
                {link.page}
              </ActiveLink>
            ) : (
              <button
                key={link.page}
                onClick={link.onClick}
                className="text-gray-800 p-2 m-2 uppercase"
              >
                {link.page}
              </button>
            )}
          </div>
        ))}
      </div>

      <h1 className="text-center text-xl flex-1">Welcome to #Typeform</h1>
    </div>
  );
}
