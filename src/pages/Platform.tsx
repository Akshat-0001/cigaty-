import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Package,
  TrendingUp,
  Shield,
  Megaphone,
  Bell,
  Globe,
  BarChart3,
  Lock,
  Zap,
  Users,
  FileCheck,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/forms/Button';

const Platform = () => {
  const mainFeatures = [
    {
      icon: Package,
      title: 'Full Product Management',
      description: 'Comprehensive catalog management system with unlimited product listings, detailed specifications, and multi-currency pricing.',
      color: 'from-wine to-red-700',
      features: [
        'Unlimited product listings',
        'Rich media support (images, videos, documents)',
        'Multi-language descriptions',
        'Automated inventory tracking',
        'Bulk import/export capabilities',
        'Product variants and SKU management',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Price Comparison & Analytics',
      description: 'Real-time market intelligence and competitive pricing analysis to make informed decisions.',
      color: 'from-gold to-yellow-600',
      features: [
        'Real-time market data',
        'Competitive pricing insights',
        'Historical price trends',
        'Demand forecasting',
        'Custom analytics dashboards',
        'Export reports in multiple formats',
      ],
    },
    {
      icon: Shield,
      title: 'Market Restrictions & Compliance',
      description: 'Automated compliance checking and region-specific regulations management to ensure legal trading.',
      color: 'from-wine to-red-700',
      features: [
        'Country-specific regulation database',
        'Automated compliance checking',
        'Import/export documentation',
        'Licensing verification',
        'Tax calculation automation',
        'Regulatory change alerts',
      ],
    },
    {
      icon: Megaphone,
      title: 'Brand Activation Tools',
      description: 'Powerful marketing suite to amplify your brand presence and reach target markets effectively.',
      color: 'from-gold to-yellow-600',
      features: [
        'Featured product promotions',
        'Targeted email campaigns',
        'Banner advertising',
        'Brand storytelling pages',
        'Event promotion tools',
        'Social media integration',
      ],
    },
    {
      icon: Bell,
      title: 'Alerts & Notifications',
      description: 'Stay informed with instant updates on all critical business activities and opportunities.',
      color: 'from-wine to-red-700',
      features: [
        'Real-time order notifications',
        'Price change alerts',
        'New opportunity matches',
        'Inventory threshold warnings',
        'Custom notification preferences',
        'Multi-channel delivery (email, SMS, push)',
      ],
    },
    {
      icon: Globe,
      title: 'Global Web Responsiveness',
      description: 'Seamless experience across all devices with optimized performance for mobile, tablet, and desktop.',
      color: 'from-gold to-yellow-600',
      features: [
        'Mobile-first design',
        'Progressive web app (PWA)',
        'Offline functionality',
        'Fast page loading',
        'Touch-optimized interface',
        'Cross-browser compatibility',
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: 'Secure Transactions',
      description: 'Bank-level encryption and secure payment processing',
    },
    {
      icon: BarChart3,
      title: 'Advanced Reporting',
      description: 'Comprehensive business intelligence and analytics',
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Connect with your existing systems seamlessly',
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Multi-user accounts with role-based permissions',
    },
    {
      icon: FileCheck,
      title: 'Document Management',
      description: 'Centralized storage for all business documents',
    },
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Dedicated support team ready to assist you',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070')] bg-cover bg-center" />
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
              The Most <span className="text-gradient-gold">Powerful</span>
              <br />Platform for Drinks Trade
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Everything you need to manage, grow, and scale your global drinks business 
              – all in one comprehensive platform.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="group">
                Register Now To Get Access To Our Platform
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Core <span className="text-gradient-gold">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Designed specifically for the global drinks industry
            </p>
          </motion.div>

          <div className="space-y-24">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-wine flex items-center justify-center mr-4">
                        <Icon className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-3xl font-bold text-light">{feature.title}</h3>
                    </div>
                    <p className="text-xl text-gray-400 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-gold mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="rounded-2xl overflow-hidden shadow-luxury border border-gold/20 bg-gradient-to-br from-dark-card to-dark-lighter">
                      <div className="aspect-video flex items-center justify-center p-12">
                        <div className="text-center">
                          <div className={`w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-2xl`}>
                            <Icon className="w-16 h-16 text-white" strokeWidth={2} />
                          </div>
                          <p className="text-2xl font-bold text-light mb-2">{feature.title}</p>
                          <p className="text-gray-400 max-w-md mx-auto">Feature Preview</p>
                          <div className="mt-6 inline-block px-4 py-2 bg-dark/50 border border-gold/30 rounded-lg">
                            <span className="text-gold text-sm font-semibold">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-wine rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              And Much <span className="text-gradient-gold">More</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Additional features to streamline your operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const gradients = [
                'from-wine to-red-700',
                'from-gold to-yellow-600',
                'from-wine to-red-700',
                'from-gold to-yellow-600',
                'from-wine to-red-700',
                'from-gold to-yellow-600',
              ];
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  className="group relative perspective-1000"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index]} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
                  
                  <div className="relative glass-effect border-2 border-gold/20 rounded-2xl p-8 h-full hover:border-gold/50 transition-all duration-300 backdrop-blur-xl overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <Icon className="w-full h-full text-gold" strokeWidth={1} />
                    </div>

                    {/* Icon container */}
                    <motion.div 
                      className="relative mb-6"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-2xl`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Pulsing ring */}
                      <motion.div 
                        className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-light mb-3 group-hover:text-gold transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                      
                      {/* Animated accent bar */}
                      <motion.div
                        className={`h-1.5 bg-gradient-to-r ${gradients[index]} rounded-full mt-6`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      />
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden rounded-bl-2xl">
                      <motion.div
                        className={`absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-wine">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful brands and distributors using CIGATY
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="group">
                  Register Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-light text-light hover:bg-light hover:text-wine">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Platform;

