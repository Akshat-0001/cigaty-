import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onAnimationStart'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-light font-medium mb-2">
            {label}
            {props.required && <span className="text-wine ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`input-field resize-none ${
            error ? 'border-wine focus:border-wine focus:ring-wine/20' : ''
          } ${className}`}
          rows={4}
          {...props}
        />
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-wine text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="text-gray-400 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

