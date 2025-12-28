"use client";

import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import ParticlesBg from "@/components/ParticlesBg";

export default function Home() {
  return (
    <>
      <ParticlesBg />
      <Header />

      <main className="home">
        <SectionCard title="Data Science" video="/ds.mp4" />
        <SectionCard title="Web Development" video="/web.mp4" />
        <SectionCard title="Full Stack Development" video="/fullstack.mp4" />
        <SectionCard title="Loading" />
      </main>
    </>
  );
}
