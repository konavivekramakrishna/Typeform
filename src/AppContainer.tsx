import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,happy,health')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex h-screen bg-gray-100 items-center"
    >
      {props.children}
    </div>
  );
}
