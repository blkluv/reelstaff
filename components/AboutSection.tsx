import { Users, Factory, Globe, Award, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AboutSection() {
  const stats = [
    {
      icon: Clock,
      number: '25+',
      label: 'Years of Experience',
      description: 'Serving the electrical industry with expertise'
    },
    {
      icon: Factory,
      number: '500+',
      label: 'Products',
      description: 'Comprehensive range of electrical cables'
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      description: 'Global reach with local expertise'
    },
    {
      icon: Users,
      number: '10,000+',
      label: 'Satisfied Customers',
      description: 'Trusted by professionals worldwide'
    }
  ]

  return (
    <section className="section-padding bg-secondary-900">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Leading the Way in 
                <span className="text-primary-400 block">Electrical Excellence</span>
              </h2>
              <p className="text-lg text-secondary-300 leading-relaxed">
                For over two decades, Nafees Cables has been at the forefront of 
                electrical cable manufacturing, delivering innovative solutions that 
                power homes, businesses, and industries across the globe.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Quality Manufacturing
                  </h3>
                  <p className="text-secondary-300">
                    State-of-the-art facilities with rigorous quality control ensure 
                    every product meets the highest standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Globe className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Global Standards
                  </h3>
                  <p className="text-secondary-300">
                    All products comply with international safety and quality 
                    certifications including ISO, IEC, and UL standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Expert Support
                  </h3>
                  <p className="text-secondary-300">
                    Our technical team provides comprehensive support from 
                    product selection to installation guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="btn-primary inline-flex items-center gap-2"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-white inline-flex items-center gap-2"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-400 font-semibold mb-1">
                    {stat.label}
                  </div>
                  <p className="text-sm text-secondary-300">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}