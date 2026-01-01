# Resend Email Service Setup

To enable the contact form email functionality:

1. **Get API Key**: Sign up at [Resend](https://resend.com) and create an API key
2. **Configure Environment**: Create `.env.local` file:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL_TO=contact@goodmangls.com
   CONTACT_EMAIL_FROM=noreply@goodmangls.com
   ```
3. **Domain Verification**: For production, verify your domain in Resend dashboard
4. **Test**: Submit the contact form and verify email delivery

See `.env.local.example` for template.

## Features

- ✅ Resend email integration
- ✅ Professional HTML email template
- ✅ Bilingual labels (Korean/English)
- ✅ Form validation with Zod
- ✅ Success/error feedback in both languages
- ✅ Automatic form reset after submission
