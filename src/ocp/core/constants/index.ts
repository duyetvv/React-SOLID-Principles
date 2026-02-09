import { type ModalSize } from '../types';

/**
 * Modal size class mappings
 * Maps size values to their corresponding CSS class names
 */
export const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  small: 'modal--small',
  medium: 'modal--medium',
  large: 'modal--large',
};

/**
 * Default values for components
 */
export const DEFAULTS = {
  BUTTON_VARIANT: 'primary' as const,
  BUTTON_IS_LOADING: false,
  MODAL_SIZE: 'medium' as const,
  MODAL_CLOSE_ON_BACKDROP_CLICK: true,
  MODAL_CLOSE_ON_ESC: true,
  LIST_EMPTY_MESSAGE: 'No items available',
  LIST_CLASS_NAME: '',
};

/**
 * CSS class names used throughout the OCP module
 */
export const CSS_CLASSES = {
  // Button
  BTN: 'btn',
  BTN_PRIMARY: 'btn--primary',
  BTN_SECONDARY: 'btn--secondary',
  BTN_DANGER: 'btn--danger',

  // List
  LIST: 'list',
  LIST_EMPTY: 'list--empty',
  LIST_ITEM: 'list-item',

  // Modal
  MODAL_OVERLAY: 'modal-overlay',
  MODAL_CONTENT: 'modal-content',
  MODAL_HEADER: 'modal-header',
  MODAL_BODY: 'modal-body',
  MODAL_FOOTER: 'modal-footer',
  MODAL_CLOSE: 'modal-close',

  // Flex utilities
  FLEX_CONTAINER: 'flex-container',
  FLEX_CONTAINER_SPACED: 'flex-container--spaced',
  FLEX_CONTAINER_CENTERED: 'flex-container--centered',
  FLEX_CONTAINER_END: 'flex-container--end',
};

/**
 * ARIA labels and messages
 */
export const ARIA_LABELS = {
  MODAL_CLOSE_BUTTON: 'Close modal',
};

/**
 * Keyboard event keys
 */
export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
};
