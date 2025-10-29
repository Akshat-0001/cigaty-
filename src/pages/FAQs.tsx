import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is CIGATY?',
      answer: 'Cigaty is India’s first professional B2B marketplace built exclusively for the liquor industry. Our secure, data-driven platform enables verified buyers and sellers to trade efficiently, transparently, and safely — all in real time.',
    },
    {
      question: 'How do I register on CIGATY?',
      answer: 'Click the "Sign Up" button in the navigation menu and complete our three-step registration process: Account Details, Company Details, and Document Upload. Our team will review your application within 24-48 hours.',
    },
    {
      question: 'What documents do I need to register?',
      answer: 'You\'ll need business registration documents, tax identification, and any relevant licenses or certifications for trading alcoholic beverages in your region.',
    },
    {
      question: 'Is there a fee to use CIGATY?',
      answer: 'No, there is no fee to use CIGATY.',
    },
    {
      question: 'How does CIGATY handle compliance?',
      answer: 'Our platform includes automated compliance checking for region-specific regulations, licensing verification, and regulatory change alerts to ensure all transactions meet legal requirements.',
    },
    {
      question: 'How do I get support?',
      answer: 'Visit our Contact page or email support@cigaty.com for assistance.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')] bg-cover bg-center" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-light mb-6">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="text-xl text-gray-300">
              Find answers to common questions about CIGATY
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={index < 3 ? { opacity: 1, y: 0 } : undefined}
                whileInView={index >= 3 ? { opacity: 1, y: 0 } : undefined}
                viewport={index >= 3 ? { once: false, amount: 0.3 } : undefined}
                transition={{ delay: index < 3 ? index * 0.1 : index * 0.05, duration: 0.4 }}
                className="card cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-light pr-8">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gold flex-shrink-0" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 mt-4 pt-4 border-t border-dark-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;

