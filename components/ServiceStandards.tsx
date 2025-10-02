import { Certification } from '@/types'

interface ServiceStandardsProps {
  certifications: Certification[]
}

export default function ServiceStandards({ certifications }: ServiceStandardsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Industry-Leading Standards
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Our services meet the highest industry standards and certifications to ensure quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <div 
              key={certification.id || index} 
              className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl"
            >
              <div className="flex items-start space-x-4">
                {certification.metadata?.certificate_image?.imgix_url && (
                  <img 
                    src={certification.metadata.certificate_image.imgix_url} 
                    alt={certification.title}
                    className="flex-shrink-0 object-contain w-16 h-16 rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {certification.title}
                  </h3>
                  {certification.metadata?.description && (
                    <p className="mb-3 text-sm text-gray-600">
                      {certification.metadata.description}
                    </p>
                  )}
                  <div className="space-y-1 text-xs text-gray-500">
                    {certification.metadata?.issuing_body && (
                      <p><strong>Issued by:</strong> {certification.metadata.issuing_body}</p>
                    )}
                    {certification.metadata?.issue_date && (
                      <p><strong>Issued:</strong> {new Date(certification.metadata.issue_date).toLocaleDateString()}</p>
                    )}
                    {certification.metadata?.expiry_date && (
                      <p><strong>Expires:</strong> {new Date(certification.metadata.expiry_date).toLocaleDateString()}</p>
                    )}
                    {certification.metadata?.certificate_number && (
                      <p><strong>Cert #:</strong> {certification.metadata.certificate_number}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {certifications.length === 0 && (
          <div className="py-12 text-center">
            <div className="max-w-md p-8 mx-auto bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No Certifications Available
              </h3>
              <p className="text-gray-600">
                Our certification information is currently being updated.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}