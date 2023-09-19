import React from "react";
import navigate from "raviger";

export default function About() {
  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="mb-2">
        This is a Type Form clone built using React. It allows you to create
        forms and collect responses.
      </p>
      <p className="mb-4">Shortcuts:</p>
      <ul className="list-disc ml-8">
        <li className="mb-2">
          Press <code className="bg-gray-200 px-2 py-1 rounded">Ctrl + X</code>{" "}
          for Home
        </li>
        <li className="mb-2">
          Press <code className="bg-gray-200 px-2 py-1 rounded">Ctrl + Y</code>{" "}
          to navigate to About
        </li>
        <li>
          Press <code className="bg-gray-200 px-2 py-1 rounded">Ctrl + Z</code>{" "}
          to logout
        </li>
      </ul>
    </div>
  );
}
