import React from 'react'
import Header from '../../Components/ui/Header'
import SEO from '../../Components/SEO/SEO'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import './privacyPolicy.scss'
const PrivacyPolicy = () => {
    return (
        <div>
            <SEO
                title="Privacy Policy | Aqua Cainta Resort"
                type="website"
                name="Aqua Cainta Resort"
            />
            <Header
                title="Privacy Policy"
                small={true}
                imageUrl='https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            />

            <div className='privacy_policy'>
                <SectionWithHeading
                    main="Privacy Policy"
                    subheading="Aqua Cainta Resort"
                    desc='At Aqua Cainta Resort, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you visit our website.'
                />
                <div className='privacy_policy__container'>
                    <ol>
                        <li>
                            Information We Collect
                            <ol>
                                <li className='privacy_policy__list_alphabet'>
                                    <strong>Personal Information:</strong> We may collect personal information such as your name, email address, phone number, and other details when you voluntarily provide it to us, for example, when you contact us through our website.
                                </li>
                                <li className='privacy_policy__list_alphabet'>
                                    <strong>Usage Data:</strong> We may gather non-personal information about your interaction with our website. This may contain your IP address, browser type, operating system, and other technical information.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Use of Information:
                            <br />
                            <span className='privacy_policy__subheading'>We use the information we collect for the following purposes:
                            </span>
                            <ol>

                                <li className='privacy_policy__list_alphabet'>
                                    To respond to your inquiries and provide you with the requested information or services.
                                </li>
                                <li className='privacy_policy__list_alphabet'>
                                    To improve our website and customize your experience.
                                </li>
                                <li className='privacy_policy__list_alphabet'>
                                    To send you updates, newsletters, or promotional materials if you've opted to receive them.
                                </li>
                                <li className='privacy_policy__list_alphabet'>
                                    To observe and scrutinize usage trends on our website to enhance its performance and user satisfaction.
                                </li>

                            </ol>
                        </li>
                        <li> Data Sharing
                            <ol>
                                <li className='privacy_policy__list'>
                                    We do not sell or disclose your personal information to third parties unless required by law or with your explicit consent. We may share your information with service providers who assist us in website operation, email communication, and analytics. These service providers are bound to maintain the confidentiality of your data.
                                </li>

                            </ol>
                        </li>
                        <li>
                            Cookies

                            <ol>
                                <li className='privacy_policy__list'>
                                    We do not sell or disclose your personal information to third parties unless required by law or with your explicit consent. We may share your information with service providers who assist us in website operation, email communication, and analytics. These service providers are bound to maintain the confidentiality of your data.
                                </li>
                            </ol>

                        </li>
                        <li>Security
                            <ol>
                                <li className='privacy_policy__list'>
                                    We use reasonable security measures to protect your personal information from unauthorized access or disclosure. However, no data transmission over the Internet is entirely secure, and we cannot guarantee absolute security.
                                </li>
                            </ol>
                        </li>
                        <li> Links to Third-Party Websites
                            <ol>
                                <li className='privacy_policy__list'>
                                    Our website may possess links to third-party websites. We are not liable for these external websites' content or privacy practices. Please check the privacy policies of those websites separately.
                                </li>
                            </ol>
                        </li>
                        <li>Changes to Privacy Policy
                            <ol>
                                <li className='privacy_policy__list'>
                                    We may update our Privacy Policy from time to time, and any changes will be reflected here. It's your responsibility to review this policy periodically to stay informed.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Contact Information
                            <ol>
                                <li className='privacy_policy__list'>
                                    If you have any inquiries or concerns about our Privacy Policy or your personal information, please get in touch with us at aqua.cainta.resort@gmail.com or (032) 266 0914/0919 503 6715.

                                </li>
                            </ol>
                        </li>
                    </ol>

                    <p>Thank you for trusting Aqua Cainta Resort with your personal information. We value your privacy and are committed to protecting it.</p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
