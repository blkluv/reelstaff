import { Zap, Award, ArrowRight, Brain, TrendingUp, Shield } from 'lucide-react'
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
      icon: Shield,
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
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div>
              <h2 className="mb-6 text-4xl font-bold">
                Revolutionizing RFPs with
                <span className="block text-blue-400">AI + Blockchain + Social</span>
              </h2>
              <p className="text-lg leading-relaxed text-blue-200">
                Founded by Hahz "Wizard of Hahz" Terry, who won over $100M in RFPs for clients through
                former company Masterpiece Advertising, RFP.AUCTION is disrupting the outdated RFP
                industry by combining artificial intelligence, blockchain verification, and social
                media engagement to create the world's first transparent, fair, and social RFP protocol.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-blue-600 rounded-full">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">
                    AI-Powered RFP Processing
                  </h3>
                  <p className="text-blue-200">
                    Advanced AI algorithms analyze requirements, match perfect vendors, 
                    and generate optimized proposals in minutes, not weeks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-green-600 rounded-full">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">
                    Blockchain Verification Protocol
                  </h3>
                  <p className="text-blue-200">
                    Tokenized creator IDs, smart contract escrow, and on-chain KPI tracking 
                    eliminate fraud and ensure transparent, verifiable results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-purple-600 rounded-full">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">
                    Social RFP Authentication
                  </h3>
                  <p className="text-blue-200">
                    Applicants submit 1-minute TikTok video replies tagging @RFPTOK to 
                    verify real people, showcase creativity, and build authentic connections.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-orange-600 rounded-full">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">
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
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                About RFP.AUCTION
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors border border-white rounded-lg hover:bg-white/10"
              >
                Explore RFP Solutions
              </Link>
              <a
                href="https://tiktok.com/@RFPTOK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-pink-400 transition-colors border border-pink-500 rounded-lg hover:bg-pink-500/10"
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
                  className="p-6 text-center transition-colors border bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 border-white/10 hover:border-blue-400/30"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2 text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="mb-1 text-sm font-semibold text-blue-400">
                    {stat.label}
                  </div>
                  <p className="text-xs leading-relaxed text-blue-200">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Innovation Highlights */}
        <div className="grid grid-cols-1 gap-8 mt-16 text-center md:grid-cols-3">
          <div className="p-6 border bg-white/5 rounded-xl border-white/10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">AI RFP Co-Pilot</h3>
            <p className="text-sm text-blue-200">
              Intelligent RFP analysis, vendor matching, and proposal generation that learns from your success patterns
            </p>
          </div>

          <div className="p-6 border bg-white/5 rounded-xl border-white/10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Smart Contract RFPs</h3>
            <p className="text-sm text-blue-200">
              Automated, transparent RFP execution with tokenized verification and dispute-free payments
            </p>
          </div>

          <div className="p-6 border bg-white/5 rounded-xl border-white/10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Social RFP Engagement</h3>
            <p className="text-sm text-blue-200">
              TikTok-powered applicant verification and creative proposal submissions that go viral
            </p>
          </div>
        </div>

        {/* Founder Note */}
        <div className="mt-12 text-center">
          <div className="max-w-3xl p-8 mx-auto border bg-white/5 rounded-2xl border-blue-400/30">
            <blockquote className="mb-4 text-lg italic text-blue-200">
              "After winning $100M+ in RFPs the hard way, I knew the system was broken. 
              RFP.AUCTION combines everything I wish I had: AI for speed, blockchain for trust, 
              and social media for authentic connections. We're not just improving RFPs - 
              we're creating a new standard that works for everyone."
            </blockquote>
            <div className="font-semibold text-white">
              - Hahz "Wizard of Hahz" Terry, Founder & RFP Expert
            </div>
            <div className="mt-2 text-sm text-blue-400">
              Former Masterpiece Advertising RFP Director
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
