import React, { useState, useEffect, useRef } from "react";
import "./GameArena.css";

export default function GameArena() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    triggerBtnRef.current?.focus();
  };

  // Lock body scroll when modal is open and restore when closed
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Esc key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="game-arena-root">
      {/* Floating Button fixed at BOTTOM-LEFT */}
      <button
        ref={triggerBtnRef}
        className="game-arena-btn"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-label="Open Game Arena"
      >
        <span>🎮</span> Game Arena
      </button>

      {/* Modal Popup with dynamic iframe loading */}
      {isOpen && (
        <div
          className="game-arena-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Game Arena - Signal Run"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="game-arena-modal">
            <div className="game-arena-header">
              <span className="game-arena-title">🎮 Signal Run — IEEE Mini Game</span>
              <button
                ref={closeBtnRef}
                className="game-arena-close"
                onClick={closeModal}
                aria-label="Close Game Arena"
              >
                &times;
              </button>
            </div>
            <div className="game-arena-iframe-wrapper">
              <iframe
                src="./games/signal-run.html"
                title="Signal Run Game"
                className="game-arena-iframe"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
