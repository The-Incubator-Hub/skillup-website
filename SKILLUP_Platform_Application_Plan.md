# SKILLUP Platform Application Plan

Status: Draft for stakeholder review
Date: 2026-07-13
Context: Replacing WordPress/WooCommerce with a full Laravel application while retaining Moodle as the LMS delivery engine.

## 1. Executive Direction

SKILLUP should be treated as a full academy platform, not just a course website. The previous LearnLive setup used WordPress/WooCommerce as the storefront and Moodle as the learning portal. That can work for a small launch, but it becomes limiting once SKILLUP needs controlled payments, installments, learner accounts, admin workflows, corporate enrollment, support, analytics, and reliable Moodle provisioning.

The recommended direction is to build a full Laravel application that becomes SKILLUP's operational core:

- Public website and course discovery
- Learner registration and account management
- Course enrollment and payment
- Installment tracking
- Moodle account provisioning
- Community and accountability workflows
- Admin operations
- Corporate/team enrollment
- Revenue and learner analytics

Moodle should remain the LMS for course delivery, progress, quizzes, assignments, and certificates. The new SKILLUP application should own the business logic around who is allowed to access what, when, and why.

## 2. Platform Purpose

The platform is meant to serve as a structured tech career academy for Nigeria and West Africa. It should help motivated learners move from confusion to a clear career path, then from enrollment to guided learning, portfolio output, certification, and career readiness.

The broader purpose is not simply to sell courses. The platform must serve five business functions at once:

1. Trust engine: show that SKILLUP is credible, structured, outcome-focused, and locally relevant.
2. Enrollment engine: convert visitors into leads, applicants, paying learners, and corporate cohorts.
3. Learning gateway: provision learners into Moodle and guide them back to their active courses.
4. Accountability layer: connect learners to cohorts, mentors, reminders, community, and support.
5. Intelligence layer: show which tracks sell, which learners complete, where drop-off happens, and what revenue is predictable.

## 3. Who The Platform Serves

### 3.1 B2C Learners

These are individual learners paying for themselves.

- Career switchers and NYSC leavers starting from zero
- Graduates and job seekers looking for employable skills
- Junior professionals trying to move from beginner to intermediate
- Working adults who need flexible, mobile-friendly learning
- Freelancers and remote-work aspirants

Primary needs:

- Clear track comparison
- Affordable NGN pricing
- Installment options
- Mobile-first experience
- Proof of outcomes
- Simple path from payment to course access

### 3.2 Upskilling Professionals

These learners already have some experience but need structure, mentorship, and portfolio proof.

Primary needs:

- Intermediate and advanced course levels
- Portfolio/capstone guidance
- Mentor sessions
- Cohort accountability
- Certificates with clear competency signals
- Career support resources

### 3.3 Corporate And Team Sponsors

These are companies, SMEs, NGOs, and team leads enrolling multiple learners.

Primary needs:

- Corporate enquiry form
- Team package pricing
- Invoice and manual payment support
- Cohort management
- Learner progress summaries
- Dedicated support contact

### 3.4 Admins And Operations Team

These users run the platform daily.

Primary needs:

- Manage tracks, levels, pricing, cohorts, instructors, and resources
- View orders, payments, payment plans, and failed webhooks
- Retry Moodle enrollment
- Handle refunds, cancellations, and support issues
- Export reports
- Track revenue, conversion, and completion metrics

### 3.5 Instructors, Mentors, And Facilitators

These users support delivery and accountability.

Primary needs:

- View assigned cohorts
- See learner lists and progress
- Record attendance or session notes
- Share resources
- Escalate struggling learners

### 3.6 Future School Or Youth Programs

The revised product document defers the AI Secondary School program, but the platform should not block it. It should allow this as a future B2B/youth vertical.

Primary future needs:

- School partnership applications
- Parent/guardian consent
- Bulk student onboarding
- Facilitator assignment
- School-level reporting

## 4. Product Model

The revised product direction should be the source of truth.

Launch tracks:

- Product Management
- Software Development
- Product Design (UI/UX)
- Virtual Assistance
- Data Analysis

Phase 2 tracks:

- Digital Marketing
- Cybersecurity

Each track should support three progressive levels:

- Basic: for beginners; foundations and first project
- Intermediate: applied skills and portfolio/case work
- Advanced: specialization, capstone, mentorship, and leadership-readiness

Pricing should be per level, in NGN, with installment support from day one for higher-priced courses. The old fixed WooCommerce product model should be replaced with a proper product catalogue in the Laravel application database.

Admins should be able to create and manage tracks, levels, cohorts, prices, payment plans, product descriptions, media, enrollment caps, publication status, and Moodle mappings from Filament. Published products should automatically appear on the public course catalogue, track pages, and checkout flow.

## 5. Recommended Technical Architecture

### 5.1 Selected Stack

Selected application stack:

- Application framework: Laravel
- Authenticated panels: Filament multi-panel architecture
- Public UI: Inertia + React inside Laravel
- UI component system: Tailwind CSS + shadcn/ui for Inertia + React surfaces
- Motion/interaction: selective GSAP, CSS transitions, and lightweight React animation tools
- Admin panel: Filament Admin Panel
- Learner portal: Filament Learner Panel
- Corporate portal: Filament Corporate Panel
- Instructor portal: Filament Instructor Panel
- Database: PostgreSQL or MySQL
- Queues: Redis or database queues
- Payments: Paystack first, Flutterwave optional fallback
- LMS: Existing Moodle portal
- Transactional email: ZeptoMail primary, Amazon SES backup
- Critical messaging: WhatsApp Business/Cloud API for authentication and high-priority transactional alerts
- Community: Discourse, connected through SSO and group mapping
- Frontend runtime: Laravel-served pages, not a separate Next.js deployment

Laravel is the selected application foundation because Moodle is PHP-based and the platform depends heavily on auth, payments, discounts, uploaded eligibility lists, queues, admin panels, webhooks, notifications, scheduled jobs, and database workflows. It gives the project one real codebase without WordPress/WooCommerce constraints and without the extra operational overhead of a separate frontend application.

### 5.2 Frontend Approach

The current Next.js website should be treated as a design/content reference, not the long-term production frontend. Its pages, copy, images, forms, and interaction patterns can be ported into the Laravel application.

Recommended Laravel UI split:

- Filament Admin Panel for internal operations: courses, products, prices, discounts, orders, payments, learners, Moodle sync, corporate accounts, and reports.
- Filament Learner Panel for authenticated learner pages: dashboard, My Courses, profile, payment history, installment status, invoices/receipts, support tickets, and Moodle access.
- Filament Corporate Panel for sponsors: team seats, learner lists, invoices, payment status, and progress summaries.
- Filament Instructor Panel for mentors/facilitators: assigned cohorts, learner lists, session notes, attendance, and escalation flags.
- Inertia + React for public pages: homepage, course catalogue, track pages, resources, community, contact pages, and highly tailored checkout/landing experiences.
- Blade only for simple utility surfaces: email templates, fallback error pages, very plain legal pages, and small server-rendered fragments where React would add no value.

Filament can cover a large part of the product beyond admin use. It is strong for authenticated dashboards, CRUD workflows, forms, tables, imports, exports, widgets, actions, notifications, and role-based panels. It should be used heavily for the operational product surface. Public marketing pages and highly custom conversion pages should remain Inertia + React because they need tighter brand control, SEO-friendly layouts, and richer visual polish than Filament is designed for.

### 5.3 Non-Selected Alternatives

The following approaches are intentionally not selected for MVP:

- Next.js frontend + Laravel API: technically valid, but adds two deployments, cross-app auth/session complexity, CORS/cookie issues, and more moving parts around checkout and support debugging.
- Django/Python application: viable for some teams, but less aligned with Moodle, Filament-style admin needs, and the PHP deployment environment.
- Custom LMS build: deferred. Moodle remains the LMS delivery engine.

### 5.4 System Boundary

The system should be split clearly:

| System | Responsibility |
|---|---|
| Laravel SKILLUP Application | Public website, accounts, courses, pricing, discounts, orders, installments, enrollments, admin, CRM, reporting |
| Moodle | Lessons, quizzes, assignments, progress, certificates |
| Paystack/Flutterwave | Payment authorization, payment status, refunds, transaction truth |
| ZeptoMail / Amazon SES | Transactional email delivery |
| WhatsApp Business/Cloud API | Critical authentication and high-priority transactional alerts |
| Discourse | Community discussions, cohort groups, announcements, peer support |
| Analytics | Traffic, conversion, lead source, revenue, course demand |

The SKILLUP application should be the business source of truth. Moodle should not decide who bought what. Moodle should only deliver learning access based on instructions from the SKILLUP application.

### 5.5 UI/UX Interaction Stack

The Laravel/Inertia frontend should use a modern React UI system without overcomplicating the operational product.

Recommended UI stack:

- Tailwind CSS for styling and design tokens.
- shadcn/ui for editable React components: buttons, forms, cards, dialogs, tabs, accordions, dropdowns, tables, command palettes, toasts, alerts, and dashboards.
- GSAP for premium public-page motion: hero sequences, scroll storytelling, course-card reveals, event/campaign pages, and visual brand moments.
- CSS transitions or lightweight React animation tools for routine microinteractions.
- Recharts or similar charting tools for custom Inertia dashboards where Filament widgets are not enough.
- TanStack Table only where Inertia pages need complex custom tables; Filament tables remain the default for admin/operations.
- Lottie or Rive only for specific learning/brand illustrations, not as a default decoration layer.

Usage boundaries:

- Use shadcn/ui heavily on Inertia + React public pages, checkout, auth, course catalogue, track pages, and custom dashboards.
- Use native Filament components for Filament panels wherever possible; only build custom Filament widgets/pages when the default resource/table/form model is not enough.
- Use GSAP mostly on public marketing pages and campaign/storytelling pages.
- Avoid heavy motion in checkout, payment, enrollment, Moodle sync, support, and admin screens.
- Respect `prefers-reduced-motion`.
- Lazy-load heavy animation assets and defer non-critical motion.
- Motion must improve clarity, trust, or engagement; it should not distract from payment, enrollment, or support tasks.

## 6. Core User Journeys

### 6.1 Individual Learner Enrollment

1. Visitor browses tracks and compares levels.
2. Visitor selects a track and level.
3. Visitor creates an account or logs in.
4. Visitor chooses full payment or installment.
5. Application initializes Paystack checkout.
6. Paystack webhook confirms payment.
7. Application creates or updates the learner record.
8. Application creates or finds the Moodle user.
9. Application enrolls the learner into the matching Moodle course.
10. Learner receives email/WhatsApp instructions.
11. Learner sees the course inside "My Courses" and can open Moodle.

### 6.2 Installment Enrollment

1. Learner selects installment option.
2. Application records payment plan terms.
3. First payment grants access according to business rules.
4. Scheduled reminders are sent before future payment dates.
5. Missed payment triggers grace period, reminder, and possible access suspension.
6. Completed plan unlocks full status and final certification eligibility if needed.

### 6.3 Discount And Eligibility Checkout

1. Learner enters a promo code or logs in with an eligible email address.
2. Application checks the discount rules before payment is initialized.
3. Application validates the learner against rule conditions: email list, cohort, track, level, date range, usage limit, payment type, or corporate group.
4. Application calculates the discount server-side and stores the original price, discount amount, final payable amount, and rule used.
5. Learner sees the applied discount clearly before payment.
6. Paystack is initialized with the final payable amount only after server-side validation.
7. On successful payment, the order keeps a permanent discount audit trail for finance and support.

### 6.4 Moodle Provisioning

1. Payment is confirmed.
2. Enrollment job enters a queue.
3. Job checks product/course mapping.
4. Job creates or finds Moodle user.
5. Job enrolls the user into the Moodle course.
6. Job stores Moodle user ID, Moodle course ID, status, and response log.
7. Failed jobs are visible to admins and can be retried.

### 6.5 Corporate Enrollment

1. Sponsor submits corporate/team enquiry.
2. Admin creates a corporate quote or invoice.
3. Sponsor pays or is marked manually paid after verification.
4. Admin uploads or enters learner list.
5. Application bulk provisions learner accounts.
6. Application bulk enrolls learners into Moodle.
7. Sponsor receives onboarding details and optional progress reports.

### 6.6 Refund Or Cancellation

1. Refund/cancellation is received from payment gateway or entered by admin.
2. Application updates order/payment status.
3. Application suspends or removes Moodle course access based on policy.
4. Learner is notified.
5. Admin audit log records the action.

## 7. Required Application Modules

### 7.1 Public Website

- Homepage
- Course catalogue
- Track detail pages
- Level comparison
- Pricing and installment explanation
- Testimonials and instructor profiles
- Resources/blog
- Community landing page
- Corporate/team training page
- FAQ
- Legal pages: terms, privacy, refund policy

### 7.2 Learner Account

Learner account pages should be implemented as a Filament Learner Panel unless a page requires a highly custom branded layout.

- Registration/login
- Profile
- My Courses
- Payment history
- Installment status
- Moodle access link
- Support/contact shortcut
- Recommended next levels
- Receipts/invoices
- Active discounts or scholarship awards
- Course continuation prompts

### 7.3 Product, Course, And Pricing Admin

Tracks, levels, cohorts, and pricing should be editable as sellable products from the admin dashboard. The public website and checkout should read from this product catalogue, so changes made by admins are reflected on the frontend without code deployment.

- Tracks
- Levels
- Cohorts
- Products/offers
- Course outlines
- Pricing
- Payment plans
- Enrollment caps
- Moodle course mapping
- Product slug and published status
- Product hero image and gallery
- Product description, outcomes, syllabus, prerequisites, and FAQs
- Featured/hidden/sold-out status
- Enrollment start/end dates
- Cohort start date and delivery mode
- Full-payment and installment options
- Applicable discounts and scholarship eligibility
- Frontend sorting, category, and display controls

### 7.4 Payment And Order System

- Paystack checkout initialization
- Payment webhook verification
- Order records
- Payment records
- Discount application before checkout
- Installment schedules
- Manual payment fallback
- Refund/cancellation handling
- Revenue reports

### 7.5 Discount And Eligibility Engine

Discounts should be managed inside the SKILLUP application, not inside Paystack alone. Paystack should only receive the final verified amount after the application has checked eligibility.

Supported discount types:

- Public promo codes: codes anyone can use, such as launch offers or seasonal campaigns.
- Private promo codes: codes shared with a specific partner, community, event, or cohort.
- Email allowlist discounts: discounts available only to emails uploaded from a CSV/Excel sheet.
- Domain-based discounts: discounts for approved organizations using domains such as company.edu or company.com.
- Corporate/team discounts: group pricing for sponsors enrolling multiple learners.
- Early-bird discounts: available before a cohort deadline or until a seat cap is reached.
- Alumni discounts: available to learners who completed a previous SKILLUP course.
- Scholarship/financial-aid awards: admin-approved discounts, including 100% sponsored access.
- Referral discounts: optional Phase 2 feature tied to referral codes and attribution.
- Manual admin adjustments: controlled discount overrides for support or finance exceptions.

Required rules per discount:

- Name and internal description
- Discount type: percentage, fixed amount, or full scholarship
- Applicable track, level, cohort, or all courses
- Start and end date
- Usage limit globally
- Usage limit per learner/email
- Minimum order amount, if needed
- Whether it works with installments
- Whether it can stack with other discounts
- Eligible emails, domains, groups, or corporate account
- Admin approval status

Email-list discounts:

- Admin uploads a CSV/Excel sheet containing eligible emails.
- Application normalizes emails to lowercase and validates duplicates.
- Admin assigns the uploaded list to a discount rule.
- At checkout, the learner must use a matching account email.
- The system records which uploaded list granted eligibility.

Controls:

- Discount validation must happen server-side.
- Discount usage must be locked to the order at checkout initialization.
- Expired or exhausted discounts cannot be applied.
- Admins should see discount usage and revenue impact.
- Every discount application should be auditable.

### 7.6 Moodle Integration

The platform should include a Moodle Connection Manager in Filament, similar in purpose to Edwiser Bridge, but tailored to SKILLUP's exact payment, enrollment, discount, and product model.

Admin-managed Moodle setup:

- Moodle base URL
- Moodle web service token, encrypted at rest or optionally forced to `.env`
- Moodle service name / REST endpoint settings
- Connection timeout and retry settings
- Test connection button
- Moodle version/status check
- Last successful sync timestamp
- Connection health widget

Course and user sync:

- Pull Moodle course list into the SKILLUP application
- Pull Moodle categories, groups, cohorts, and course shortnames where available
- Map SKILLUP products, tracks, levels, and cohorts to Moodle courses
- Create/find Moodle user
- Enroll user in course
- Add user to Moodle group/cohort where mapped
- Suspend/unenroll user
- Fetch progress/completion later if needed
- Scheduled reconciliation between SKILLUP and Moodle
- Manual sync button for admins
- Retry failed enrollment jobs

Operational safeguards:

- Moodle API credentials stored server-side only
- No Moodle token exposed to frontend pages
- Every Moodle API request logged with status, target user, target course, response summary, and retry count
- Failed sync visible in Filament with retry/resolution actions
- Admin alert when Moodle connection fails
- Optional read-only mode if Moodle is temporarily unavailable

### 7.7 Filament Panels

The application should use Filament beyond admin-only screens.

Admin Panel:

- Overview metrics
- Learners
- Leads
- Products, tracks, levels, cohorts
- Orders
- Payments
- Discounts and promo codes
- Email eligibility lists
- Enrollments
- Failed webhooks
- Moodle connection manager
- Moodle sync logs
- Corporate enquiries
- Form submissions
- Reports/export

Learner Panel:

- Dashboard
- My Courses
- Payment history
- Installment status
- Receipts/invoices
- Profile
- Moodle access
- Support requests

Corporate Panel:

- Team account overview
- Seat allocation
- Learner upload
- Invoices/manual payment status
- Learner enrollment status
- Progress summary where available

Instructor Panel:

- Assigned cohorts
- Learner list
- Session/attendance notes
- Resource links
- Learner escalation flags

### 7.8 Community And Engagement

- Discourse community gateway
- Discourse SSO launch from learner portal
- Discourse cohort/category/group links
- Track, cohort, alumni, and announcement spaces in Discourse
- Product/cohort-to-Discourse group mapping
- Event/AMA calendar
- Reminder emails
- WhatsApp support CTA
- Onboarding sequence
- Course completion nudges

Discourse should be the selected community platform. Laravel remains the source of truth for users, products, payments, enrollments, and cohorts. Discourse should not decide who is a paid learner; it should receive access and group membership from SKILLUP through SSO/API sync.

### 7.9 Content And Resources

- Blog/resource library
- Gated downloads
- Track-specific resources
- Webinar/event pages
- Lead capture forms
- Email nurture tags

## 8. Suggested Database Model

Core tables:

- users
- learner_profiles
- admin_profiles
- tracks
- course_levels
- cohorts
- cohort_sessions
- instructors
- products
- product_media
- product_prices
- product_payment_plans
- product_moodle_mappings
- product_visibility_rules
- course_prices
- payment_plans
- discount_rules
- discount_codes
- discount_eligibility_lists
- discount_eligible_emails
- discount_redemptions
- orders
- order_items
- payments
- payment_webhook_events
- enrollments
- moodle_connections
- moodle_courses
- moodle_categories
- moodle_groups
- lms_accounts
- lms_course_mappings
- lms_sync_logs
- lms_api_logs
- form_submissions
- leads
- corporate_enquiries
- corporate_accounts
- corporate_learners
- support_requests
- resources
- events
- community_links
- discourse_connections
- discourse_groups
- discourse_group_mappings
- discourse_sync_logs
- notifications
- notification_events
- whatsapp_messages
- whatsapp_delivery_logs
- email_messages
- email_delivery_logs
- email_templates
- audit_logs

Important design rule: every payment webhook, discount application, and Moodle API attempt should be stored. This prevents silent enrollment failures, discount abuse, and support ambiguity.

## 9. Integration Requirements

### 9.1 Paystack

- Paystack public key, secret key, and webhook secret are configured in `.env`
- Test keys are only needed when payment implementation/testing begins
- Production keys are set in `.env` during deployment, not stored casually in chat or hardcoded
- Initialize transaction
- Verify transaction
- Webhook signature verification
- Store raw webhook event
- Send only the server-validated final payable amount
- Support partial/installment payments
- Handle refunds and failed payments

### 9.2 Moodle

Required Moodle capabilities:

- Configure Moodle connection from Filament
- Test Moodle API connection from Filament
- Import Moodle courses/categories/groups into SKILLUP
- Map SKILLUP products/tracks/levels/cohorts to Moodle courses/groups
- Create user
- Search/get user by email
- Enroll user into course
- Suspend or remove enrollment
- Read course list
- Run manual and scheduled reconciliation jobs
- Optionally read progress/completion later

The Moodle token must be least-privileged. It should never be exposed to frontend pages. If the team wants maximum production security, the Moodle token can be forced to `.env`; otherwise it may be stored encrypted in the database through the Filament Moodle Connection Manager.

### 9.3 Notifications And Transactional Email

Transactional notification rule:

- Every in-app notification should trigger a matching email by default.
- Exceptions must be intentional, such as low-priority UI-only notices or user-disabled marketing preferences.
- Critical transactional emails cannot be disabled: payment receipts, enrollment confirmation, Moodle access, failed payment, installment reminders, refunds, security alerts, and account access events.
- WhatsApp should be reserved for authentication and high-priority transactional alerts, not every notification.

Provider strategy:

- ZeptoMail is the primary transactional email provider.
- Amazon SES is the backup provider.
- Provider credentials are configured in `.env`.
- Email sending should run through Laravel queues.
- If ZeptoMail fails or exceeds retry thresholds, the system should fail over to SES for eligible transactional messages.
- Every email attempt should be logged with provider, recipient, template, status, response summary, and retry count.
- Admins should be able to view failed email deliveries and retry where safe.

WhatsApp strategy:

- Use WhatsApp for OTP/authentication messages, security alerts, urgent payment/installment reminders, Moodle access issues, and critical account notices.
- WhatsApp messages should use approved templates where required by the WhatsApp Business platform.
- WhatsApp should be opt-in where policy requires consent.
- Every WhatsApp attempt should be logged with recipient, template, status, provider response, and retry count.
- Email remains the durable default channel; WhatsApp is the high-urgency companion channel.

Required transactional emails:

- Welcome email
- Payment confirmation
- Moodle access email
- Failed payment reminder
- Installment reminder
- Course start reminders
- Enrollment confirmation
- Refund/cancellation notice
- Discount/scholarship award notification
- Support ticket updates
- Corporate learner invitation
- Security/account access alerts

CRM and nurture:

- Corporate enquiry routing
- Lead nurture sequences

### 9.4 Discourse Community

Required Discourse capabilities:

- DiscourseConnect/SSO so SKILLUP account login can open Discourse without a separate community password.
- Verified SKILLUP email as the identity source.
- Discourse groups mapped from SKILLUP tracks, cohorts, products, alumni status, and corporate groups.
- Community links surfaced in learner, corporate, and instructor panels.
- Admin-managed Discourse base URL, SSO secret, API key, and API username.
- Optional sync job to add/remove users from Discourse groups when enrollment, cohort, refund, or suspension status changes.
- Optional Discourse webhooks for community activity analytics later.

Discourse should host discussion categories, cohort spaces, peer support, announcements, and alumni conversations. Laravel should keep transactional notifications, payments, enrollment, support tickets, and course access outside Discourse.

### 9.5 Analytics

Track:

- Visitor source
- Course page views
- Track comparison clicks
- Enrollment CTA clicks
- Checkout starts
- Discount code attempts
- Discount redemptions by campaign/group
- Successful payments
- Failed payments
- Moodle provisioning success/failure
- Course completion, if Moodle progress is integrated

## 10. Migration From LearnLive/WordPress

The migration should happen in stages.

### Stage 1: Audit And Export

- Export WooCommerce products, orders, and customer records if admin access exists.
- Export Moodle course IDs, course shortnames, and enrolled users.
- Identify active learners who must retain access.
- Confirm which LearnLive products map to the revised SKILLUP tracks.

### Stage 2: Build New Application In Parallel

- Build the full Laravel SKILLUP application without disrupting the current portal.
- Port the useful current Next.js pages, copy, images, and components into Laravel/Inertia.
- Implement Filament multi-panel surfaces: Admin, Learner, Corporate, and Instructor.
- Configure Paystack `.env` placeholders; connect to Paystack test mode when test keys are provided.
- Connect to Moodle staging or a safe test course.
- Run enrollment tests using a low-cost/test course.

### Stage 3: Data Migration

- Import existing learner accounts where appropriate.
- Link imported learners to Moodle users.
- Create enrollment records for active learners.
- Preserve old payment/order references where available.

### Stage 4: Cutover

- Switch public enrollment links from WordPress to the new application.
- Move production traffic to the Laravel application once the core user journeys are stable.
- Keep Moodle portal running.
- Disable WooCommerce checkout.
- Retire the standalone Next.js frontend after its content and UI are ported.
- Monitor payment and enrollment logs daily for the first 2 weeks.

## 11. MVP Release Plan

### Phase 0: Product And Technical Finalization

Deliverables:

- Final track list
- Final pricing and installment rules
- Discount policy and allowed discount types
- Product catalogue structure and frontend publishing rules
- Moodle connection and course mapping rules
- Payment/refund policy
- Laravel/Inertia/Filament implementation conventions
- UI design system conventions: Tailwind tokens, shadcn/ui components, motion rules
- Admin roles and permissions

### Phase 1: Application Foundation

Deliverables:

- Laravel application shell
- Inertia + React setup
- Tailwind + shadcn/ui setup
- Shared UI component library for public pages, auth, checkout, and custom dashboards
- GSAP/motion utility setup with reduced-motion support
- Auth and learner registration
- Public course pages ported from the current website
- Learner profiles
- Filament Admin, Learner, Corporate, and Instructor panels
- Product, track, level, cohort, and pricing management
- Published product catalogue reflected on frontend pages
- Lead and enquiry forms

### Phase 2: Payments

Deliverables:

- Paystack `.env` configuration contract
- Paystack checkout
- Payment verification
- Webhook handling
- Orders and payments
- Discount rules, promo codes, and email eligibility lists
- Installment records
- Payment confirmation emails

### Phase 3: Moodle Enrollment

Deliverables:

- Filament Moodle Connection Manager
- Moodle API integration
- Moodle connection test and health widget
- Moodle course/category/group import
- Product-to-Moodle course mapping
- User provisioning
- Course enrollment
- Manual and scheduled Moodle sync
- Retryable enrollment jobs
- My Courses page
- Enrollment support logs

### Phase 4: Community And Engagement

Deliverables:

- Discourse community gateway
- DiscourseConnect/SSO integration
- Discourse group/category mapping for tracks, cohorts, alumni, and corporate groups
- Cohort group links into Discourse
- In-app notification system
- ZeptoMail transactional email integration
- Amazon SES backup mailer configuration
- WhatsApp Business/Cloud API integration for authentication and critical alerts
- Email nurture flows
- Event/webinar pages
- Resource library

### Phase 5: Corporate And Reporting

Deliverables:

- Corporate enquiry workflow
- Team enrollment
- Manual invoicing/payment marking
- Admin exports
- Revenue dashboard
- Enrollment and completion reporting

## 12. Security, Compliance, And Reliability

Required controls:

- HTTPS everywhere
- NDPR-aligned privacy policy
- Terms and refund policy
- Encrypted storage for any admin-managed Moodle token
- `.env` storage for Paystack keys and webhook secrets
- `.env` storage for ZeptoMail and Amazon SES credentials
- `.env` storage for WhatsApp and Discourse API/SSO credentials
- Motion accessibility via `prefers-reduced-motion`
- Lazy loading for heavy animation/media assets
- Server-side payment verification
- Server-side discount validation
- Verified email requirement before Discourse SSO account provisioning
- Webhook signature verification
- Secret storage in environment variables
- Role-based admin permissions
- Audit logs for admin actions
- Rate limiting on auth and forms
- Backup strategy for database
- Queued jobs for payment, Moodle, notification, email, WhatsApp, and Discourse sync workflows
- Monitoring for failed jobs

## 13. Key Product Decisions Needed

Before implementation begins, the team should confirm:

1. Which public pages and current React components should be ported first into Inertia + React?
2. Which pages should use GSAP-level motion versus simple CSS/React microinteractions?
3. Which shadcn/ui components should be standardized first for forms, cards, dialogs, tabs, tables, and checkout?
4. Will Moodle stay at portal.learnlive.site or move to a SKILLUP-branded subdomain?
5. Should Moodle API token storage be admin-managed and encrypted in the database, or restricted to `.env` only in production?
6. Which five tracks are final for MVP?
7. What product fields are mandatory before a product can be published to the frontend?
8. What are the exact Basic, Intermediate, and Advanced prices per track?
9. What installment rules apply?
10. What payment gateway launches first: Paystack only or Paystack plus Flutterwave?
11. Will Discourse be self-hosted or managed/hosted?
12. What Discourse groups/categories should map to SKILLUP tracks, cohorts, alumni, and corporate learners?
13. Which WhatsApp events are critical enough to send alongside email: OTP/auth, security alerts, payment failures, installment reminders, Moodle access failures, or all of these?
14. What is the refund/cancellation policy?
15. Are certificates issued by Moodle only, or should SKILLUP also generate public certificate verification later?
16. Who are the admin roles: super admin, finance, support, instructor, corporate manager?
17. Which Filament panels are included in MVP: Admin only, Admin + Learner, or Admin + Learner + Corporate + Instructor?
18. Which discount types are allowed at MVP: public promo codes, email-list discounts, corporate discounts, scholarships, early-bird discounts, alumni discounts, or manual admin adjustments?
19. Can discounts stack with installments, or should each order allow only one discount rule?
20. Who can create and approve discounts: super admin only, finance, or marketing with approval?
21. Which current Next.js pages/components should be ported first into Laravel?
22. Which in-app notification types, if any, should not trigger emails?

## 14. Immediate Next Steps

1. Create the Laravel application structure with Inertia, React, Filament, queues, and database configuration.
2. Set up Tailwind, shadcn/ui, shared design tokens, and motion/accessibility rules.
3. Build Filament panels for Admin and Learner first, then Corporate and Instructor as the workflow expands.
4. Port the current website homepage, course pages, forms, and shared UI into the Laravel app.
5. Define product catalogue fields so admins can create tracks, levels, prices, cohorts, and published frontend products.
6. Build the Moodle Connection Manager and collect Moodle admin/API access when ready to test.
7. Prepare Paystack `.env` keys and webhook secret placeholders; test keys will be provided when payment testing begins.
8. Prepare ZeptoMail and Amazon SES `.env` placeholders for transactional email.
9. Prepare WhatsApp Business/Cloud API `.env` placeholders for critical alerts.
10. Prepare Discourse URL, API, and SSO credential placeholders.
11. Define final MVP tracks, levels, and pricing.
12. Define discount policy, promo code rules, and email-list discount requirements.
13. Create the backend data model and admin panel.
14. Implement payment-to-Moodle enrollment using a test course.
15. Replace WordPress/WooCommerce checkout links once the flow is stable.

## 15. Success Criteria

The first production release is successful when:

- A learner can discover a track, create an account, pay, and receive Moodle access without manual intervention.
- Public pages use a consistent Tailwind + shadcn/ui design system.
- GSAP or advanced animation is used selectively and does not harm checkout clarity, accessibility, or performance.
- Reduced-motion preferences are respected.
- Admins can create, edit, publish, hide, and price products without code changes.
- Published products appear on frontend catalogue and track pages automatically.
- Admins can configure and test Moodle connection from Filament.
- Admins can import Moodle courses and map SKILLUP products to Moodle courses.
- Every important in-app notification creates a matching queued email.
- ZeptoMail sends transactional emails as the primary provider.
- Amazon SES is configured as the backup provider for transactional delivery.
- WhatsApp sends authentication and high-priority transactional alerts where configured.
- Discourse is accessible from SKILLUP through SSO after verified account login.
- Learners are added to the correct Discourse groups based on enrollment, cohort, alumni, or corporate status.
- Eligible learners can receive a valid discount through promo code, email list, corporate group, or admin award.
- Ineligible or expired discounts are rejected before Paystack checkout starts.
- Admins can see orders, payments, learner profiles, and enrollment status.
- Admins can see discount usage, revenue impact, and redemption history.
- Failed Moodle enrollment can be retried from the admin dashboard.
- Refunds or cancelled payments can suspend access according to policy.
- Corporate enquiries are captured and manageable.
- Analytics show visitor-to-enrollment conversion.
- The old WordPress/WooCommerce checkout is no longer required for new sales.
- The standalone Next.js frontend is no longer required because its useful pages and UI have been ported into Laravel.
