'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { useState } from 'react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Validate form data
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-md bg-white">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="display-serif text-primary text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-3 md:mt-4">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                {t('getInTouch')}
              </h3>
              <div className="space-y-3 md:space-y-4 text-gray-700">
                <div className="flex items-start gap-2 md:gap-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {t('office')}
                    </div>
                    <div className="text-xs md:text-sm">
                      {t('officeAddress')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold text-sm md:text-base">{t('email')}</div>
                    <div className="text-xs md:text-sm">{t('emailAddress')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {t('officeHours')}
                    </div>
                    <div className="text-xs md:text-sm">{t('hours')}</div>
                    <div className="text-xs md:text-sm text-accent mt-1">
                      {t('emergency')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="card">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
                {t('quickInquiry')}
              </h3>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  {t('successMessage')}
                </div>
              )}
              
              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {t('errorMessage')}
                </div>
              )}


              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder')}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border rounded-lg input-focus-glow transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border rounded-lg input-focus-glow transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border rounded-lg input-focus-glow transition-colors ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? t('sending') : t('sendMessage')}</span>
                  {!isSubmitting && (
                    <svg
                      className="w-5 h-5 inline-block ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
