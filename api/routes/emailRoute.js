import express from 'express'
import sendEmail, { recoveryEmail } from '../controllers/sendEmail.js'


const router = express.Router()
router.post('/send-email', async (req, res ) => {
    const { name, number, email, message } = req.body
    try {
        await sendEmail( name, number, email, message )
        res.status(200).send("Email send successfully")
    } catch (err) {
        console.error('Failed to send email:', err)
        res.status(500).send('Failed to send email')
    }
} )


export default router;