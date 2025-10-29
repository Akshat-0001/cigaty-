import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe2, Clock } from 'lucide-react';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Button from '../components/forms/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'director@cigaty.com',
      link: 'mailto:director@cigaty.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+971 4 123 4567',
      link: 'tel:+97141234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Burj Khalifa, Downtown Dubai, UAE',
      link: '#',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement actual form submission to Supabase or email service
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074')] bg-cover bg-center" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-light mb-6">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and 
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="card text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-wine flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-light mb-2">{info.title}</h3>
                  <p className="text-gray-400">{info.details}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <h2 className="text-3xl font-bold text-light mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-wine rounded-xl p-8 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-light mb-2">Thank You!</h3>
                    <p className="text-gray-300">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (234) 567-890"
                      />
                      <Input
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                      />
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="How can we help you?"
                      required
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      isLoading={isSubmitting}
                      fullWidth
                      className="group"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send Message
                          <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-light mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>Sunday - Thursday: 9:00 AM - 6:00 PM GST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM GST</p>
                    <p>Friday: Closed</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-light mb-4">Support</h3>
                  <p className="text-gray-400 mb-4">
                    For urgent matters or technical support, please email us at:
                  </p>
                  <a 
                    href="mailto:support@cigaty.com" 
                    className="text-gold hover:text-gold-light transition-colors inline-flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    support@cigaty.com
                  </a>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-light mb-4">Sales Inquiries</h3>
                  <p className="text-gray-400 mb-4">
                    Interested in partnering with us? Contact our sales team:
                  </p>
                  <a 
                    href="mailto:sales@cigaty.com" 
                    className="text-gold hover:text-gold-light transition-colors inline-flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    sales@cigaty.com
                  </a>
                </div>

                <div className="card bg-gradient-wine">
                  <h4 className="font-semibold text-light mb-2">Need Immediate Help?</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Check out our FAQ section for quick answers to common questions.
                  </p>
                  <a href="/faqs" className="text-gold hover:text-gold-light font-medium">
                    Visit FAQ →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Dubai Location */}
      <section className="py-16 bg-dark-lighter relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-wine rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Our <span className="text-gradient-gold">Headquarters</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Visit our office at the heart of Dubai's business district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Map container with decorative frame */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-wine via-gold to-wine rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
              
              {/* Map frame */}
              <div className="relative glass-effect border-2 border-gold/30 rounded-3xl p-2 overflow-hidden">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] relative">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1741941050224!2d55.27208407538802!3d25.197196977673804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1709123456789!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CIGATY Office Location - Dubai"
                    className="w-full h-full"
                  />
                  
                  {/* Custom overlay info card */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute top-6 left-6 glass-effect border border-gold/30 rounded-2xl p-6 max-w-xs backdrop-blur-xl shadow-2xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-wine to-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-light mb-1">CIGATY Office</h3>
                        <p className="text-sm text-gray-300 mb-2">Burj Khalifa Area</p>
                        <p className="text-xs text-gold font-semibold">
                          25.1972° N, 55.2744° E
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Location details below map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mt-8"
            >
              <div className="glass-effect border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/40 transition-all">
                <MapPin className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-light mb-2">Address</h4>
                <p className="text-gray-400 text-sm">
                  Burj Khalifa, Downtown Dubai<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              
              <div className="glass-effect border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/40 transition-all">
                <Globe2 className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-light mb-2">Coordinates</h4>
                <p className="text-gray-400 text-sm">
                  Latitude: 25.1972° N<br />
                  Longitude: 55.2744° E
                </p>
              </div>
              
              <div className="glass-effect border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/40 transition-all">
                <Clock className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-light mb-2">Working Hours</h4>
                <p className="text-gray-400 text-sm">
                  Sunday - Thursday<br />
                  9:00 AM - 6:00 PM GST
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

