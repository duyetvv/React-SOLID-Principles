import React, { useEffect, useCallback } from "react";

import {
  DEFAULTS,
  MODAL_SIZE_CLASSES,
  CSS_CLASSES,
  ARIA_LABELS,
  KEYBOARD_KEYS,
} from "../../core/constants";
import { type ModalProps } from "../../core/types";

import "./Modal.scss";

// Example 3: Slot Pattern
// Closed for modification: The modal structure (overlay, header, body container) is fixed.
// Open for extension: The footer actions are not hardcoded; they are injected via props.
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  footer,
  children,
  onClose,
  size = DEFAULTS.MODAL_SIZE,
  closeOnBackdropClick = DEFAULTS.MODAL_CLOSE_ON_BACKDROP_CLICK,
  closeOnEsc = DEFAULTS.MODAL_CLOSE_ON_ESC,
}) => {
  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_KEYS.ESCAPE) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, closeOnEsc, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose],
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={CSS_CLASSES.MODAL_OVERLAY}
      onClick={handleBackdropClick}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div
        className={`${CSS_CLASSES.MODAL_CONTENT} ${MODAL_SIZE_CLASSES[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={CSS_CLASSES.MODAL_HEADER}>
          <h3 id="modal-title">{title}</h3>
          <button
            className={CSS_CLASSES.MODAL_CLOSE}
            onClick={onClose}
            aria-label={ARIA_LABELS.MODAL_CLOSE_BUTTON}
            type="button"
          >
            ×
          </button>
        </div>
        <div className={CSS_CLASSES.MODAL_BODY}>{children}</div>
        {footer && <div className={CSS_CLASSES.MODAL_FOOTER}>{footer}</div>}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
