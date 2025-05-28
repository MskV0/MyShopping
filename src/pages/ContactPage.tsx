import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 text-indigo-600" />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Contact Info
                        </span>
                      </h2>
                      <p className="text-gray-600 [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
                        Feel free to reach out through any of these channels:
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="relative group/item">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <div className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm transition-all duration-300 group-hover/item:shadow-lg group-hover/item:-translate-y-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover/item:opacity-75 transition-opacity blur-sm"></div>
                            <Mail className="w-6 h-6 text-indigo-600 relative" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900">Email</h3>
                            <div className="relative">
                              <span className="absolute inset-0 text-indigo-600 group-hover/item:opacity-0 transition-opacity">
                                support@•••••••••••
                              </span>
                              <a 
                                href="mailto:support@shoppyglobe.com" 
                                className="text-transparent hover:text-purple-600 transition-colors relative group-hover/item:text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 group-hover/item:bg-clip-text opacity-0 group-hover/item:opacity-100"
                              >
                                support@shoppyglobe.com
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group/item">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <div className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm transition-all duration-300 group-hover/item:shadow-lg group-hover/item:-translate-y-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover/item:opacity-75 transition-opacity blur-sm"></div>
                            <Phone className="w-6 h-6 text-indigo-600 relative" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900">Phone</h3>
                            <div className="relative">
                              <span className="absolute inset-0 text-indigo-600 group-hover/item:opacity-0 transition-opacity">
                                +1 (555) •••-••••
                              </span>
                              <a 
                                href="tel:+15551234567" 
                                className="text-transparent hover:text-purple-600 transition-colors relative group-hover/item:text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 group-hover/item:bg-clip-text opacity-0 group-hover/item:opacity-100"
                              >
                                +1 (555) 123-4567
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group/item">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <div className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm transition-all duration-300 group-hover/item:shadow-lg group-hover/item:-translate-y-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover/item:opacity-75 transition-opacity blur-sm"></div>
                            <MapPin className="w-6 h-6 text-indigo-600 relative" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900">Address</h3>
                            <p className="text-gray-600 [text-shadow:_0_1px_0_rgb(255_255_255_/_100%)]">
                              123 Shopping Avenue<br />
                              Retail District, NY 10001<br />
                              United States
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Send us a Message
                    </span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group/input">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover/input:bg-white"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="relative group/input">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover/input:bg-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group/input">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover/input:bg-white"
                        placeholder="What is this about?"
                      />
                    </div>
                    
                    <div className="relative group/input">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover/input:bg-white resize-none"
                        placeholder="Your message here..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="relative group/button w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-100 group-hover/button:opacity-90 transition-opacity"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover/button:opacity-100 blur-sm transition-opacity"></div>
                      <span className="relative flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;