import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, Clock, FileCheck, Wine } from 'lucide-react';
import Button from '../components/forms/Button';

const Confirmation = () => {
  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'We\'ve sent a verification email to your inbox. Please click the link to verify your account.',
    },
    {
      icon: Clock,
      title: 'Application Review',
      description: 'Our team will review your application and documents within 24-48 hours.',
    },
    {
      icon: FileCheck,
      title: 'Account Approval',
      description: 'Once approved, you\'ll receive an email with instructions to access your dashboard.',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark py-12 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Success confetti animation */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${50 + (Math.random() - 0.5) * 100}%`,
              top: '20%',
              backgroundColor: i % 2 === 0 ? '#D4AF37' : '#8B0000',
            }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: [0, 600],
              x: [(Math.random() - 0.5) * 400],
              opacity: [1, 0],
              scale: [1, 0.5],
              rotate: [0, 360 * (Math.random() - 0.5)],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: 'easeOut',
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="bg-gradient-wine p-3 rounded-lg"
          >
            <Wine className="w-10 h-10 text-gold" />
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-light">CIGATY</h2>
            <p className="text-xs text-gold">India’s First B2B Liquor Exchange</p>
          </div>
        </Link>

        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="card bg-dark-lighter/80 backdrop-blur-lg text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-wine flex items-center justify-center"
          >
            <CheckCircle2 className="w-14 h-14 text-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-light mb-4"
          >
            Application Received!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Thank you for choosing CIGATY! Your registration has been successfully submitted 
            and is now under review.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="inline-block bg-wine/20 border border-wine rounded-lg px-6 py-4"
          >
            <p className="text-light">
              <span className="font-semibold">Application ID:</span>{' '}
              <span className="text-gold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="card bg-dark-lighter/80 backdrop-blur-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-light mb-6 text-center">What Happens Next?</h2>
          
          <div className="space-y-6">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-dark/50 border border-dark-light hover:border-gold/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-wine flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-light mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="card bg-gradient-wine mb-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-light mb-3">Need Help?</h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about your application or need assistance, 
              our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary">
                  Contact Support
                </Button>
              </Link>
              <a href="mailto:support@cigaty.com">
                <Button variant="outline" className="border-light text-light hover:bg-light hover:text-wine">
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary" size="lg">
              Learn More About Us
            </Button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="text-center text-gray-400 mt-8"
        >
          Didn't receive the verification email?{' '}
          <button className="text-gold hover:text-gold-light font-semibold transition-colors">
            Resend Email
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Confirmation;

