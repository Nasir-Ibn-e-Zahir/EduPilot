import React from "react";

export default function Demo() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center p-5 text-center">
    <h1 className="text-4xl font-bold font-mono text-gray-800 mb-6">
      How it Works!
    </h1>
    <video
      width="890"
      height="380"
      controls
      className="rounded-2xl shadow-lg"
    >
      <source src="/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
  
  );
}
