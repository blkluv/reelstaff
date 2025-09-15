import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation(
  email: string,
  orderDetails: {
    orderNumber: string
    customerName: string
    total: number
    items: any[]
  }
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Nafees Cables <orders@nafeescables.com>',
      to: [email],
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Order Confirmation</h1>
          <p>Dear ${orderDetails.customerName},</p>
          <p>Thank you for your order! Your order has been received and is being processed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin: 0 0 10px 0;">Order Details</h2>
            <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Total:</strong> $${orderDetails.total.toFixed(2)}</p>
          </div>

          <h3>Items Ordered:</h3>
          <ul>
            ${orderDetails.items.map(item => `
              <li>${item.product.title} - Quantity: ${item.quantity} - $${item.price.toFixed(2)}</li>
            `).join('')}
          </ul>

          <p>We will send you another email when your order ships.</p>
          <p>Thank you for choosing Nafees Cables!</p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send confirmation email')
    }

    return data
  } catch (error) {
    console.error('Error sending order confirmation:', error)
    throw error
  }
}

export async function sendContactMessage(
  name: string,
  email: string,
  subject: string,
  message: string,
  inquiryType: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Nafees Cables <contact@nafeescables.com>',
      to: ['admin@nafeescables.com'],
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">New Contact Message</h1>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send contact message')
    }

    return data
  } catch (error) {
    console.error('Error sending contact message:', error)
    throw error
  }
}

export async function sendBulkRequestNotification(
  customerName: string,
  email: string,
  company: string,
  projectDetails: string,
  requiredProducts: string,
  quantityEstimate: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Nafees Cables <bulk@nafeescables.com>',
      to: ['sales@nafeescables.com'],
      subject: `New Bulk Order Request from ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">New Bulk Order Request</h1>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Project Details:</h3>
            <p style="white-space: pre-wrap;">${projectDetails}</p>
            
            <h3>Required Products:</h3>
            <p style="white-space: pre-wrap;">${requiredProducts}</p>
            
            <h3>Quantity Estimate:</h3>
            <p>${quantityEstimate}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send bulk request notification')
    }

    return data
  } catch (error) {
    console.error('Error sending bulk request notification:', error)
    throw error
  }
}