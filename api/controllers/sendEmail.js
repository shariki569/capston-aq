import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (name, number, email, message) => {
  try {

    const htmlTemplate = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modern HTML Email</title>
        <style type="text/css">
          body {
            margin: 0;
            background-color: #faf7f7;
          }
    
          table {
            border-spacing: 0;
          }
          td {
            padding: 0;
          }
          img {
            border: 0;
          }
          .wrapper {
            width: 100%;
            table-layout: fixed;
            -webkit-text-size-adjust: 100%;
            background-color: #faf7f7;
          }
          .main {
            background-color: white;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a1b;
          }
          
        </style>
      </head>
      <body>
        <center class="wrapper">
          <table class="main" width="100%">
            <!-- Top Border-->
            <tr>
              <td height="15" style="background-color: #218380"></td>
            </tr>
    
            <!-- Logo Section -->
            <tr>
                <tr>
                    <td class="logo"  style="text-align: center;">
                      <a href="http://localhost:5173/"><img src="https://res.cloudinary.com/aquacainta/image/upload/v1700979693/301617836_465290215607703_5208214587599489713_n_vdsslq.jpg" alt="Aqua Cainta Logo" width="100" title="Cainta Logo"></a>
                      <br>
                      <h1 style="font-size: 1.2rem; color: #218380";>Aqua Cainta Resort</h1>
                    </td>
                  </tr>
            </tr>
            
            <tr >
              <td style="padding: 1rem 1.2rem;" > 
                 <table>
                    <tr>
                        <td>
                            <p style="font-size: 1rem" >Email From: ${email}</p>
                            <p  style="font-size: 1rem">
                                From: <strong>${name}</strong>
                            </p>
                            <p  style="font-size: 1rem">
                                Number: <strong>${number}</strong>
                            </p>
                            <p  style="font-size: 1rem; margin-top: 2rem;">
                            ${message}
                          </p>
                        </td>
                    </tr>
                 </table>
             </td>
            </tr>
            <!-- Contact Us border -->
           
    
            <!-- Bottom Border-->
            <tr><td height="15" style="background-color: #218380"></td></tr>
          </table>
        </center>
      </body>
    </html>
    `
    const mailOptions = {
      from: `Aqua Cainta <${process.env.EMAIL_USER}/>`,
      to: process.env.EMAIL_ADD,
      subject: `New Message From ${name}`,
      html: htmlTemplate,
    };

    const info = transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default sendEmail;


export const recoveryEmail = ( recipient_email, OTP ) => {
  try {

    const htmlTemplate = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modern HTML Email</title>
        <style type="text/css">
          body {
            margin: 0;
            background-color: #faf7f7;
          }
    
          table {
            border-spacing: 0;
          }
          td {
            padding: 0;
          }
          img {
            border: 0;
          }
          .wrapper {
            width: 100%;
            table-layout: fixed;
            -webkit-text-size-adjust: 100%;
            background-color: #faf7f7;
          }
          .main {
            background-color: white;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            color: #171a1b;
          }
          
        </style>
      </head>
      <body>
        <center class="wrapper">
          <table class="main" width="100%">
            <!-- Top Border-->
            <tr>
              <td height="15" style="background-color: #218380"></td>
            </tr>
    
            <!-- Logo Section -->
            <tr>
                <tr>
                    <td class="logo"  style="text-align: center;">
                      <a href="http://localhost:5173/"><img src="https://res.cloudinary.com/aquacainta/image/upload/v1700979693/301617836_465290215607703_5208214587599489713_n_vdsslq.jpg" alt="Aqua Cainta Logo" width="100" title="Cainta Logo"></a>
                      <br>
                      <h1 style="font-size: 1.2rem; color: #218380";>Aqua Cainta Resort</h1>
                      <h3 style="font-size: 1.2rem; color: #218380";>Password Reset Request for Your Aqua Cainta Account</h3>
                    </td>
                  </tr>
            </tr>
            
            <tr >
              <td style="padding: 1rem 1.2rem;" > 
                 <table>
                    <tr>
                        <td>
                            <p style="font-size: 1rem" >For ${recipient_email}</p>
                            <p>
                              We received a request to reset the password for your Aqua Cainta account associated with this email address. If you made this request, please follow the instructions below.
                            </p>
                            <h3 style="font-weight: normal">
				                      Your One-Time Password (OTP) is: 
                              <strong>${OTP}</strong> .

				                    </h3>
				                    <p>
                              Please use this OTP to reset your password. Remember, this OTP is valid for only 5 minutes from the time this email was sent.
                              If you didn't request a password reset, please ignore this email or contact us if you have any questions. 
				                    </p>
				                    <p>
                            Thank you for using Aqua Cainta!
				                    </p>
                            <p>
                            Best regards,
                            <br/>
                            Your Aqua Cainta Team
				                    </p>
                        </td>
                    </tr>
                 </table>
             </td>
            </tr>
            <!-- Contact Us border -->
           
    
            <!-- Bottom Border-->
            <tr><td height="15" style="background-color: #218380"></td></tr>
          </table>
        </center>
      </body>
    </html>
    `

    const mailOptions = {
      from: process.env.EMAIL_ADD,
      to: recipient_email,
      subject: `Password Reset Request for Your Aqua Cainta Account`,
      html: htmlTemplate,
    }
    const info = transporter.sendMail(mailOptions)
    return info.response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
