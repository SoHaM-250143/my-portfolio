"use client";

type ModalProps = {
  message: string;
  onClose: () => void;
};

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{message}</p>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
