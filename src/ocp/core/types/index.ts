export type ModalSize = 'small' | 'medium' | 'large';

/**
 * ButtonVariantStyle defines how a button variant should be styled
 * This allows consumers to define their own variants without modifying the component
 */
export interface ButtonVariantStyle {
  backgroundColor: string;
  color: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
}

/**
 * ButtonTheme defines the complete styling configuration for a button
 * Can include multiple variant styles that are applied dynamically
 */
export interface ButtonTheme {
  [variantName: string]: ButtonVariantStyle;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: string;
  theme?: ButtonTheme;
  isLoading?: boolean;
}

export interface ListProps<T extends Record<string, any>> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  title: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
