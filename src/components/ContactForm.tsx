import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Home,
  MapPin,
  Mail,
  User,
  Bug,
  FileText
} from 'lucide-react';

const approvedPestOptions = [
  'Ant Control',
  'Bed Bug Treatments',
  'Cockroach Control',
  'Fleas Control',
  'Flies Control',
  'Mosquito Control',
  'Rodent Management',
  'Termite Treatment',
  'Tick Control',
  'Wood Borer Treatment',
  'Other Pest Problem',
];

const propertyOptions = [
  'Home / Independent House',
  'Apartment / Flat',
  'Villa',
  'PG / Co-living Hostel',
  'Restaurant / Commercial Kitchen',
  'Office / Corporate Space',
  'Hotel / Hospitality',
  'Warehouse / Industrial Unit',
  'Other',
];

export interface ContactFormProps {
  defaultService?: string;
  defaultPest?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService, defaultPest }) => {
  const initialPest = defaultService || defaultPest || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    pestProblem: initialPest,
    serviceAddress: '',
    message: '',
    preferredContact: 'Phone Call' as 'Phone Call' | 'WhatsApp',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (cleanPhone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8-10 digits).';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select your property type.';
    }

    if (!formData.pestProblem) {
      newErrors.pestProblem = 'Please select the pest problem.';
    }

    if (!formData.serviceAddress.trim()) {
      newErrors.serviceAddress = 'Please provide your service locality or address in Bangalore.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // UI state simulation for instant feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      propertyType: '',
      pestProblem: '',
      serviceAddress: '',
      message: '',
      preferredContact: 'Phone Call',
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="slv-card rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl border border-cyan-500/30 bg-[#0e1015]/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/40 text-[#F6C453] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(229,169,60,0.2)]">
          <CheckCircle2 className="w-8 h-8 text-[#F6C453]" />
        </div>

        <span className="text-[#E5A93C] text-xs font-bold tracking-[0.2em] uppercase block mb-2 font-mono">
          Callback Request Received
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 font-heading">
          Thank You, {formData.name}!
        </h3>

        <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6 font-normal">
          We have registered your callback request for <span className="text-[#FFE08A] font-semibold">{formData.pestProblem}</span> at your <span className="text-white font-medium">{formData.propertyType}</span> in <span className="text-white font-medium">{formData.serviceAddress}</span>.
        </p>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-cyan-500/20 max-w-md mx-auto mb-8 text-xs text-zinc-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E5A93C] shrink-0" />
          <span>
            Preferred method: <strong className="text-white">{formData.preferredContact}</strong> ({formData.phone})
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:9180397822"
            className="slv-btn-primary w-full sm:w-auto px-6 py-3.5 text-xs font-bold gap-2 uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 text-[#090a0c]" />
            <span>Call 91803 97822 Directly</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="slv-btn-secondary w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider hover:border-cyan-400"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="slv-card rounded-3xl p-6 sm:p-9 lg:p-11 relative overflow-hidden backdrop-blur-xl border border-cyan-500/25 bg-[#0e1014]/95 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
      {/* Decorative top ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E5A93C]/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      {/* Header of Form */}
      <div className="mb-7 pb-5 border-b border-white/[0.07] relative z-10">
        <div className="inline-flex items-center gap-2 mb-2.5">
          <span className="w-5 h-[1.5px] bg-[#E5A93C]" />
          <span className="text-[#E5A93C] text-[11px] font-bold tracking-[0.2em] uppercase font-mono">
            FAST CALLBACK PROMISE
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
          Send Us a <span className="text-[#F6C453] slv-gold-text">Message</span>
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Provide your property and pest issue details to request a prompt callback from our Bangalore technical team.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 relative z-10">
        {/* Row 1: Full Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="contact-name" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-[#E5A93C]">*</span>
            </label>
            <div className="relative">
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="contact-phone" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-[#E5A93C]">*</span>
            </label>
            <div className="relative">
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 91803 97822"
                className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors font-mono ${
                  errors.phone
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email Address (optional) & Property Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Email Address */}
          <div>
            <label htmlFor="contact-email" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-zinc-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${
                errors.email
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="contact-property" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Property Type <span className="text-[#E5A93C]">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-property"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer ${
                  formData.propertyType ? 'text-white' : 'text-zinc-500'
                } ${
                  errors.propertyType
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
                }`}
              >
                <option value="" disabled className="bg-[#121316] text-zinc-500">
                  Select property type...
                </option>
                {propertyOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#121316] text-white">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.propertyType && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.propertyType}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Pest Problem & Service Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Pest Problem */}
          <div>
            <label htmlFor="contact-pest" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Pest Problem <span className="text-[#E5A93C]">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-pest"
                value={formData.pestProblem}
                onChange={(e) => setFormData({ ...formData, pestProblem: e.target.value })}
                className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer ${
                  formData.pestProblem ? 'text-white' : 'text-zinc-500'
                } ${
                  errors.pestProblem
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
                }`}
              >
                <option value="" disabled className="bg-[#121316] text-zinc-500">
                  Select pest problem...
                </option>
                {approvedPestOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#121316] text-white">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.pestProblem && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.pestProblem}</span>
              </p>
            )}
          </div>

          {/* Service Address */}
          <div>
            <label htmlFor="contact-address" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Service Address <span className="text-[#E5A93C]">*</span>
            </label>
            <div className="relative">
              <input
                id="contact-address"
                type="text"
                value={formData.serviceAddress}
                onChange={(e) => setFormData({ ...formData, serviceAddress: e.target.value })}
                placeholder="Locality / Area in Bangalore"
                className={`w-full bg-[#090a0c]/90 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${
                  errors.serviceAddress
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-white/[0.1] focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40'
                }`}
              />
            </div>
            {errors.serviceAddress && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.serviceAddress}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Describe Your Pest Problem (optional) */}
        <div>
          <label htmlFor="contact-message" className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            Describe Your Pest Problem <span className="text-zinc-500 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="contact-message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about the pest signs, rooms affected, or preferred inspection time..."
            className="w-full bg-[#090a0c]/90 border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/40 transition-colors resize-y min-h-[90px]"
          />
        </div>

        {/* Row 5: Preferred Contact Method */}
        <div>
          <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-2">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: 'Phone Call' })}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                formData.preferredContact === 'Phone Call'
                  ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-[#F6C453] shadow-[0_0_15px_rgba(229,169,60,0.2)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2]'
              }`}
            >
              <Phone className="w-4 h-4 text-[#E5A93C]" />
              <span>Phone Call</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: 'WhatsApp' })}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                formData.preferredContact === 'WhatsApp'
                  ? 'bg-[#25D366]/15 border-[#25D366] text-white shadow-[0_0_15px_rgba(37,211,102,0.25)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2]'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Primary Action Button: Gold Request a Callback */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="slv-btn-primary w-full py-4 text-xs sm:text-sm font-black gap-2 uppercase tracking-wider cursor-pointer shadow-lg shadow-[#E5A93C]/25 hover:shadow-[#E5A93C]/40"
          >
            <span>{isSubmitting ? 'Submitting Request...' : 'REQUEST A CALLBACK'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reassurance text */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Strict confidentiality. Fast response within operating hours.</span>
        </div>
      </form>
    </div>
  );
};

