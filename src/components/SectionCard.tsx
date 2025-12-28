"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";

const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });

type SectionCardProps = {
  title: string;
  video?: string;
};

export default function SectionCard({ title, video }: SectionCardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (title === "Loading") {
      setShowModal(true);
      return;
    }
    router.push(`/section/${encodeURIComponent(title)}`);
  };

  return (
    <>
      <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.08}>
        <div
          className="card"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
          {video && (
            <video
              className="card-video"
              src={video}
              muted
              loop
              playsInline
            />
          )}
          <h2>{title}</h2>
        </div>
      </Tilt>

      {showModal && (
        <Modal
          message="Skills yet to be learned completely"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
