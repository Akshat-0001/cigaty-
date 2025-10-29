/**
 * Premium Toast Notification System
 */

import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1a1a',
          color: '#F5F5F5',
          border: '1px solid #2a2a2a',
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1)',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.9375rem',
          fontWeight: 500,
        },
        success: {
          duration: 3000,
          style: {
            border: '1px solid rgba(34, 197, 94, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.2)',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#1a1a1a',
          },
        },
        error: {
          duration: 5000,
          style: {
            border: '1px solid rgba(139, 0, 0, 0.5)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 0, 0, 0.3)',
          },
          iconTheme: {
            primary: '#8B0000',
            secondary: '#F5F5F5',
          },
        },
        loading: {
          style: {
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.2)',
          },
          iconTheme: {
            primary: '#D4AF37',
            secondary: '#1a1a1a',
          },
        },
      }}
    />
  );
};

export default Toast;


