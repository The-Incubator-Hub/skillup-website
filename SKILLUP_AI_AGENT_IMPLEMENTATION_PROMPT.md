# SKILLUP AI Agent Implementation Prompt

Status: Draft for execution planning
Date: 2026-07-13
Purpose: Instructions for an AI coding agent to build the full SKILLUP Laravel platform from start to finish.

## 1. How To Use This Document

Give this document to the AI coding agent that will work on the project. The agent should also read these project documents before touching code:

- `SKILLUP_Platform_Application_Plan.md`
- `SKILLUP_Full_App_Page_Map.md`
- `SkillUp_Product_Document_Revised.docx`
- `SkillUp_Product_Document.md`
- `SkillUp_EdTech_Analysis.md`

The agent should use this document as the execution prompt. It should work phase by phase, verify each phase, and avoid skipping ahead into integrations before the foundation is stable.

## 2. Master Prompt For The Agent

You are building the SKILLUP Tech Academy platform as a full Laravel application. Replace the old WordPress/WooCommerce approach and port the useful parts of the current Next.js website into Laravel.

The selected architecture is:

- Laravel as the full application framework
- Inertia + React for public pages, checkout, and custom user-facing experiences
- Tailwind CSS + shadcn/ui for the Inertia + React design system
- Selective GSAP for premium public-page motion and storytelling
- Filament multi-panel architecture for Admin, Learner, Corporate, and Instructor portals
- Moodle as the external LMS delivery engine
- Paystack as the primary payment gateway, with Flutterwave optional later
- ZeptoMail as primary transactional email provider
- Amazon SES as backup transactional email provider
- WhatsApp Business/Cloud API for authentication and high-priority transactional alerts
- Discourse as the community platform through SSO and group/category mapping
- Queues for payment, Moodle, email, WhatsApp, notification, and Discourse sync workflows

Important boundaries:

- Do not rebuild Moodle.
- Do not keep WordPress/WooCommerce as the commerce engine.
- Do not run Next.js as a separate production frontend.
- Do not hardcode secrets.
- Do not ask for production credentials in chat.
- Keep API keys, webhooks, and provider secrets in `.env`.
- Use `.env.example` placeholders.
- Keep the existing Next.js implementation as a reference until all useful pages/components are ported.
- Preserve existing documents.
- Work in small verified phases.

The product must support:

- Dynamic product catalogue: tracks, levels, cohorts, pricing, payment plans, media, descriptions, enrollment caps, and publication status managed from admin.
- Published products reflected automatically on public catalogue, track pages, product pages, and checkout.
- Discounts: promo codes, private codes, email-list discounts, corporate discounts, scholarships, early-bird, alumni discounts, and controlled manual overrides.
- Payment: Paystack checkout, webhooks, verification, installments, refunds, manual fallback, receipts, invoices.
- Moodle integration: admin-managed connection, test connection, course/category/group import, product-to-Moodle mapping, enrollment jobs, sync logs, failed enrollment retry.
- Discourse integration: SSO, group/category mapping, learner launch links, sync logs.
- Notifications: every important in-app notification sends email by default through ZeptoMail with SES fallback; WhatsApp only for auth/security/urgent transactional alerts.
- Role-based portals: Admin, Learner, Corporate, Instructor.
- Reports, exports, audit logs, support tickets, and operational health.

## 3. Agent Operating Rules

Follow these rules throughout the project:

1. Read the planning documents before implementation.
2. Create or use a dedicated branch before major changes.
3. Do not delete the existing Next.js app until the Laravel replacement is working and the user approves the cutover.
4. Commit or checkpoint after each completed phase if the workflow supports commits.
5. Use migrations, seeders, factories, policies, form requests, jobs, notifications, services, and tests.
6. Prefer framework-native Laravel patterns over ad hoc scripts.
7. Prefer Filament resources/actions/widgets for operational screens.
8. Prefer Inertia + React + shadcn/ui for brand-heavy public pages and custom checkout.
9. Use native Filament UI for admin/operations unless a custom page is clearly needed.
10. Keep GSAP mostly on public marketing pages and campaign/storytelling surfaces.
11. Respect `prefers-reduced-motion`.
12. Lazy-load heavy animation/media assets.
13. Never expose Moodle, Paystack, ZeptoMail, SES, WhatsApp, or Discourse credentials to frontend code.
14. Every external API call should have logging and retry behavior where appropriate.
15. Every webhook should store raw payload metadata safely and be idempotent.
16. Every payment-to-enrollment flow must be idempotent.
17. Every failed Moodle enrollment should be visible and retryable from admin.
18. Every significant admin action should be auditable.
19. Every important in-app notification should create an email event.
20. Ask the user before destructive changes, deleting old code, changing domains, or choosing hosting assumptions.

## 4. Phase 0 - Discovery, Safety, And Setup Plan

Prompt:

Read all SKILLUP planning documents and inspect the existing Next.js codebase. Produce a short implementation plan before editing code. Identify the current pages/components that should be ported into Laravel/Inertia.

Tasks:

- Read `SKILLUP_Platform_Application_Plan.md`.
- Read `SKILLUP_Full_App_Page_Map.md`.
- Inspect current `src/app`, `src/components`, `src/lib`, `public/images`.
- Identify current pages:
  - Homepage
  - About
  - Contact
  - Tech Trybe
  - SkillUp Plus
  - Form route
- List components to port or replace with shadcn/ui.
- Confirm local requirements:
  - PHP version
  - Composer
  - Node/npm
  - Database
  - Queue driver
- Define the migration approach from current Next.js to Laravel.

Deliverables:

- Short implementation summary.
- Initial route and component porting list.
- Confirmed toolchain requirements.
- No code changes unless needed for discovery.

Acceptance checks:

- Existing files are not deleted.
- The agent clearly understands that Laravel is the target application.
- The agent identifies what current Next.js UI is worth porting.

## 5. Phase 1 - Laravel Foundation

Prompt:

Create the Laravel application foundation with Inertia + React, Tailwind, shadcn/ui-ready structure, Filament, authentication, roles, queues, and baseline tests.

Tasks:

- Create Laravel application structure.
- Install and configure Inertia + React.
- Configure Vite.
- Configure Tailwind CSS.
- Add shadcn/ui-compatible setup and component folder structure.
- Add GSAP dependency only when public page animation work begins.
- Install Filament.
- Configure Laravel authentication.
- Add role/permission model.
- Create base roles:
  - Super Admin
  - Operations Manager
  - Finance Manager
  - Content & Program Manager
  - Instructor / Mentor
- Create separate Filament panels:
  - Admin
  - Learner
  - Corporate
  - Instructor
- Configure queue driver.
- Configure `.env.example` placeholders for all providers.

Required `.env.example` placeholders:

```env
APP_URL=
DB_CONNECTION=
QUEUE_CONNECTION=

PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=

MOODLE_BASE_URL=
MOODLE_TOKEN=
MOODLE_SERVICE=

ZEPTOMAIL_API_KEY=
ZEPTOMAIL_FROM_ADDRESS=
ZEPTOMAIL_FROM_NAME=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_SES_FROM_ADDRESS=

WHATSAPP_BUSINESS_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_WEBHOOK_SECRET=

DISCOURSE_BASE_URL=
DISCOURSE_SSO_SECRET=
DISCOURSE_API_KEY=
DISCOURSE_API_USERNAME=
```

Deliverables:

- Laravel app booting locally.
- Inertia + React page rendering.
- Filament installed and accessible.
- Auth working.
- Base roles seeded.
- `.env.example` updated.
- Basic tests pass.

Acceptance checks:

- No production credentials committed.
- App boots without external integrations.
- Role-based access foundation exists.

## 6. Phase 2 - UI Design System And Public Shell

Prompt:

Build the SKILLUP public UI foundation using Inertia + React, Tailwind, shadcn/ui, and selective motion rules. Port the current public website experience into the Laravel app without depending on Next.js.

Tasks:

- Define design tokens:
  - Color palette
  - Typography scale
  - Spacing
  - Button styles
  - Card styles
  - Form styles
  - Dashboard layout primitives
- Add shadcn/ui components needed first:
  - Button
  - Input
  - Textarea
  - Select
  - Checkbox
  - Radio group
  - Dialog
  - Sheet
  - Tabs
  - Accordion
  - Card
  - Badge
  - Alert
  - Toast
  - Dropdown menu
  - Table
- Create layout components:
  - Public layout
  - Auth layout
  - Checkout layout
  - Learner layout bridge if needed
- Port public pages:
  - Homepage
  - About
  - Contact
  - Courses catalogue placeholder
  - Track page placeholder
  - Community page placeholder
  - Corporate page placeholder
- Add GSAP only for selected public animation areas.
- Add reduced-motion handling.
- Lazy-load heavy animations and media.

Deliverables:

- Public site shell in Laravel/Inertia.
- Shared shadcn/ui component setup.
- Current website content/assets ported where useful.
- Animation guardrails implemented.

Acceptance checks:

- Public pages render correctly.
- Mobile layout works.
- Reduced-motion users are respected.
- Checkout/admin pages are not over-animated.

## 7. Phase 3 - Core Domain Model

Prompt:

Build the core data model for products, tracks, levels, cohorts, pricing, payment plans, enrollments, users, and audit logs.

Tasks:

- Create migrations/models/factories for:
  - users
  - learner_profiles
  - admin_profiles
  - corporate_accounts
  - corporate_learners
  - instructor_profiles
  - tracks
  - course_levels
  - cohorts
  - cohort_sessions
  - products
  - product_media
  - product_prices
  - product_payment_plans
  - product_visibility_rules
  - product_moodle_mappings
  - orders
  - order_items
  - enrollments
  - audit_logs
- Add model relationships.
- Add enums/status fields:
  - product status
  - cohort status
  - order status
  - enrollment status
  - payment status
- Add seed data for MVP tracks:
  - Product Management
  - Software Development
  - Product Design (UI/UX)
  - Virtual Assistance
  - Data Analysis
- Add Phase 2 track seed placeholders:
  - Digital Marketing
  - Cybersecurity

Deliverables:

- Core migrations and models.
- Seeded sample catalogue.
- Tests for relationships and status behavior.

Acceptance checks:

- Products can represent tracks, levels, cohorts, prices, and publish state.
- Published products can be queried for public frontend.
- Unpublished products are hidden.

## 8. Phase 4 - Filament Admin Product Catalogue

Prompt:

Build the Filament admin resources that allow admins to create, edit, publish, hide, price, and map products without code changes.

Tasks:

- Build Filament resources for:
  - Tracks
  - Levels
  - Cohorts
  - Products
  - Product prices
  - Payment plans
  - Product media
  - Product visibility rules
- Add product publishing workflow.
- Add required fields before publishing:
  - title
  - slug
  - track
  - level
  - price
  - description
  - outcomes
  - syllabus
  - status
  - enrollment cap or unlimited flag
- Add product preview action.
- Add filters for published, draft, hidden, sold out, track, level.
- Add audit logs for product changes.

Deliverables:

- Product catalogue admin.
- Products reflected on public catalogue and product pages.
- Product preview.

Acceptance checks:

- Admin can create and publish a product.
- Published product appears publicly.
- Hidden/draft product does not appear publicly.
- Product changes are audited.

## 9. Phase 5 - Learner, Corporate, And Instructor Panels

Prompt:

Build the authenticated panels for learner, corporate sponsor, and instructor workflows using Filament panels.

Tasks:

Learner Panel:

- Dashboard
- My Courses
- Course access detail
- Payment history
- Installments
- Receipts/invoices
- Profile
- Notifications
- Support tickets
- Community launch

Corporate Panel:

- Dashboard
- Company profile
- Team members
- Learner invitation
- Bulk upload
- Seat allocation
- Invoices
- Payments
- Enrollment status
- Reports
- Support

Instructor Panel:

- Dashboard
- Assigned cohorts
- Cohort detail
- Learners
- Attendance/session notes
- Resources
- Escalations

Deliverables:

- Role-specific Filament panels.
- Access control policies.
- Navigation per role.

Acceptance checks:

- Learners cannot access corporate/admin/instructor pages.
- Corporate users see only their company data.
- Instructors see only assigned cohorts.
- Admins can impersonate or inspect where policy allows.

## 10. Phase 6 - Discounts And Eligibility

Prompt:

Build the discount and eligibility engine, including public promo codes, private codes, email-list discounts, scholarships, corporate discounts, and audit logs.

Tasks:

- Create migrations/models for:
  - discount_rules
  - discount_codes
  - discount_eligibility_lists
  - discount_eligible_emails
  - discount_redemptions
  - scholarship_applications
  - scholarship_awards
- Build Filament resources.
- Implement CSV/Excel email upload.
- Normalize emails.
- Validate duplicates.
- Support discount types:
  - percentage
  - fixed amount
  - full scholarship
- Support constraints:
  - track
  - product
  - level
  - cohort
  - date range
  - global usage limit
  - per-user/email usage limit
  - installment compatibility
  - stackability setting
- Add checkout-side validation.
- Store discount snapshot on order.

Deliverables:

- Discount admin.
- Email-list upload.
- Checkout discount validation.
- Discount audit trail.

Acceptance checks:

- Expired discounts fail.
- Ineligible emails fail.
- Eligible emails pass.
- Discount is locked before Paystack initialization.
- Discount usage is visible in admin.

## 11. Phase 7 - Orders, Paystack, Installments, Refunds

Prompt:

Build the full order and payment flow with Paystack, including checkout, webhooks, installments, refunds, receipts, and manual payment fallback.

Tasks:

- Create/complete models:
  - orders
  - order_items
  - payments
  - payment_webhook_events
  - payment_plans
  - installments
  - invoices
  - receipts
- Build checkout pages:
  - details
  - discount
  - payment plan
  - review
  - pay
  - processing
  - success
  - failed
  - pending
- Implement Paystack transaction initialize.
- Implement Paystack transaction verify.
- Implement webhook endpoint.
- Make webhook idempotent.
- Add manual payment workflow.
- Add installment reminders.
- Add refund/cancellation workflow.
- Generate receipts/invoices.

Deliverables:

- Paystack checkout.
- Payment verification.
- Webhook handling.
- Installment support.
- Admin payment views.

Acceptance checks:

- Payment success creates paid order.
- Duplicate webhook does not duplicate enrollment/payment.
- Failed payment is visible.
- Installment schedule is created correctly.
- Refund/cancellation can trigger access suspension policy.

## 12. Phase 8 - Moodle Integration

Prompt:

Build the Moodle Connection Manager and payment-to-Moodle enrollment automation. Moodle remains the LMS. Laravel controls who gets access.

Tasks:

- Create models:
  - moodle_connections
  - moodle_courses
  - moodle_categories
  - moodle_groups
  - lms_accounts
  - lms_course_mappings
  - lms_sync_logs
  - lms_api_logs
- Build Filament Moodle pages:
  - connection
  - health
  - imported courses
  - categories
  - groups/cohorts
  - mappings
  - sync logs
  - API logs
  - failed enrollments
  - reconciliation
- Add test connection action.
- Import courses/categories/groups.
- Map SKILLUP product/cohort to Moodle course/group.
- Create/find Moodle user.
- Enroll user.
- Suspend/unenroll user.
- Add retryable jobs.
- Add reconciliation jobs.
- Log every API request summary.

Deliverables:

- Moodle connection manager.
- Course import.
- Product-to-course mapping.
- Payment-to-enrollment automation.
- Failed enrollment retry.

Acceptance checks:

- Admin can test Moodle connection.
- Admin can import Moodle courses.
- Admin can map product to Moodle course.
- Paid order enrolls learner in Moodle.
- Failed enrollment is logged and retryable.

## 13. Phase 9 - Notifications, Email, WhatsApp

Prompt:

Build the notification system. Every important in-app notification should trigger a queued email through ZeptoMail, with Amazon SES as backup. WhatsApp is for authentication and critical alerts only.

Tasks:

- Create models:
  - notifications
  - notification_events
  - email_templates
  - email_messages
  - email_delivery_logs
  - whatsapp_messages
  - whatsapp_delivery_logs
- Configure ZeptoMail mailer.
- Configure Amazon SES backup mailer.
- Configure WhatsApp Business/Cloud API placeholders.
- Build notification event registry.
- Build template management in admin.
- Build queue jobs.
- Add failover logic from ZeptoMail to SES.
- Add WhatsApp templates for:
  - OTP/auth
  - security alerts
  - urgent failed payment
  - urgent installment reminder
  - Moodle access failure
- Add delivery logs.
- Add retry actions.

Deliverables:

- In-app notification center.
- Email sending through ZeptoMail.
- SES backup.
- WhatsApp critical-alert workflow.
- Admin logs and retries.

Acceptance checks:

- Important in-app notification creates email job.
- ZeptoMail sends primary email.
- SES fallback can be triggered safely.
- WhatsApp is not used for every notification.
- Failed delivery is visible in admin.

## 14. Phase 10 - Discourse Community

Prompt:

Integrate Discourse as the community platform using SKILLUP as the identity and enrollment source of truth.

Tasks:

- Create models:
  - discourse_connections
  - discourse_groups
  - discourse_group_mappings
  - discourse_sync_logs
- Configure Discourse base URL.
- Configure Discourse SSO secret.
- Configure API key and username.
- Build Discourse admin pages:
  - connection
  - health
  - groups
  - categories
  - mappings
  - sync logs
  - SSO logs
- Implement DiscourseConnect/SSO endpoint.
- Require verified SKILLUP email before SSO.
- Map SKILLUP products/tracks/cohorts/alumni/corporate groups to Discourse groups/categories.
- Add learner launch links.
- Add group sync jobs.
- Add optional Discourse webhook endpoint.

Deliverables:

- Discourse SSO.
- Discourse group mapping.
- Learner community launch.
- Sync logs.

Acceptance checks:

- Logged-in verified learner can launch Discourse.
- Learner is assigned to correct group based on enrollment/cohort.
- Suspended/refunded learner loses appropriate group access.
- Discourse does not decide paid access.

## 15. Phase 11 - Content, Resources, Events

Prompt:

Build content, resources, events, and lead generation flows.

Tasks:

- Build admin resources for:
  - blog posts
  - blog categories
  - resources
  - resource categories
  - events/webinars
  - event registrations
  - event recordings
  - testimonials
  - partners
  - FAQs
  - navigation
  - media library
- Build public pages:
  - blog
  - article detail
  - resources
  - resource detail
  - events
  - event detail
  - community page
  - corporate page
- Add lead capture forms.
- Add email event triggers.

Deliverables:

- Content admin.
- Public content pages.
- Lead capture.

Acceptance checks:

- Content can be managed without code.
- Published content appears publicly.
- Lead captures are stored and routed.

## 16. Phase 12 - Support, Reports, Analytics, Exports

Prompt:

Build operational support and reporting surfaces.

Tasks:

- Build support ticket system.
- Build admin ticket management.
- Build form submission inbox.
- Build lead inbox.
- Build reports:
  - revenue
  - enrollments
  - product demand
  - payments
  - discounts
  - cohorts
  - support
  - email
  - WhatsApp
  - community
- Add export center.
- Add operational health dashboard.
- Add queue/job monitoring page or integration.

Deliverables:

- Support system.
- Reports.
- Exports.
- Operational health.

Acceptance checks:

- Admin can manage support tickets.
- Finance can export payments/revenue.
- Operations can see failed Moodle/payment/email jobs.
- Reports match available data.

## 17. Phase 13 - Future Modules

Prompt:

Implement future modules only after the core academy is stable.

Future modules:

- School/youth program
- Career center
- Portfolio/CV reviews
- Mock interviews
- Job board
- Employer portal
- Alumni directory
- Certificate builder and verification
- Ambassador/referral program

Acceptance rule:

Do not build these before the main learner enrollment, payment, Moodle, notification, community, and admin workflows are stable.

## 18. Phase 14 - Testing And Quality

Prompt:

Add automated and manual verification across all critical flows.

Required tests:

- Unit tests for pricing, discounts, eligibility, installments.
- Feature tests for checkout and payment verification.
- Webhook idempotency tests.
- Moodle service tests with mocked responses.
- Notification/email job tests.
- Discourse SSO tests.
- Role/policy tests.
- Filament resource access tests where practical.
- Browser/manual test checklist for public pages and checkout.

Manual QA checklist:

- Public pages render on mobile and desktop.
- Course catalogue filters work.
- Product publish/hide works.
- Checkout is clear and calm.
- Promo code works.
- Email-list discount works.
- Paystack test payment works.
- Payment webhook is idempotent.
- Moodle enrollment succeeds.
- Failed enrollment is retryable.
- ZeptoMail sends email.
- SES fallback is configured.
- WhatsApp critical alert path is logged.
- Discourse SSO works.
- Role boundaries are enforced.
- Reduced motion is respected.

## 19. Phase 15 - Deployment And Cutover

Prompt:

Prepare the Laravel platform for production deployment and safe migration away from WordPress/WooCommerce and standalone Next.js.

Tasks:

- Prepare production `.env`.
- Configure queue workers.
- Configure scheduler.
- Configure storage.
- Configure backups.
- Configure domain and SSL.
- Configure ZeptoMail, SES, Paystack, Moodle, WhatsApp, and Discourse credentials.
- Run migrations.
- Seed required roles/settings.
- Run tests.
- Run smoke tests.
- Keep current site available until cutover is approved.
- Switch enrollment links to Laravel.
- Disable WooCommerce checkout.
- Monitor:
  - payments
  - webhooks
  - Moodle enrollments
  - emails
  - WhatsApp logs
  - Discourse SSO
  - queues
  - support tickets

Deliverables:

- Production-ready Laravel app.
- Cutover checklist.
- Post-launch monitoring checklist.

Acceptance checks:

- No secrets committed.
- Queue and scheduler are running.
- Payment-to-Moodle flow works in production.
- Admin can recover failed enrollment.
- Users can access courses and community.

## 20. Suggested First Agent Task

Start with this prompt:

```text
Read SKILLUP_Platform_Application_Plan.md, SKILLUP_Full_App_Page_Map.md, and SKILLUP_AI_AGENT_IMPLEMENTATION_PROMPT.md. Inspect the existing Next.js app. Do not edit code yet. Produce a concise implementation plan for Phase 0 and Phase 1, including the Laravel setup strategy, files/pages/components to port, toolchain requirements, and risks.
```

After that plan is approved, use this prompt:

```text
Proceed with Phase 1: create the Laravel foundation with Inertia + React, Tailwind, shadcn/ui-ready structure, Filament, auth, base roles, queue configuration, and .env.example placeholders. Preserve the existing Next.js app as reference. Verify the app boots and provide a summary of files changed and tests run.
```

