import { Users, Zap, Globe, Award, ArrowRight, Clock, Brain, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AboutSection() {
  const stats = [
    {
      icon: Award,
      number: '$100M+',
      label: 'RFPs Won',
      description: 'Proven track record of successful RFP outcomes'
    },
    {
      icon: Brain,
      number: 'AI-Powered',
      label: 'RFP Technology',
      description: 'Advanced AI for faster, smarter RFP processing'
    },
    {
      icon: Blockchain,
      number: '100%',
      label: 'On-Chain Verified',
      description: 'Blockchain transparency for all RFP processes'
    },
    {
      icon: TrendingUp,
      number: '@RFPTOK',
      label: 'Social RFP Revolution',
      description: 'TikTok-powered RFP authentication and engagement'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Revolutionizing RFPs with
                <span className="text-blue-400 block">AI + Blockchain + Social</span>
              </h2>
              <p className="text-lg text-blue-200 leading-relaxed">
                Founded by Hahz "Wizard of Hahz" Terry, who won over $100M in RFPs for clients through
                former company Masterpiece Advertising, RFP.AUCTION is disrupting the outdated RFP
                industry by combining artificial intelligence, blockchain verification, and social
                media engagement to create the world's first transparent, fair, and social RFP protocol.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    AI-Powered RFP Processing
                  </h3>
                  <p className="text-blue-200">
                    Advanced AI algorithms analyze requirements, match perfect vendors, 
                    and generate optimized proposals in minutes, not weeks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Blockchain className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Blockchain Verification Protocol
                  </h3>
                  <p className="text-blue-200">
                    Tokenized creator IDs, smart contract escrow, and on-chain KPI tracking 
                    eliminate fraud and ensure transparent, verifiable results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Social RFP Authentication
                  </h3>
                  <p className="text-blue-200">
                    Applicants submit 1-minute TikTok video replies tagging @RFPTOK to 
                    verify real people, showcase creativity, and build authentic connections.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Industry-Leading Expertise
                  </h3>
                  <p className="text-blue-200">
                    Built by RFP professionals who understand the pain points of traditional 
                    processes and have proven success winning major contracts.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                About RFP.AUCTION
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Explore RFP Solutions
              </Link>
              <a
                href="https://tiktok.com/@RFPTOK"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-pink-500 text-pink-400 px-6 py-3 rounded-lg font-semibold hover:bg-pink-500/10 transition-colors inline-flex items-center gap-2"
              >
                Follow @RFPTOK
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-colors border border-white/10 hover:border-blue-400/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-400 font-semibold mb-1 text-sm">
                    {stat.label}
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Innovation Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI RFP Co-Pilot</h3>
            <p className="text-blue-200 text-sm">
              Intelligent RFP analysis, vendor matching, and proposal generation that learns from your success patterns
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Blockchain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Contract RFPs</h3>
            <p className="text-blue-200 text-sm">
              Automated, transparent RFP execution with tokenized verification and dispute-free payments
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Social RFP Engagement</h3>
            <p className="text-blue-200 text-sm">
              TikTok-powered applicant verification and creative proposal submissions that go viral
            </p>
          </div>
        </div>

        {/* Founder Note */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-blue-400/30 max-w-3xl mx-auto">
            <blockquote className="text-lg text-blue-200 italic mb-4">
              "After winning $100M+ in RFPs the hard way, I knew the system was broken. 
              RFP.AUCTION combines everything I wish I had: AI for speed, blockchain for trust, 
              and social media for authentic connections. We're not just improving RFPs - 
              we're creating a new standard that works for everyone."
            </blockquote>
            <div className="text-white font-semibold">
              - Hahz "Wizard of Hahz" Terry, Founder & RFP Expert
            </div>
            <div className="text-blue-400 text-sm mt-2">
              Former Masterpiece Advertising RFP Director
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
