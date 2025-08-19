# BRN (Business Referral Network)

A multi-step user onboarding platform built with **Laravel**, **React (TypeScript)**, and **Inertia.js**. The project allows users to apply for membership into a Business Referral Network (BRN), with an admin dashboard for review and approval. Approved users are redirected to a secondary Laravel registration system to complete their profile.

---

## 🔧 Tech Stack

- **Backend:** Laravel 12 (PHP 8+)
- **Frontend:** React + TypeScript + Inertia.js
- **Database:** MySQL / MariaDB
- **Email:** Laravel Mail (SMTP)
- **UI Framework:** Tailwind CSS / Custom Components
- **State Management:** Inertia.js form handling (`useForm`)
- **Admin:** Laravel Blade + Auth
- **User Registration:** React SPA via Inertia

---

## 📁 Project Structure

```bash
├── app/
│   ├── Http/Controllers/
│   ├── Mail/          # Mailables: BrnApproved, BrnDeclined
│   ├── Models/        # BrnSubmission.php
│   │
├── resources/
│   ├── js/            # React (TSX) components
│   │   ├── components/
│   │   │   ├── select/
│   │   │   ├── ui/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── settings/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── Payment/
│   │   │   ├── settings/
│   │   ├── types/
│   ├── views/         # Blade templates (admin dashboard)
│   │   
├── routes/
│   ├── web.php        # Laravel routes
│   ├── auth.php
│   │   
├── public/
│   ├── images/
│   ├── js/bootstrap.min.js
