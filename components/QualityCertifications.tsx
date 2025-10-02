import { Certification } from '@/types'
import { Shield, Award, CheckCircle, ExternalLink, Users, Clock, Zap, FileCheck, Blockchain, BadgeCheck, Lock, Target } from 'lucide-react'

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
    <section className="section-padding bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Blockchain className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-white">
              Blockchain RFP Verification Standards
            </h2>
          </div>
          <p className="text-lg text-blue-200 max-w-4xl mx-auto">
            We're revolutionizing the RFP process with blockchain technology that eliminates fraud, 
            ensures payment security, and provides transparent, verifiable results through tokenized identities, 
            smart contracts, and on-chain KPI tracking.
          </p>
        </div>

        {/* Blockchain Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayCertifications.map((cert, index) => {
            const imageUrl = cert.metadata?.certificate_image?.imgix_url
              ? `${cert.metadata.certificate_image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=300&fit=crop&auto=format,compress'

            return (
              <div
                key={cert.id || index}
                className="group bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-blue-500 hover:-translate-y-1"
              >
                {/* Blockchain Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-900/50 shadow-sm flex items-center justify-center">
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
                  <p className="text-sm text-blue-200 line-clamp-3 leading-relaxed">
                    {cert.metadata?.description}
                  </p>
                  {cert.metadata?.issuing_body && (
                    <p className="text-xs text-gray-400 font-medium">
                      {cert.metadata.issuing_body}
                    </p>
                  )}
                </div>

                {/* On-Chain Verification Badge */}
                <div className="mt-4 flex items-center justify-center gap-1 text-green-400">
                  <Blockchain className="w-4 h-4" />
                  <span className="text-sm font-medium">On-Chain Verified</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Problem & Solution Section */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional RFP Problems */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-400" />
                Traditional RFP Process Problems
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">No Creator Verification</h4>
                    <p className="text-blue-200 text-sm">
                      Fake profiles, unverified skills, and no reputation tracking leads to poor quality work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Payment Disputes & Fraud</h4>
                    <p className="text-blue-200 text-sm">
                      Chargebacks, unpaid work, and payment delays destroy trust in the system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Fake KPI Reporting</h4>
                    <p className="text-blue-200 text-sm">
                      Manipulated metrics, fake deliverables, and no accountability for results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">No Process Transparency</h4>
                    <p className="text-blue-200 text-sm">
                      Black box operations, hidden fees, and no verifiable audit trails
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Solutions */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Blockchain className="w-6 h-6 text-green-400" />
                RFP.AUCTION Blockchain Solutions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Tokenized Creator IDs</h4>
                    <p className="text-blue-200 text-sm">
                      Every creator has an on-chain identity with verified skills, completion history, and reputation score
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Smart Contract Escrow</h4>
                    <p className="text-blue-200 text-sm">
                      Funds locked in smart contracts with automatic release upon verified milestone completion
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">On-Chain KPI Verification</h4>
                    <p className="text-blue-200 text-sm">
                      Immutable performance tracking with tokenized rewards for exceeding targets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Transparent Audit Trails</h4>
                    <p className="text-blue-200 text-sm">
                      Every RFP step recorded on blockchain with verifiable timestamps and outcomes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
            <div className="text-sm text-blue-200">Verified Creators</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-green-400 mb-1">$0</div>
            <div className="text-sm text-blue-200">Payment Disputes</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
            <div className="text-sm text-blue-200">Audit Trail</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-orange-400 mb-1">1000+</div>
            <div className="text-sm text-blue-200">Smart Contracts Deployed</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-blue-900/50 rounded-2xl p-8 max-w-2xl mx-auto border border-blue-700">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Experience Trustless RFP Processing?
            </h3>
            <p className="text-blue-200 mb-6">
              Join the future of RFP management with blockchain-verified creators, 
              secure smart contract payments, and transparent on-chain results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Blockchain className="w-5 h-5" />
                Launch Your First Smart RFP
              </button>
              <button className="border border-blue-400 text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-400/10 transition-colors">
                View Live Audit Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
