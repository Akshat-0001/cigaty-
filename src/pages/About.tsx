import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Globe2, TrendingUp } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize the global drinks trade by creating the most trusted, efficient, and innovative B2B marketplace that connects premium brands with distributors worldwide.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the world\'s leading platform for drinks commerce, setting new standards for transparency, accessibility, and excellence in the industry.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Integrity, innovation, excellence, and customer success drive everything we do. We believe in building lasting partnerships based on trust and mutual growth.',
    },
  ];

  const milestones = [
    { year: '2020', title: 'Foundation', description: 'Company milestone and key achievements' },
    { year: '2021', title: 'Global Expansion', description: 'Strategic growth and market development' },
    { year: '2022', title: 'Platform 2.0', description: 'Technology advancement and feature enhancement' },
    { year: '2023', title: 'Market Leader', description: 'Industry recognition and business growth' },
    { year: '2024', title: 'Innovation Hub', description: 'Continued innovation and platform evolution' },
  ];

  const team = [
    {
      role: 'CEO & Founder',
      initials: 'CF',
      bio: 'Visionary leader with expertise in liquor industry',
      gradient: 'from-wine to-red-700',
    },
    {
      role: 'CTO',
      initials: 'CT',
      bio: 'Technology expert driving platform innovation',
      gradient: 'from-gold to-yellow-600',
    },
    {
      role: 'Head of Operations',
      initials: 'HO',
      bio: 'Operations specialist ensuring seamless execution',
      gradient: 'from-wine to-red-700',
    },
    {
      role: 'Chief Business Officer',
      initials: 'CB',
      bio: 'Business strategist driving growth and expansion',
      gradient: 'from-gold to-yellow-600',
    },
  ];

  const achievements = [
    { icon: Users, number: '2,500+', label: 'Active Partners' },
    { icon: Globe2, number: '120+', label: 'Countries' },
    { icon: TrendingUp, number: '$2.5B+', label: 'Annual Volume' },
    { icon: Award, number: '15+', label: 'Industry Awards' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560424464-51a81c5c3d83?q=80&w=2070')] bg-cover bg-center" />
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
              About <span className="text-gradient-gold">CIGATY</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Redefining the future of global drinks commerce through innovation, 
              trust, and unparalleled service excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-light mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-400 text-lg">
                <p>
                  CIGATY was born from a simple observation: the global drinks industry needed 
                  a modern, transparent, and efficient platform to connect premium brands with 
                  distributors worldwide.
                </p>
                <p>
                  Founded in 2020 by industry veterans with decades of combined experience in 
                  luxury goods, technology, and global distribution, CIGATY set out to bridge 
                  the gap between traditional business practices and cutting-edge innovation.
                </p>
                <p>
                  Today, we're proud to serve over 2,500 partners across 120+ countries, 
                  facilitating billions in annual trade volume. Our platform combines the 
                  sophistication of enterprise software with the ease of consumer applications, 
                  making global trade accessible to businesses of all sizes.
                </p>
                <p>
                  But we're more than just a marketplace. We're a community of passionate 
                  professionals united by a love for exceptional drinks and a commitment to 
                  excellence in every transaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-luxury border-2 border-gold/20 bg-gradient-to-br from-dark-card to-dark-lighter">
                <div className="aspect-video flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-wine to-gold flex items-center justify-center shadow-2xl">
                      <Users className="w-16 h-16 text-white" strokeWidth={2} />
                    </div>
                    <p className="text-3xl font-bold text-light mb-2">Our Team</p>
                    <p className="text-gray-400 max-w-md mx-auto">Building the future of liquor commerce</p>
                    <div className="mt-6 inline-block px-4 py-2 bg-dark/50 border border-gold/30 rounded-lg">
                      <span className="text-gold text-sm font-semibold">Team Photo Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-wine rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const gradients = ['from-wine to-red-700', 'from-gold to-yellow-600', 'from-wine to-red-700'];
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  className="group relative perspective-1000"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index]} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
                  
                  <div className="relative glass-effect border-2 border-gold/20 rounded-2xl p-8 h-full hover:border-gold/50 transition-all duration-300 backdrop-blur-xl overflow-hidden text-center">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <Icon className="w-full h-full text-gold" strokeWidth={1} />
                    </div>

                    {/* Icon container */}
                    <motion.div 
                      className="relative mb-6 inline-block"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-2xl`}>
                        <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Pulsing ring */}
                      <motion.div 
                        className={`absolute inset-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
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
                      <h3 className="text-2xl md:text-3xl font-bold text-light mb-4 group-hover:text-gold transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {value.description}
                      </p>
                      
                      {/* Animated accent bar */}
                      <motion.div
                        className={`h-1.5 bg-gradient-to-r ${gradients[index]} rounded-full mt-6 mx-auto`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
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

      {/* Timeline */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Our <span className="text-gradient-gold">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Milestones that shaped our path to becoming the world's leading drinks marketplace
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative pl-8 pb-12 border-l-2 border-gold/30 last:pb-0"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-glow-gold" />
                <div className="bg-dark-lighter rounded-lg p-6 border border-dark-light hover:border-gold/50 transition-colors">
                  <div className="text-gold font-bold text-2xl mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-semibold text-light mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Meet Our <span className="text-gradient-gold">Leadership</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to revolutionizing global drinks commerce
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="card text-center group"
              >
                <div className="relative mb-4 w-32 h-32 mx-auto">
                  {/* Placeholder avatar with initials */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full h-full rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-2xl border-4 border-dark`}
                  >
                    <span className="text-white text-3xl font-bold">{member.initials}</span>
                  </motion.div>
                  {/* Pulsing ring effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <p className="text-gold font-bold mb-2 text-lg">{member.role}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-gradient-wine">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <Icon className="w-12 h-12 text-gold mx-auto mb-4" />
                  <div className="text-4xl font-bold text-light mb-2">{achievement.number}</div>
                  <div className="text-gray-300">{achievement.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

