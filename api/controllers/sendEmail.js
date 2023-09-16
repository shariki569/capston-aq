import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./env/email.env" });

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
                      <a href="http://localhost:5173/"><img src="https://res.cloudinary.com/duxm7pc8y/image/upload/v1694751313/Cainta_Logo_ip05jw.png" alt="Aqua Cainta Logo" width="100" title="Cainta Logo"></a>
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
      // text: `Name: ${name}\nNumber: ${number}\nEmail: ${email}\nMessage: ${message}`,
    };

    const info =  transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default sendEmail;
