import { ReactNode } from 'react';

export interface Category {
  label: string;
  value: string;
  icon: ReactNode;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
}

export interface UserPreferences {
  theme: ThemeMode;
  language: string;
  region: string;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
} 