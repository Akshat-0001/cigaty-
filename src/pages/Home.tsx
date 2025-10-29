import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  Package, 
  TrendingUp, 
  Shield, 
  Megaphone, 
  Bell, 
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import Button from '../components/forms/Button';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Home = () => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: Package,
      title: 'Full Product Management',
      description: 'Comprehensive catalog management with detailed product specifications, pricing, and inventory tracking.',
      color: 'from-wine to-red-700',
    },
    {
      icon: TrendingUp,
      title: 'Price Comparison',
      description: 'Real-time market insights and competitive pricing analysis across global markets.',
      color: 'from-gold to-yellow-500',
    },
    {
      icon: Shield,
      title: 'Market Restrictions',
      description: 'Automated compliance checking and region-specific trading regulations management.',
      color: 'from-wine to-red-700',
    },
    {
      icon: Megaphone,
      title: 'Brand Activation',
      description: 'Powerful marketing tools to amplify your brand presence in target markets.',
      color: 'from-gold to-yellow-500',
    },
    {
      icon: Bell,
      title: 'Alerts & Notifications',
      description: 'Stay informed with instant updates on orders, market changes, and opportunities.',
      color: 'from-wine to-red-700',
    },
    {
      icon: Globe,
      title: 'Web Responsiveness',
      description: 'Seamless experience across all devices - desktop, tablet, and mobile.',
      color: 'from-gold to-yellow-500',
    },
  ];

  const stats = [
    { label: 'Verified Liquor Partners', value: '5,000+', suffix: '' },
    { label: 'Global & Indian Brands', value: '600+', suffix: '' },
    { label: 'Export Regions', value: '10+', suffix: '' },
    { label: 'in Annual Liquor Trade', value: '₹100 Cr+', suffix: '' },
  ];

  const benefits = [
    'Direct brand-to-distributor connections',
    'Transparent pricing and negotiations',
    'Secure payment processing',
    'Global logistics support',
    'Compliance and regulatory assistance',
    '24/7 dedicated support',
  ];

  // Intersection observers for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Enhanced Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Layers */}
        <motion.div 
          className="absolute inset-0 bg-dark-bg"
          style={{ y }}
        >
          {/* Gradient overlay with animation */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.98) 0%, rgba(139, 0, 0, 0.4) 100%)',
            }}
          />
          
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070')] bg-cover bg-center"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0]),
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]),
            }}
          />

          {/* Elegant bottle silhouette - subtle presence */}
          <motion.div
            className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden xl:block opacity-10 pointer-events-none"
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [0, 150]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [0.1, 0]),
            }}
          >
            <motion.img
              src="/assets/bottle.png"
              alt="Background"
              className="w-96 h-auto object-contain filter blur-sm"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Elegant floating particles - reduced and subtle */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-gold/20 to-wine/10"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80 - Math.random() * 40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-4 pt-32 pb-20"
          style={{ opacity }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center glass-effect rounded-full px-6 py-3 mb-8 border border-gold/30"
              >
                <Sparkles className="w-5 h-5 text-gold mr-2 animate-pulse" />
                <span className="text-gold font-semibold text-sm tracking-wide">
                  WELCOME TO THE FUTURE OF B2B DRINKS TRADING
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-bold text-light mb-8 leading-tight"
              >
                India’s First{' '}
                <span className="text-gradient-gold inline-block">
                  B2B Liquor Exchange
                </span>
                <br />
                Platform
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Connect premium spirits and wine brands with distributors worldwide. 
                Your trusted B2B platform for seamless global trade.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              >
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="secondary" className="group text-lg px-10 py-5 hover:shadow-2xl hover:shadow-gold/50 transition-all">
                      Get Started Today
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={22} />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/platform">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="secondary" className="text-lg px-10 py-5 hover:shadow-2xl hover:shadow-gold/50 transition-all">
                      Explore Platform
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-effect rounded-xl p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gold text-sm font-medium tracking-wider">SCROLL</span>
            <div className="w-6 h-10 border-2 border-gold/60 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-2 h-2 bg-gold rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <ChevronDown className="w-5 h-5 text-gold/60" />
          </div>
        </motion.div>
      </section>

      {/* Interactive Features Showcase - No Cards */}
      <section ref={featuresRef} className="py-32 bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-wine rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-4">
              <span className="text-wine font-semibold text-sm tracking-widest uppercase">
                Our Platform
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-light mb-6">
              Powerful <span className="text-gradient-gold">Features</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to manage and grow your drinks business globally
            </motion.p>
          </motion.div>

          {/* Interactive Feature Showcase */}
          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[650px]">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = currentSlide === index;
                
                return (
                  <motion.div
                    key={feature.title}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : 100,
                      scale: isActive ? 1 : 0.95,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className={`${isActive ? 'relative' : 'absolute inset-0'}`}
                  >
                    <div className="glass-effect border-2 border-gold/20 rounded-3xl p-8 md:p-12 lg:p-16 h-full backdrop-blur-xl overflow-hidden relative">
                      {/* Large decorative background icon */}
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none">
                        <Icon className="w-[500px] h-[500px] text-gold" strokeWidth={0.5} />
                      </div>

                      {/* Animated gradient blob */}
                      <motion.div
                        className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-10`}
                        animate={{
                          scale: isActive ? [1, 1.2, 1] : 1,
                          x: [0, 50, 0],
                          y: [0, 30, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      <div className="relative z-10">
                        {/* Number badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isActive ? { scale: 1, rotate: 0 } : {}}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-8 shadow-2xl`}
                        >
                          <span className="text-white text-2xl font-bold">{index + 1}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={isActive ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.3 }}
                          className="text-4xl lg:text-6xl font-bold text-light mb-6 leading-tight"
                        >
                          {feature.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={isActive ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.4 }}
                          className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl"
                        >
                          {feature.description}
                        </motion.p>

                        {/* Feature highlights - visual elements */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={isActive ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.5 }}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl"
                        >
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isActive ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.6 + i * 0.1 }}
                              whileHover={{ y: -8, scale: 1.05 }}
                              className="relative group"
                            >
                              <div className={`aspect-square rounded-2xl bg-gradient-to-br ${feature.color} p-0.5`}>
                                <div className="w-full h-full bg-dark-card rounded-2xl flex items-center justify-center group-hover:bg-dark-bg/50 transition-colors">
                                  <Icon className="w-10 md:w-12 h-10 md:h-12 text-gold" strokeWidth={2} />
                                </div>
                              </div>
                              {/* Glow effect */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10`} />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Accent line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isActive ? { width: "200px" } : { width: 0 }}
                          transition={{ delay: 0.9, duration: 0.8 }}
                          className={`h-2 bg-gradient-to-r ${feature.color} rounded-full mt-12`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Navigation arrows - side positioned */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-0 md:-left-20 md:-right-20 pointer-events-none">
                <motion.button
                  onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 0))}
                  disabled={currentSlide === 0}
                  whileHover={{ scale: 1.15, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-wine to-gold flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl hover:shadow-gold/50 transition-all pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
                </motion.button>
                <motion.button
                  onClick={() => setCurrentSlide(Math.min(currentSlide + 1, features.length - 1))}
                  disabled={currentSlide === features.length - 1}
                  whileHover={{ scale: 1.15, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-wine to-gold flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl hover:shadow-gold/50 transition-all pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
                </motion.button>
              </div>

              {/* Progress indicator dots - bottom center */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {features.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.3 }}
                    className="relative group"
                  >
                    <div className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'w-12 bg-gradient-to-r from-wine to-gold' 
                        : 'w-2 bg-gray-600 group-hover:bg-gray-400'
                    }`} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-32 bg-dark-bg relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-wine font-semibold text-sm tracking-widest uppercase mb-4 block">
                Why Choose CIGATY
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-light mb-6 leading-tight">
                Your Partner in
                <br />
                <span className="text-gradient-gold">Global Success</span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                We're revolutionizing the global drinks trade with cutting-edge technology 
                and unparalleled service. Join thousands of successful brands and distributors.
              </p>

              <div className="space-y-5">
                {benefits.map((benefit, index) => {
                  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
                  return (
                    <motion.div
                      key={benefit}
                      ref={ref}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-4 p-4 rounded-xl glass-effect border border-transparent hover:border-gold/30 transition-all duration-300 cursor-pointer group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1 group-hover:text-yellow-400" />
                      </motion.div>
                      <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* 3D Card Stack Effect */}
              <div className="relative perspective-1000">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="glass-effect border border-gold/20 rounded-2xl p-8 absolute inset-0"
                    style={{
                      transform: `translateY(${i * 20}px) translateX(${i * 20}px) rotateY(${i * 5}deg)`,
                      zIndex: 3 - i,
                    }}
                    animate={{
                      y: [i * 20, i * 20 + 10, i * 20],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="h-full bg-gradient-to-br from-wine/10 to-gold/5 rounded-xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-wine/20 to-gold/10" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-light mb-8 leading-tight">
              Ready to Transform Your
              <br />
              <span className="text-gradient-gold">Drinks Business?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Join the global marketplace that's changing the way premium drinks are traded worldwide.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-xl px-16 py-6 hover:shadow-2xl hover:shadow-gold/50 transition-all">
                  Start Your Journey Now
                  <ArrowRight className="ml-3" size={24} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

