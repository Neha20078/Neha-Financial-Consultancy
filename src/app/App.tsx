import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Home, Building2, CreditCard, LandPlot, CheckCircle2, Clock, HeadphonesIcon, MapPin, Phone, Mail, Menu, X, MessageCircle } from 'lucide-react';

export default function App() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const userName = String(formData.get('user_name') ?? '').trim();
    const userPhone = String(formData.get('user_phone') ?? '').trim();
    const userEmail = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const newReferenceId = `NFC-${Date.now()}`;

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('Missing EmailJS environment variables');
      }

      // Developer Notes:
      // Form uses EmailJS (client-side email service).
      // Reference ID is dynamically generated and passed to EmailJS template.
      // Email includes name, phone, message, and reference ID.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: 'New Loan Inquiry',
          user_name: userName,
          user_phone: userPhone,
          email: userEmail,
          message,
          reference_id: newReferenceId,
          // Backward-compatible aliases in case template still references old names.
          full_name: userName,
          phone_number: userPhone,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setReferenceId(newReferenceId);
      setFormSubmitted(true);
      formElement.reset();
    } catch {
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h2 className="text-2xl font-bold" style={{ color: '#f4c430' }}>Neha Financial Consultancy</h2>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#f4c430] transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-[#f4c430] transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-[#f4c430] transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#f4c430] transition-colors">Contact</a>
              <button className="px-6 py-2 rounded-lg text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#0b1f3a' }}>
                Call Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-[#f4c430] transition-colors">Home</a>
              <a href="#services" className="block text-gray-700 hover:text-[#f4c430] transition-colors">Services</a>
              <a href="#about" className="block text-gray-700 hover:text-[#f4c430] transition-colors">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-[#f4c430] transition-colors">Contact</a>
              <button className="w-full px-6 py-2 rounded-lg text-white" style={{ backgroundColor: '#0b1f3a' }}>
                Enquiry Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #1a3a5c 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Trusted Financial & Loan Experts  
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Expert assistance for Housing, Personal & Mortgage Loans
                Across Mumbai,Navi Mumbai,Thane & Kalyan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
                
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f4c430' }}>
                      <Building2 size={24} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Fast Processing</p>
                      <p className="text-sm text-gray-300">Quick loan approvals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f4c430' }}>
                      <CheckCircle2 size={24} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Trusted Service</p>
                      <p className="text-sm text-gray-300">Over 10 Years of Financial Expertise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f4c430' }}>
                      <HeadphonesIcon size={24} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Expert Guidance</p>
                      <p className="text-sm text-gray-300">Personalized support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive loan solutions tailored to your financial needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Housing Loan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4" style={{ borderTopColor: '#f4c430' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#f4c430' }}>
                <Building2 size={32} style={{ color: '#0b1f3a' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Housing Loan</h3>
              <p className="text-gray-600 mb-6">
                Get your dream home with competitive interest rates and flexible repayment options. We guide you through the entire process.
              </p>
             
            </div>

            {/* Personal Loan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4" style={{ borderTopColor: '#f4c430' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#f4c430' }}>
                <CreditCard size={32} style={{ color: '#0b1f3a' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Personal Loan</h3>
              <p className="text-gray-600 mb-6">
                Quick personal loans for all your immediate financial needs. Minimal documentation and fast approval process.
              </p>
              
            </div>

            {/* Mortgage Loan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4" style={{ borderTopColor: '#f4c430' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#f4c430' }}>
                <LandPlot size={32} style={{ color: '#0b1f3a' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Mortgage Loan</h3>
              <p className="text-gray-600 mb-6">
                Leverage your property for financial flexibility. Best rates and transparent terms with expert consultation.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-[#f4c430] to-[#0b1f3a] rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8">
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#f4c430' }}>
                    <Building2 size={64} style={{ color: '#0b1f3a' }} />
                  </div>
                  <h3 className="text-center text-2xl font-bold mb-2" style={{ color: '#0b1f3a' }}>Neha Financial Consultancy</h3>
                  <p className="text-center text-gray-600">Your Trusted Financial Partner</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0b1f3a' }}>About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Neha Financial Consultancy has been serving the Kalyan,Thane,Mumbai and Navi-mumbai region community with dedication and integrity. We specialize in providing comprehensive loan solutions tailored to your unique financial needs.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team of experienced professionals ensures that you receive the best guidance throughout your loan journey, making the process smooth and hassle-free.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                    <CheckCircle2 size={20} style={{ color: '#0b1f3a' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: '#0b1f3a' }}>Trusted</h4>
                    <p className="text-sm text-gray-600">Years of reliable service</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                    <Clock size={20} style={{ color: '#0b1f3a' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: '#0b1f3a' }}>Fast Processing</h4>
                    <p className="text-sm text-gray-600">Quick loan approvals</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                    <HeadphonesIcon size={20} style={{ color: '#0b1f3a' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: '#0b1f3a' }}>Expert Guidance</h4>
                    <p className="text-sm text-gray-600">Personalized consultation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                    <MapPin size={20} style={{ color: '#0b1f3a' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: '#0b1f3a' }}>Local Expertise</h4>
                    <p className="text-sm text-gray-600">Deep financial market knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f4c430 0%, #f5d365 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Why Choose Us</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We go the extra mile to ensure your financial success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0b1f3a' }}>
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0b1f3a' }}>Quick Approval</h3>
              <p className="text-gray-600">
                Fast processing and approval within minimal processing period
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0b1f3a' }}>
                <CreditCard size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0b1f3a' }}>Low Interest Guidance</h3>
              <p className="text-gray-600">
                We help you find the most competitive rates
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0b1f3a' }}>
                <HeadphonesIcon size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0b1f3a' }}>Personalized Support</h3>
              <p className="text-gray-600">
                Dedicated support throughout your loan journey
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#0b1f3a' }}>
                <MapPin size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0b1f3a' }}>Local Expertise</h3>
              <p className="text-gray-600">
                Well-Established Network Across the Financial Sector
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0b1f3a' }}>What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who trusted us with their financial needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0b1f3a' }}>
                  R
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: '#0b1f3a' }}>Mayur walunj</h4>
                  <p className="text-sm text-gray-600">Home Loan Client</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Neha Financial Consultancy made my dream of owning a home come true. The process was smooth and the team was very supportive throughout."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0b1f3a' }}>
                  P
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: '#0b1f3a' }}>Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Personal Loan Client</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Quick approval and excellent service! I got my personal loan approved within 2 days. Highly recommended for anyone in Kalyan."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#0b1f3a' }}>
                  A
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: '#0b1f3a' }}>Amol shinde</h4>
                  <p className="text-sm text-gray-600">Mortgage Loan Client</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Professional team with deep knowledge. They helped me get the best mortgage rates and explained everything clearly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0b1f3a' }}>Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to take the next step? Contact us today for expert financial guidance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              {!formSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#0b1f3a' }}>Send us a message</h3>
                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="user_phone"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all bg-gray-50 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="Tell us about your loan requirements..."
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl text-white font-semibold transition-all hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        style={{ backgroundColor: '#0b1f3a' }}
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Request'}
                        {!isSubmitting && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        )}
                      </button>
                      {formError && (
                        <p className="text-red-500 text-sm text-center mt-3 font-medium">
                          Something went wrong. Please try again or contact us on WhatsApp.
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4 flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} />
                      You will receive a reference ID after submission
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#d4edda' }}>
                    <CheckCircle2 size={40} style={{ color: '#155724' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#0b1f3a' }}>Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your request has been submitted successfully.
                  </p>
                  <div className="bg-gradient-to-r from-[#f4c430]/10 to-[#0b1f3a]/10 rounded-xl p-6 mb-6">
                    <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#0b1f3a' }}>Reference ID: {referenceId}</p>
                    <p className="text-sm text-gray-700 font-medium">Please save this ID for future communication.</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700 justify-center">
                      <Clock size={18} style={{ color: '#f4c430' }} />
                      <p className="text-sm">Quick response within 24 hours</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 justify-center">
                      <CheckCircle2 size={18} style={{ color: '#f4c430' }} />
                      <p className="text-sm">Trusted financial guidance</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open('https://wa.me/919022386218', '_blank')}
                    className="w-full py-4 rounded-xl text-white font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-4"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-[#f4c430] font-semibold hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Business Info Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#0b1f3a' }}>Neha Financial Consultancy</h3>
                  <p className="text-gray-600">Your Trusted Financial Partner</p>
                </div>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                      <Phone size={22} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-semibold text-gray-900">+91 9022386218</p>
                      <p className="text-sm text-gray-600">Mr. Anil Dattu Bagal</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                      <Mail size={22} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-semibold text-gray-900 text-sm break-all">nehafinancialconsultancy@gmail.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f4c430' }}>
                      <MapPin size={22} style={{ color: '#0b1f3a' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Service Areas</p>
                      <p className="font-semibold text-gray-900">Mumbai, Navi Mumbai</p>
                      <p className="text-sm text-gray-600">Thane, Raigad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230b1f3a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  <div className="text-center relative z-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#f4c430' }}>
                      <MapPin size={32} style={{ color: '#0b1f3a' }} />
                    </div>
                    <p className="text-gray-700 font-semibold mb-1">Map Location</p>
                    <p className="text-sm text-gray-500">Mumbai Metropolitan Region</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 text-white" style={{ backgroundColor: '#0b1f3a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#f4c430' }}>Neha Financial Consultancy</h3>
              <p className="text-gray-300">
                Your trusted partner for all loan solutions in Kalyan
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-[#f4c430] transition-colors">Home</a>
                <a href="#services" className="block text-gray-300 hover:text-[#f4c430] transition-colors">Services</a>
                <a href="#about" className="block text-gray-300 hover:text-[#f4c430] transition-colors">About</a>
                <a href="#contact" className="block text-gray-300 hover:text-[#f4c430] transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <div className="space-y-2">
                <p className="text-gray-300">Housing Loan</p>
                <p className="text-gray-300">Personal Loan</p>
                <p className="text-gray-300">Mortgage Loan</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Details</h4>
              <div className="space-y-2 text-gray-300">
                <p>mr.Anil Bagal</p>
                <p>+91 9022386218</p>
                <p>nehafinancialconsultancy@gmail.com</p>
                <p>Kalyan (E), Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; 2026 Neha Financial Consultancy. All rights reserved.</p>
            <p> Developed & Designed by Neha Bagal</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Email Button */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=nehafinancialconsultancy@gmail.com&su=Loan%20Inquiry&body=Hello%20Neha%20Financial%20Consultancy,%0AI%20would%20like%20assistance%20with%20a%20loan.%20Please%20contact%20me."
          target="_blank"
          rel="noopener noreferrer"
          title="Send us an Email"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group relative"
          style={{ backgroundColor: '#3b82f6' }}
        >
          <Mail size={24} className="text-white" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Email Us
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/9022386218"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group relative animate-pulse hover:animate-none"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle size={24} className="text-white" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}