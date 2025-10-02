import { Certification } from '@/types'
import { Shield, CheckCircle, Zap, BadgeCheck, Lock, Target } from 'lucide-react'

interface BlockchainStandardsProps {
  certifications: Certification[]
}

export default function BlockchainStandards({ certifications }: BlockchainStandardsProps) {
  // Blockchain RFP verification standards
  const defaultCertifications = [
    {
      id: '1',
      title: 'Tokenized Creator ID',
      metadata: {
        description: 'On-chain verification of RFP creators with reputation scoring and completion history',
        issuing_body: 'RFP.AUCTION Blockchain Protocol',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
          imgix_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0'
        }
      }
    },
    {
      id: '2',
      title: 'Verified Funds Lock',
      metadata: {
        description: 'Smart contract escrow with tokenized fund verification and automatic payment release',
        issuing_body: 'RFP.AUCTION Payment Protocol',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d',
          imgix_url: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d'
        }
      }
    },
    {
      id: '3',
      title: 'On-Chain KPI Audits',
      metadata: {
        description: 'Immutable performance tracking with tokenized KPI verification and automatic payouts',
        issuing_body: 'RFP.AUCTION Analytics Engine',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          imgix_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
        }
      }
    },
    {
      id: '4',
      title: 'Smart Contract RFPs',
      metadata: {
        description: 'Automated RFP execution with conditional logic and dispute resolution mechanisms',
        issuing_body: 'RFP.AUCTION Smart Protocol',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0',
          imgix_url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0'
        }
      }
    }
  ]

  const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications

  return (
    <section className="text-white section-padding bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container-max">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-white">
              Blockchain RFP Verification Standards
            </h2>
          </div>
          <p className="max-w-4xl mx-auto text-lg text-blue-200">
            We're revolutionizing the RFP process with blockchain technology that eliminates fraud, 
            ensures payment security, and provides transparent, verifiable results through tokenized identities, 
            smart contracts, and on-chain KPI tracking.
          </p>
        </div>

        {/* Blockchain Standards Grid */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {displayCertifications.map((cert, index) => {
            const imageUrl = cert.metadata?.certificate_image?.imgix_url
              ? `${cert.metadata.certificate_image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=300&fit=crop&auto=format,compress'

            return (
              <div
                key={cert.id || index}
                className="p-6 text-center transition-all duration-300 bg-gray-800 border border-gray-700 group rounded-xl hover:bg-gray-700 hover:border-blue-500 hover:-translate-y-1"
              >
                {/* Lock Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 shadow-sm rounded-xl bg-blue-900/50">
                  {index === 0 && <BadgeCheck className="w-8 h-8 text-blue-400" />}
                  {index === 1 && <Lock className="w-8 h-8 text-green-400" />}
                  {index === 2 && <Target className="w-8 h-8 text-purple-400" />}
                  {index === 3 && <Zap className="w-8 h-8 text-orange-400" />}
                </div>

                {/* Standard Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-blue-200 line-clamp-3">
                    {cert.metadata?.description}
                  </p>
                  {cert.metadata?.issuing_body && (
                    <p className="text-xs font-medium text-gray-400">
                      {cert.metadata.issuing_body}
                    </p>
                  )}
                </div>

                {/* On-Chain Verification Badge */}
                <div className="flex items-center justify-center gap-1 mt-4 text-green-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">On-Chain Verified</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Problem & Solution Section */}
        <div className="p-8 mb-12 bg-gray-800 border border-gray-700 rounded-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Traditional RFP Problems */}
            <div>
              <h3 className="flex items-center gap-2 mb-6 text-2xl font-bold text-white">
                <Shield className="w-6 h-6 text-red-400" />
                Traditional RFP Process Problems
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-red-500 rounded-full">
                    <span className="text-sm text-white">!</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">No Creator Verification</h4>
                    <p className="text-sm text-blue-200">
                      Fake profiles, unverified skills, and no reputation tracking leads to poor quality work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-red-500 rounded-full">
                    <span className="text-sm text-white">!</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Payment Disputes & Fraud</h4>
                    <p className="text-sm text-blue-200">
                      Chargebacks, unpaid work, and payment delays destroy trust in the system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-red-500 rounded-full">
                    <span className="text-sm text-white">!</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Fake KPI Reporting</h4>
                    <p className="text-sm text-blue-200">
                      Manipulated metrics, fake deliverables, and no accountability for results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-red-500 rounded-full">
                    <span className="text-sm text-white">!</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">No Process Transparency</h4>
                    <p className="text-sm text-blue-200">
                      Black box operations, hidden fees, and no verifiable audit trails
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Solutions */}
            <div>
              <h3 className="flex items-center gap-2 mb-6 text-2xl font-bold text-white">
                <Lock className="w-6 h-6 text-green-400" />
                RFP.AUCTION Blockchain Solutions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-green-500 rounded-full">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Tokenized Creator IDs</h4>
                    <p className="text-sm text-blue-200">
                      Every creator has an on-chain identity with verified skills, completion history, and reputation score
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-green-500 rounded-full">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Smart Contract Escrow</h4>
                    <p className="text-sm text-blue-200">
                      Funds locked in smart contracts with automatic release upon verified milestone completion
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-green-500 rounded-full">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">On-Chain KPI Verification</h4>
                    <p className="text-sm text-blue-200">
                      Immutable performance tracking with tokenized rewards for exceeding targets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-green-500 rounded-full">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Transparent Audit Trails</h4>
                    <p className="text-sm text-blue-200">
                      Every RFP step recorded on blockchain with verifiable timestamps and outcomes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Metrics */}
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="mb-1 text-2xl font-bold text-blue-400">100%</div>
            <div className="text-sm text-blue-200">Verified Creators</div>
          </div>
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="mb-1 text-2xl font-bold text-green-400">$0</div>
            <div className="text-sm text-blue-200">Payment Disputes</div>
          </div>
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="mb-1 text-2xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-blue-200">Audit Trail</div>
          </div>
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="mb-1 text-2xl font-bold text-orange-400">1000+</div>
            <div className="text-sm text-blue-200">Smart Contracts Deployed</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl p-8 mx-auto border border-blue-700 bg-blue-900/50 rounded-2xl">
            <h3 className="mb-3 text-2xl font-bold text-white">
              Ready to Experience Trustless RFP Processing?
            </h3>
            <p className="mb-6 text-blue-200">
              Join the future of RFP management with blockchain-verified creators, 
              secure smart contract payments, and transparent on-chain results.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                <Lock className="w-5 h-5" />
                Launch Your First Smart RFP
              </button>
              <button className="px-6 py-3 font-semibold text-blue-400 transition-colors border border-blue-400 rounded-lg hover:bg-blue-400/10">
                View Live Audit Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
