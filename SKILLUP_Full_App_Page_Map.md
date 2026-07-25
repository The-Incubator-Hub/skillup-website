# SKILLUP Full Application Page Map

Status: Draft for stakeholder review
Date: 2026-07-13
Scope: Full Laravel + Inertia + React + Filament application, beyond MVP.

## 1. Purpose

This document defines the full page map for the SKILLUP application. It covers the complete product vision, not only the first MVP release.

The application is split into these major surfaces:

- Public website: Inertia + React
- Checkout and enrollment: Inertia + React
- Learner portal: Filament Learner Panel, with Inertia where stronger brand/custom UX is needed
- Corporate portal: Filament Corporate Panel
- Instructor portal: Filament Instructor Panel
- Admin portal: Filament Admin Panel
- Community: Discourse, launched through SKILLUP SSO
- Moodle delivery: external Moodle portal, launched from SKILLUP

Moodle remains the learning delivery engine. SKILLUP owns discovery, registration, payment, discounts, products, enrollment, notifications, support, reporting, and operational control.
Discourse owns community discussions, cohort groups, announcements, and peer support. WhatsApp is reserved for authentication and high-priority transactional alerts alongside email.

## 2. Route Principles

- Public pages should be readable, SEO-friendly, and brand-heavy.
- Authenticated dashboards should prioritize speed, clarity, and task completion.
- Admin pages should prioritize reliability, filters, auditability, exports, imports, and retry actions.
- Payment, discount, and Moodle enrollment pages must be server-validated.
- Products, tracks, levels, prices, cohorts, and Moodle mappings should be created from admin and reflected on public pages automatically.

Suggested route conventions:

- Public website: `/...`
- Learner portal: `/app/...`
- Corporate portal: `/company/...`
- Instructor portal: `/instructor/...`
- Admin portal: `/admin/...`
- API/webhooks: `/api/...` or Laravel route groups

## 3. Public Website Pages

These pages are built with Inertia + React.

| Page | Suggested Route | Purpose |
|---|---|---|
| Homepage | `/` | Main brand, value proposition, track discovery, CTAs, testimonials, partners, FAQs |
| About | `/about` | Story, mission, vision, team, credibility |
| Courses Catalogue | `/courses` | Dynamic catalogue of published products/tracks/levels |
| Course Search | `/courses/search` | Search and filter courses by track, level, price, schedule, delivery mode |
| Track Detail | `/courses/{trackSlug}` | Track overview, levels, outcomes, tools, career path, FAQs |
| Level/Product Detail | `/courses/{trackSlug}/{productSlug}` | Sellable product page with syllabus, price, cohort dates, Moodle mapping output, CTA |
| Course Comparison | `/courses/compare` | Compare tracks, levels, pricing, outcomes, duration |
| Find Your Track | `/find-your-track` | Guided quiz to recommend a track and level |
| Pricing | `/pricing` | Pricing overview, installment explanation, scholarship/discount notes |
| Installments | `/installments` | How installment plans work, payment timelines, access policy |
| Scholarships | `/scholarships` | Scholarship/financial aid information and application CTA |
| Corporate Training | `/corporate` | Team packages, corporate benefits, enquiry CTA |
| Corporate Quote Request | `/corporate/request-quote` | Public corporate lead form |
| Instructors/Mentors | `/mentors` | Instructor profiles, credibility, social proof |
| Success Stories | `/success-stories` | Testimonials, learner outcomes, case studies |
| Partners | `/partners` | Partner logos, partnership value, enquiry CTA |
| Community | `/community` | Community value, events, groups, join CTA |
| Community Launch | `/community/launch` | Auth-aware launch into Discourse through SSO |
| Community Guidelines | `/community/guidelines` | Community rules before entering Discourse |
| Events/Webinars | `/events` | Upcoming webinars, AMAs, workshops |
| Event Detail | `/events/{eventSlug}` | Event description, speaker, registration CTA, recording if available |
| Resources Library | `/resources` | Free downloads, guides, templates, lead magnets |
| Resource Detail | `/resources/{resourceSlug}` | Resource landing page, email-gated download |
| Blog | `/blog` | SEO articles and announcements |
| Blog Category | `/blog/category/{categorySlug}` | Filtered blog category archive |
| Blog Article | `/blog/{postSlug}` | Article content, track CTAs, related resources |
| FAQ | `/faq` | Public frequently asked questions |
| Contact | `/contact` | General enquiry form, support routing, WhatsApp CTA |
| Certificate Verification | `/certificates/verify` | Public certificate lookup by certificate ID or learner code |
| Certificate Result | `/certificates/verify/{code}` | Verification result page |
| Referral Landing | `/r/{referralCode}` | Referral attribution landing page |
| Promo Campaign Landing | `/campaigns/{campaignSlug}` | Campaign-specific landing pages for ads/events/partners |
| Coming Soon Track | `/courses/{trackSlug}/coming-soon` | Waitlist page for upcoming tracks |
| Newsletter Signup | `/newsletter` | Email capture and preferences |

## 4. Legal And Policy Pages

These can be Inertia + React or Blade if very plain.

| Page | Suggested Route | Purpose |
|---|---|---|
| Terms of Service | `/terms` | Platform usage terms |
| Privacy Policy | `/privacy` | NDPR/GDPR-aligned privacy policy |
| Refund Policy | `/refund-policy` | Refunds, cancellations, access suspension |
| Cookie Policy | `/cookie-policy` | Cookie and tracking notice |
| Data Retention | `/data-retention` | Learner data lifecycle and retention |
| Acceptable Use | `/acceptable-use` | Platform and community behavior rules |
| Accessibility | `/accessibility` | Accessibility commitment |

## 5. Auth And Account Entry Pages

These are Laravel auth pages, styled to match the application. They may be Inertia + React.

| Page | Suggested Route | Purpose |
|---|---|---|
| Login | `/login` | Learner/admin/corporate/instructor login entry |
| Register | `/register` | Learner account creation |
| Corporate Register | `/corporate/register` | Corporate account onboarding |
| Instructor Invite Accept | `/instructor/invite/{token}` | Instructor account setup from invite |
| Forgot Password | `/forgot-password` | Request reset link |
| Reset Password | `/reset-password/{token}` | Set new password |
| Verify Email | `/email/verify` | Email verification notice |
| Verify Email Handler | `/email/verify/{id}/{hash}` | Verification callback |
| Two-Factor Challenge | `/two-factor-challenge` | Optional security challenge |
| Onboarding | `/onboarding` | First-login learner setup |
| Account Type Router | `/account/redirect` | Redirects user to correct panel after login |

## 6. Checkout And Enrollment Pages

These are high-control Inertia + React pages.

| Page | Suggested Route | Purpose |
|---|---|---|
| Checkout Start | `/checkout/{productSlug}` | Product summary, account check, CTA |
| Checkout Details | `/checkout/{productSlug}/details` | Learner details, phone, billing details |
| Discount Apply | `/checkout/{productSlug}/discount` | Promo/email eligibility validation |
| Payment Plan Select | `/checkout/{productSlug}/payment-plan` | Full payment vs installment choice |
| Payment Review | `/checkout/{productSlug}/review` | Final price, discount, installment terms, policy consent |
| Paystack Redirect/Initialize | `/checkout/{orderUuid}/pay` | Initialize Paystack transaction |
| Payment Processing | `/checkout/{orderUuid}/processing` | Transaction status check |
| Payment Success | `/checkout/{orderUuid}/success` | Payment success, enrollment queued, next steps |
| Payment Failed | `/checkout/{orderUuid}/failed` | Failure reason, retry CTA |
| Payment Pending | `/checkout/{orderUuid}/pending` | Bank transfer/card pending state |
| Enrollment Creating | `/checkout/{orderUuid}/enrollment` | Moodle provisioning progress |
| Enrollment Complete | `/checkout/{orderUuid}/complete` | Moodle access ready |
| Manual Payment Instructions | `/checkout/{orderUuid}/manual-payment` | Manual transfer fallback instructions |
| Installment Pay Link | `/pay/installment/{installmentUuid}` | Pay an outstanding installment |
| Receipt Public View | `/receipts/{receiptUuid}` | Secure receipt/invoice page |
| Scholarship Application | `/scholarships/apply` | Financial-aid application form |
| Scholarship Result | `/scholarships/applications/{applicationUuid}` | Application status page |

## 7. Learner Portal Pages

Primary surface: Filament Learner Panel. Use Inertia + React only for pages needing more custom brand/interactivity.

| Page | Suggested Route | Purpose |
|---|---|---|
| Learner Dashboard | `/app` | Active courses, payments, notifications, next actions |
| My Courses | `/app/courses` | Enrolled products and Moodle launch links |
| Course Access Detail | `/app/courses/{enrollmentUuid}` | Enrollment status, Moodle course link, cohort info |
| Continue Learning | `/app/continue` | Resume latest Moodle course |
| Course Recommendations | `/app/recommendations` | Suggested next levels/tracks |
| Payment History | `/app/payments` | Payments and order list |
| Payment Detail | `/app/payments/{paymentUuid}` | Payment status, provider reference, receipt |
| Installments | `/app/installments` | Active payment plans and next due dates |
| Installment Detail | `/app/installments/{installmentUuid}` | Payment schedule and pay CTA |
| Receipts/Invoices | `/app/receipts` | Downloadable receipts and invoices |
| Discounts/Scholarships | `/app/discounts` | Active scholarship/discount awards |
| Certificates | `/app/certificates` | Issued certificates and verification links |
| Certificate Detail | `/app/certificates/{certificateUuid}` | Certificate metadata and share link |
| Profile | `/app/profile` | Personal details |
| Account Settings | `/app/settings` | Password, email, notification preferences |
| Notification Center | `/app/notifications` | In-app notifications mirrored by email |
| Support Tickets | `/app/support` | Learner support ticket list |
| New Support Ticket | `/app/support/new` | Create support request |
| Support Ticket Detail | `/app/support/{ticketUuid}` | Support thread and status |
| Community Access | `/app/community` | Discourse launch, cohort/category links, community status |
| Events | `/app/events` | Registered/upcoming events |
| Event Detail | `/app/events/{eventUuid}` | Event access and reminders |
| Resources | `/app/resources` | Learner resource access |
| Referral Dashboard | `/app/referrals` | Referral code, link, attribution, rewards |
| Data And Privacy | `/app/privacy` | Export/delete/request data actions |

## 8. Corporate Portal Pages

Primary surface: Filament Corporate Panel.

| Page | Suggested Route | Purpose |
|---|---|---|
| Corporate Dashboard | `/company` | Seats, invoices, learners, progress summary |
| Company Profile | `/company/profile` | Company details and billing profile |
| Team Members | `/company/team` | Corporate learners and admins |
| Invite Learners | `/company/team/invite` | Invite employees/learners |
| Bulk Upload Learners | `/company/team/upload` | CSV/Excel learner upload |
| Seat Allocation | `/company/seats` | Purchased seats and assignment |
| Corporate Products | `/company/products` | Available team training products |
| Corporate Enrollment | `/company/enrollments` | Team enrollments and Moodle sync status |
| Learner Progress | `/company/progress` | Progress summaries where Moodle sync supports it |
| Invoices | `/company/invoices` | Corporate billing documents |
| Invoice Detail | `/company/invoices/{invoiceUuid}` | Invoice status and payment instructions |
| Payments | `/company/payments` | Corporate payment history |
| Support | `/company/support` | Corporate support tickets |
| Reports | `/company/reports` | Export learner/progress/payment reports |
| Settings | `/company/settings` | Notification, access, billing settings |

## 9. Instructor / Mentor Portal Pages

Primary surface: Filament Instructor Panel.

| Page | Suggested Route | Purpose |
|---|---|---|
| Instructor Dashboard | `/instructor` | Assigned cohorts, learner flags, upcoming sessions |
| Assigned Cohorts | `/instructor/cohorts` | Cohort list |
| Cohort Detail | `/instructor/cohorts/{cohortUuid}` | Learners, schedule, notes, Moodle links |
| Learners | `/instructor/learners` | Assigned learner list |
| Learner Detail | `/instructor/learners/{learnerUuid}` | Learner profile, progress, support notes |
| Session Calendar | `/instructor/sessions` | Upcoming sessions and attendance |
| Session Detail | `/instructor/sessions/{sessionUuid}` | Session notes, attendance, resources |
| Attendance | `/instructor/attendance` | Attendance tracking |
| Resources | `/instructor/resources` | Resources assigned to cohorts |
| Escalations | `/instructor/escalations` | Learners needing support |
| Messages/Announcements | `/instructor/announcements` | Cohort announcements |
| Profile | `/instructor/profile` | Instructor profile and availability |

## 10. Admin Portal Pages

Primary surface: Filament Admin Panel.

### 10.1 Admin Dashboard And Operations

| Page | Suggested Route | Purpose |
|---|---|---|
| Admin Dashboard | `/admin` | Revenue, enrollments, sync failures, open support, recent activity |
| Operational Health | `/admin/health` | Queues, mail, Moodle, Paystack, storage, cron health |
| Activity Feed | `/admin/activity` | Recent platform events |
| Audit Logs | `/admin/audit-logs` | Admin action history |
| System Settings | `/admin/settings` | General platform configuration |

### 10.2 User And Access Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Users | `/admin/users` | All users |
| User Detail | `/admin/users/{id}` | User profile, roles, orders, enrollments |
| Learners | `/admin/learners` | Learner management |
| Learner Detail | `/admin/learners/{id}` | Learner operations and history |
| Admin Users | `/admin/admin-users` | Internal staff users |
| Roles And Permissions | `/admin/roles` | Super Admin, Operations, Finance, Content/Program, Instructor/Mentor |
| Login/Security Events | `/admin/security-events` | Password resets, suspicious events, 2FA status |

### 10.3 Product Catalogue Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Products | `/admin/products` | Sellable courses/offers |
| Product Create | `/admin/products/create` | Create new product |
| Product Detail/Edit | `/admin/products/{id}/edit` | Product content, pricing, publishing |
| Product Preview | `/admin/products/{id}/preview` | Preview frontend product page |
| Tracks | `/admin/tracks` | Product Management, Software Development, Design, VA, Data, etc. |
| Levels | `/admin/levels` | Basic, Intermediate, Advanced |
| Cohorts | `/admin/cohorts` | Cohort dates, caps, delivery mode |
| Cohort Detail | `/admin/cohorts/{id}` | Learners, sessions, instructor assignment |
| Pricing | `/admin/prices` | Product prices and currency rules |
| Payment Plans | `/admin/payment-plans` | Installment rules and schedules |
| Product Media | `/admin/product-media` | Images, gallery, downloads |
| Product Visibility Rules | `/admin/product-visibility` | Featured, hidden, waitlist, sold-out |
| Product FAQs | `/admin/product-faqs` | Product-specific FAQ content |
| Product Publishing Queue | `/admin/product-publishing` | Products needing review before publish |

### 10.4 Moodle Integration Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Moodle Connection | `/admin/moodle/connection` | Base URL, token mode, service name, test connection |
| Moodle Health | `/admin/moodle/health` | Last sync, API failures, service status |
| Moodle Courses | `/admin/moodle/courses` | Imported Moodle courses |
| Moodle Categories | `/admin/moodle/categories` | Imported course categories |
| Moodle Groups/Cohorts | `/admin/moodle/groups` | Imported groups/cohorts where available |
| Moodle Mapping | `/admin/moodle/mappings` | Product-to-Moodle course/group mapping |
| Moodle Mapping Detail | `/admin/moodle/mappings/{id}` | Mapping rule detail |
| Manual Sync | `/admin/moodle/sync` | Trigger course/user/enrollment sync |
| Sync Logs | `/admin/moodle/sync-logs` | Scheduled/manual sync history |
| API Logs | `/admin/moodle/api-logs` | Request/response summaries |
| Failed Enrollments | `/admin/moodle/failed-enrollments` | Retry or resolve enrollment failures |
| Reconciliation | `/admin/moodle/reconciliation` | Compare SKILLUP enrollment state with Moodle |

### 10.5 Enrollment Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Enrollments | `/admin/enrollments` | All enrollments |
| Enrollment Detail | `/admin/enrollments/{id}` | Order, learner, Moodle state, logs |
| Manual Enrollment | `/admin/enrollments/create` | Admin-created enrollment |
| Bulk Enrollment | `/admin/enrollments/bulk` | Upload learners and enroll in product/cohort |
| Suspensions | `/admin/enrollments/suspensions` | Payment/refund/manual access suspensions |
| Enrollment Retry Queue | `/admin/enrollments/retry-queue` | Failed jobs and retry actions |

### 10.6 Orders, Payments, Billing

| Page | Suggested Route | Purpose |
|---|---|---|
| Orders | `/admin/orders` | All orders |
| Order Detail | `/admin/orders/{id}` | Items, discounts, payment, enrollment state |
| Payments | `/admin/payments` | Payment records |
| Payment Detail | `/admin/payments/{id}` | Provider reference, amount, logs |
| Paystack Webhooks | `/admin/payments/webhooks` | Raw webhook events |
| Refunds | `/admin/refunds` | Refund requests and completed refunds |
| Manual Payments | `/admin/manual-payments` | Bank transfer/manual verification |
| Installments | `/admin/installments` | Installment plans and statuses |
| Overdue Installments | `/admin/installments/overdue` | Missed payment actions |
| Invoices/Receipts | `/admin/invoices` | Learner/corporate invoices |
| Revenue Reports | `/admin/reports/revenue` | Revenue by product, track, cohort, period |

### 10.7 Discounts, Scholarships, Referrals

| Page | Suggested Route | Purpose |
|---|---|---|
| Discount Rules | `/admin/discounts` | All discount rules |
| Discount Create | `/admin/discounts/create` | Create promo/eligibility discount |
| Discount Detail | `/admin/discounts/{id}` | Conditions, usage, status |
| Promo Codes | `/admin/promo-codes` | Code generation and usage |
| Email Eligibility Lists | `/admin/eligibility-lists` | Uploaded CSV/Excel email lists |
| Eligibility List Detail | `/admin/eligibility-lists/{id}` | Emails, duplicates, usage |
| Scholarship Applications | `/admin/scholarships` | Review/approve/deny scholarships |
| Scholarship Awards | `/admin/scholarship-awards` | Awarded financial aid |
| Referral Programs | `/admin/referrals/programs` | Referral campaign settings |
| Referral Redemptions | `/admin/referrals/redemptions` | Referral attribution and rewards |
| Discount Impact Report | `/admin/reports/discounts` | Revenue impact by discount/campaign |

### 10.8 Corporate Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Corporate Accounts | `/admin/corporate/accounts` | Companies and sponsors |
| Corporate Detail | `/admin/corporate/accounts/{id}` | Seats, learners, invoices, contacts |
| Corporate Enquiries | `/admin/corporate/enquiries` | Public corporate leads |
| Corporate Quotes | `/admin/corporate/quotes` | Quote creation and status |
| Corporate Learners | `/admin/corporate/learners` | Learners under company accounts |
| Seat Management | `/admin/corporate/seats` | Seat purchases and allocation |
| Corporate Reports | `/admin/reports/corporate` | Corporate revenue/progress reports |

### 10.9 Content, Resources, Events

| Page | Suggested Route | Purpose |
|---|---|---|
| Pages | `/admin/content/pages` | Basic managed content pages |
| Blog Posts | `/admin/content/blog` | Blog CRUD |
| Blog Categories | `/admin/content/blog-categories` | Category management |
| Resources | `/admin/content/resources` | Downloadable resources and lead magnets |
| Resource Categories | `/admin/content/resource-categories` | Resource taxonomy |
| Events/Webinars | `/admin/events` | Event CRUD |
| Event Registrations | `/admin/events/registrations` | Registrant management |
| Event Recordings | `/admin/events/recordings` | Recording links and access |
| Testimonials | `/admin/content/testimonials` | Social proof content |
| Partners | `/admin/content/partners` | Partner logos and pages |
| FAQs | `/admin/content/faqs` | Global and product FAQs |
| Navigation | `/admin/content/navigation` | Menu structure |
| Media Library | `/admin/content/media` | Uploaded media |

### 10.10 Notifications, Email, And WhatsApp

| Page | Suggested Route | Purpose |
|---|---|---|
| Notification Templates | `/admin/notifications/templates` | In-app notification templates |
| Email Templates | `/admin/email/templates` | ZeptoMail/SES transactional templates |
| WhatsApp Templates | `/admin/whatsapp/templates` | Critical WhatsApp template catalogue/status |
| Notification Events | `/admin/notifications/events` | Event registry and trigger rules |
| Email Messages | `/admin/email/messages` | Sent/queued email records |
| Delivery Logs | `/admin/email/delivery-logs` | Provider responses and retries |
| Failed Email Queue | `/admin/email/failed` | Retry failed transactional emails |
| Provider Settings | `/admin/email/providers` | ZeptoMail/SES env status and health |
| WhatsApp Messages | `/admin/whatsapp/messages` | Sent/queued WhatsApp messages |
| WhatsApp Delivery Logs | `/admin/whatsapp/delivery-logs` | WhatsApp provider responses and retries |
| Failed WhatsApp Queue | `/admin/whatsapp/failed` | Retry failed critical WhatsApp messages |
| Announcement Broadcasts | `/admin/notifications/broadcasts` | Admin-created notices to learners/cohorts |

### 10.11 Discourse Community Management

| Page | Suggested Route | Purpose |
|---|---|---|
| Discourse Connection | `/admin/discourse/connection` | Discourse URL, SSO secret mode, API credentials, test connection |
| Discourse Health | `/admin/discourse/health` | SSO/API status and last sync |
| Discourse Groups | `/admin/discourse/groups` | Imported or configured Discourse groups |
| Discourse Categories | `/admin/discourse/categories` | Imported or configured categories |
| Discourse Mappings | `/admin/discourse/mappings` | Map SKILLUP tracks/cohorts/products/alumni/corporate groups to Discourse groups/categories |
| Discourse Sync Logs | `/admin/discourse/sync-logs` | Group membership and account sync logs |
| Discourse SSO Logs | `/admin/discourse/sso-logs` | SSO attempt logs and failures |

### 10.12 Support And Forms

| Page | Suggested Route | Purpose |
|---|---|---|
| Support Tickets | `/admin/support/tickets` | All support tickets |
| Ticket Detail | `/admin/support/tickets/{id}` | Ticket thread and actions |
| Ticket Categories | `/admin/support/categories` | Billing, Moodle, course, access, corporate |
| Form Submissions | `/admin/forms/submissions` | Public forms and lead captures |
| Lead Inbox | `/admin/leads` | Leads from forms/resources/events |
| Lead Detail | `/admin/leads/{id}` | Lead source, status, routing |

### 10.13 Reports And Analytics

| Page | Suggested Route | Purpose |
|---|---|---|
| Analytics Overview | `/admin/reports` | Core KPIs |
| Enrollment Reports | `/admin/reports/enrollments` | Enrollment by track, level, cohort |
| Product Demand Report | `/admin/reports/products` | Product views, checkout starts, purchases |
| Learner Completion Report | `/admin/reports/completion` | Moodle completion data if synced |
| Payment Reports | `/admin/reports/payments` | Payment success/failure, installments |
| Discount Reports | `/admin/reports/discounts` | Discount usage and impact |
| Cohort Reports | `/admin/reports/cohorts` | Cohort health and attendance |
| Support Reports | `/admin/reports/support` | Ticket volume and resolution |
| Email Reports | `/admin/reports/email` | Delivery success/failure |
| WhatsApp Reports | `/admin/reports/whatsapp` | Critical alert delivery success/failure |
| Community Reports | `/admin/reports/community` | Discourse signup/group/activity summaries if synced |
| Export Center | `/admin/reports/exports` | CSV/Excel exports |

## 11. Future Expansion Pages

These are not MVP, but they belong to the full application vision.

### 11.1 School / Youth Program

| Page | Suggested Route | Purpose |
|---|---|---|
| AI Secondary Public Page | `/schools` | Public school program landing page |
| School Application | `/schools/apply` | School partnership application |
| Parent Consent | `/schools/consent/{token}` | Guardian consent workflow |
| School Portal Dashboard | `/school` | School account dashboard |
| School Students | `/school/students` | Student list and bulk upload |
| School Reports | `/school/reports` | School-level progress reports |
| Facilitator Assignments | `/admin/schools/facilitators` | Assign facilitators to schools |
| School Admin Management | `/admin/schools` | School accounts, applications, reporting |

### 11.2 Career Center

| Page | Suggested Route | Purpose |
|---|---|---|
| Career Center | `/career-center` | Career support hub |
| Portfolio Reviews | `/app/career/portfolio-reviews` | Learner portfolio review requests |
| CV Reviews | `/app/career/cv-reviews` | CV/resume review workflow |
| Mock Interviews | `/app/career/mock-interviews` | Interview scheduling |
| Job Board | `/jobs` | Public/learner job listings |
| Job Detail | `/jobs/{jobSlug}` | Job information and apply CTA |
| Employer Portal | `/employer` | Employer account dashboard |
| Employer Jobs | `/employer/jobs` | Employer job posting management |
| Admin Job Board | `/admin/jobs` | Admin job moderation |

### 11.3 Alumni And Community

| Page | Suggested Route | Purpose |
|---|---|---|
| Alumni Public Page | `/alumni` | Alumni stories and network |
| Alumni Directory | `/app/alumni` | Learner/alumni directory |
| Discourse Alumni Launch | `/app/community/alumni` | Launch alumni space in Discourse |
| Discourse Cohort Launch | `/app/community/cohorts/{cohortUuid}` | Launch specific cohort space in Discourse |
| Internal Community Feed | `/app/community/feed` | Deferred; only build if Discourse is replaced or extended |
| Internal Community Groups | `/app/community/groups` | Deferred; Discourse groups are primary |
| Admin Community Moderation | `/admin/community/moderation` | Deferred unless moderation is mirrored from Discourse |

### 11.4 Certificate And Credential Expansion

| Page | Suggested Route | Purpose |
|---|---|---|
| Certificate Builder | `/admin/certificates/templates` | Certificate template management |
| Certificate Issuance | `/admin/certificates/issuance` | Issue/reissue certificates |
| Public Credential Page | `/credentials/{credentialCode}` | Shareable credential page |
| Learner Credential Wallet | `/app/credentials` | All certificates/badges |

### 11.5 Affiliate And Ambassador Program

| Page | Suggested Route | Purpose |
|---|---|---|
| Ambassador Landing | `/ambassadors` | Public ambassador program |
| Ambassador Application | `/ambassadors/apply` | Application form |
| Ambassador Dashboard | `/ambassador` | Referral/commission dashboard |
| Ambassador Links | `/ambassador/links` | Campaign links |
| Ambassador Payouts | `/ambassador/payouts` | Payout status |
| Admin Ambassadors | `/admin/ambassadors` | Application/reward management |

## 12. Non-Page System Endpoints

These are not user-facing pages, but the app needs them.

| Endpoint/Area | Suggested Route | Purpose |
|---|---|---|
| Paystack Webhook | `/webhooks/paystack` | Payment events |
| ZeptoMail Webhook | `/webhooks/zeptomail` | Delivery/bounce events if used |
| SES Webhook | `/webhooks/ses` | Backup provider delivery/bounce events |
| WhatsApp Webhook | `/webhooks/whatsapp` | WhatsApp delivery/status events |
| Discourse SSO Endpoint | `/discourse/sso` | DiscourseConnect SSO handler |
| Discourse Webhook | `/webhooks/discourse` | Optional community event sync |
| Moodle Sync Scheduler | Console command | Scheduled import/reconciliation |
| Notification Queue Worker | Queue worker | In-app notification, email, and WhatsApp dispatch |
| Discourse Sync Worker | Queue worker | Community group/account sync |
| Enrollment Queue Worker | Queue worker | Moodle account creation/enrollment |
| Report Exports | Background jobs | CSV/Excel export generation |
| Health Check | `/health` | Deployment/runtime health |
| Sitemap | `/sitemap.xml` | SEO sitemap |
| Robots | `/robots.txt` | Search crawler rules |

## 13. Page Ownership By Role

| Role | Primary Pages |
|---|---|
| Public visitor | Public website, resources, blog, events, course pages, checkout start |
| Learner | Learner portal, checkout, payments, Moodle access, support, notifications |
| Corporate sponsor | Corporate portal, team seats, invoices, reports |
| Instructor/Mentor | Instructor portal, cohorts, learners, attendance, notes |
| Super Admin | All admin pages, settings, roles, Moodle, payments, products |
| Operations Manager | Learners, enrollments, Moodle sync failures, support, cohorts |
| Finance Manager | Orders, payments, refunds, installments, invoices, discounts |
| Content & Program Manager | Products, tracks, levels, cohorts, resources, events, blog |
| Instructor/Mentor admin role | Assigned cohorts, learners, attendance, notes, resources |

## 14. Implementation Priority

Suggested build order:

1. Public site shell and product catalogue.
2. Auth and learner portal foundation.
3. Product admin and publishing workflow.
4. Checkout, Paystack, discounts, orders, installments.
5. Moodle Connection Manager and enrollment sync.
6. Notification system with ZeptoMail primary, SES backup, and WhatsApp critical alerts.
7. Discourse SSO and group/category mapping.
8. Support tickets and operational dashboards.
9. Corporate portal and bulk enrollment.
10. Instructor portal and cohort operations.
11. Reporting and exports.
12. Future modules: schools, career center, alumni/community, certificates, ambassadors.
