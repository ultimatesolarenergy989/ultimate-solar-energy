import * as React from 'react';

interface ClientConfirmationProps {
  firstName: string;
}

export const ClientConfirmation: React.FC<ClientConfirmationProps> = ({
  firstName,
}) => (
  <html>
    <head>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #002866, #003580);
            padding: 40px 30px;
            text-align: center;
          }
          .logo {
            width: 80px;
            height: 80px;
            background-color: #FFD700;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .checkmark {
            color: #002866;
            font-size: 48px;
            font-weight: bold;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          .greeting {
            font-size: 20px;
            color: #002866;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            color: #666;
            line-height: 1.8;
            margin-bottom: 30px;
          }
          .highlight-box {
            background: linear-gradient(135deg, #FFD700, #FDB714);
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
          }
          .highlight-box h2 {
            color: #002866;
            font-size: 18px;
            margin: 0 0 10px 0;
          }
          .highlight-box p {
            color: #002866;
            margin: 5px 0;
            font-size: 16px;
          }
          .contact-info {
            margin-top: 30px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
          }
          .contact-info p {
            margin: 8px 0;
            font-size: 14px;
            color: #666;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 25px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .social-links {
            margin-top: 15px;
          }
          .social-links a {
            color: #002866;
            text-decoration: none;
            margin: 0 10px;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="logo">
            <span className="checkmark">✓</span>
          </div>
          <h1>Thank You for Contacting Us!</h1>
        </div>
        
        <div className="content">
          <p className="greeting">Hi {firstName},</p>
          
          <p className="message">
            Thank you for reaching out to Ultimate Solar Energy! We've received your message and appreciate your interest in our solar solutions.
          </p>

          <div className="highlight-box">
            <h2>What Happens Next?</h2>
            <p>📞 Our team will review your inquiry</p>
            <p>⚡ We'll contact you within 24 hours</p>
            <p>☀️ Get ready for clean, sustainable energy!</p>
          </div>

          <p className="message">
            We're excited to help you take the next step toward energy independence with our premium solar solutions.
          </p>

          <div className="contact-info">
            <p><strong>Need immediate assistance?</strong></p>
            <p>📞 Call us: <a href="tel:1300661388" style={{ color: '#002866', textDecoration: 'none' }}>1300 661 388</a></p>
            <p>✉️ Email: <a href="mailto:team@ultimatesolarenergy.com.au" style={{ color: '#002866', textDecoration: 'none' }}>team@ultimatesolarenergy.com.au</a></p>
          </div>
        </div>

        <div className="footer">
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>Ultimate Solar Energy</strong>
          </p>
          <p style={{ margin: '0 0 5px 0' }}>
            1/50 Assembly Drive, Tullamarine VIC 3043
          </p>
          <p style={{ margin: '0 0 15px 0' }}>
            Level 6, 143 St Georges Terrace, Perth WA 6000
          </p>
          <p style={{ margin: 0, fontSize: '11px' }}>
            © 2024 Ultimate Solar Energy. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
);


