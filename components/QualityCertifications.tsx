import { Certification } from '@/types'
import { Shield, Award, CheckCircle, ExternalLink } from 'lucide-react'

interface QualityCertificationsProps {
  certifications: Certification[]
}

export default function QualityCertifications({ certifications }: QualityCertificationsProps) {
  // Default certifications if none provided
  const defaultCertifications = [
    {
      id: '1',
      title: 'ISO 9001:2015',
      metadata: {
        description: 'Quality Management System certification ensuring consistent product quality',
        issuing_body: 'International Organization for Standardization',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
          imgix_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85'
        }
      }
    },
    {
      id: '2',
      title: 'IEC 60227',
      metadata: {
        description: 'International standard for polyvinyl chloride insulated cables',
        issuing_body: 'International Electrotechnical Commission',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c',
          imgix_url: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c'
        }
      }
    },
    {
      id: '3',
      title: 'UL Listed',
      metadata: {
        description: 'Underwriters Laboratories safety certification for electrical products',
        issuing_body: 'Underwriters Laboratories',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91',
          imgix_url: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91'
        }
      }
    },
    {
      id: '4',
      title: 'CE Marking',
      metadata: {
        description: 'European Conformity marking for products sold in European Economic Area',
        issuing_body: 'European Commission',
        certificate_image: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          imgix_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        }
      }
    }
  ]

  const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
            <h2 className="text-4xl font-bold text-secondary-900">
              Quality Certifications
            </h2>
          </div>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Our commitment to excellence is backed by internationally recognized 
            certifications and quality standards, ensuring you receive only the 
            finest electrical cables and components.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displayCertifications.map((cert, index) => {
            const imageUrl = cert.metadata?.certificate_image?.imgix_url
              ? `${cert.metadata.certificate_image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=300&fit=crop&auto=format,compress'

            return (
              <div
                key={cert.id || index}
                className="group bg-secondary-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-secondary-100"
              >
                {/* Certificate Image */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-white shadow-sm">
                  <img
                    src={imageUrl}
                    alt={cert.title || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Certificate Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-secondary-600 line-clamp-3">
                    {cert.metadata?.description || 'Quality certification for electrical products'}
                  </p>
                  {cert.metadata?.issuing_body && (
                    <p className="text-xs text-secondary-500">
                      Issued by {cert.metadata.issuing_body}
                    </p>
                  )}
                </div>

                {/* Verification Badge */}
                <div className="mt-4 flex items-center justify-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quality Assurance Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Safety First
            </h3>
            <p className="text-secondary-600">
              All products undergo rigorous safety testing to meet international standards
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Premium Quality
            </h3>
            <p className="text-secondary-600">
              Manufactured using finest materials with strict quality control processes
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Global Standards
            </h3>
            <p className="text-secondary-600">
              Compliant with international electrical and safety regulations worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}