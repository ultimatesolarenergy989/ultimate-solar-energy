import * as React from 'react';

interface AdminContactNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  postCode: string;
  message: string;
}

export const AdminContactNotification: React.FC<AdminContactNotificationProps> = ({
  firstName,
  lastName,
  email,
  phone,
  state,
  postCode,
  message,
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
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 30px;
          }
          .info-row {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            color: #002866;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .value {
            color: #333;
            font-size: 16px;
          }
          .message-box {
            background-color: #f9f9f9;
            border-left: 4px solid #FFD700;
            padding: 15px;
            margin-top: 10px;
            border-radius: 4px;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🔔 New Contact Form Submission</h1>
        </div>
        
        <div className="content">
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            You have received a new inquiry from your website contact form.
          </p>

          <div className="info-row">
            <div className="label">Customer Name</div>
            <div className="value">{firstName} {lastName}</div>
          </div>

          <div className="info-row">
            <div className="label">Email Address</div>
            <div className="value">
              <a href={`mailto:${email}`} style={{ color: '#002866', textDecoration: 'none' }}>
                {email}
              </a>
            </div>
          </div>

          <div className="info-row">
            <div className="label">Phone Number</div>
            <div className="value">
              <a href={`tel:${phone}`} style={{ color: '#002866', textDecoration: 'none' }}>
                {phone}
              </a>
            </div>
          </div>

          <div className="info-row">
            <div className="label">Location</div>
            <div className="value">{state}, {postCode}</div>
          </div>

          <div className="info-row">
            <div className="label">Message</div>
            <div className="message-box">
              {message}
            </div>
          </div>
        </div>

        <div className="footer">
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>Ultimate Solar Energy</strong>
          </p>
          <p style={{ margin: 0 }}>
            This email was sent from your website contact form.
          </p>
        </div>
      </div>
    </body>
  </html>
);


