(() => {
  const pageConfig = window.SkillUpPage || { page: "home", base: "" };
  const page = pageConfig.page || "home";
  const base = pageConfig.base || "";
  const applicationPath = "skillup-plus/";
  const formSheets = {
    skillUpPlus: "SkillUp Plus Applications",
    contact: "Contact Messages",
  };

  const path = (target = "") => {
    if (/^(https?:|mailto:|tel:|#)/.test(target)) return target;
    return `${base}${target.replace(/^\/+/, "")}`;
  };

  const asset = (target) => path(target);

  const icon = (name) => {
    const icons = {
      menu: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
      x: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
      clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      bookmark: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
      external: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
      check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m20 6-11 11-5-5"/></svg>',
      users: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      globe: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></svg>',
      briefcase: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 12h18"/></svg>',
      folder: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
      monitor: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
      light: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-.7.6-1 1.4-1 2H9c0-.6-.3-1.4-1-2Z"/></svg>',
      file: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></svg>',
      laptop: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 20h20"/></svg>',
      shield: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
      mail: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      phone: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.7 2.77a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.3-1.26a2 2 0 0 1 2.11-.45c.88.35 1.81.57 2.77.7A2 2 0 0 1 22 16.92z"/></svg>',
      map: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      video: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 9 4-3v12l-4-3"/></svg>',
      award: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>',
      link: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>',
      left: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
      right: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
      star: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z"/></svg>',
    };
    return icons[name] || "";
  };

  const navLinks = [
    { href: "", label: "Home", key: "home" },
    { href: "about/", label: "About Us", key: "about" },
    { href: "tech-trybe/", label: "Tech Trybe", key: "tech-trybe" },
    { href: applicationPath, label: "SkillUp Plus", key: "skillup-plus" },
    { href: "contact/", label: "Contact us", key: "contact" },
  ];

  const coursesData = [
    {
      title: "Virtual Assistant Masterclass",
      description: "Learn how to become a high-earning Virtual Assistant with skills in scheduling, email management, content creation, and AI-powered productivity tools.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "\u20a6100,000",
      image: "public/images/Virtual Assistant.jpg",
    },
    {
      title: "AI/ML Intermediate Program",
      description: "Step into the future of work with intermediate-level Artificial Intelligence and Machine Learning skills.",
      lessons: "5 Live Projects",
      duration: "3 months",
      price: "\u20a6200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134134/AI_ML_Intermediate__bbn38u.jpg",
    },
    {
      title: "Project Management Essentials",
      description: "Learn Agile, Scrum, and digital collaboration platforms while working on real-world case studies.",
      lessons: "40 Lessons",
      duration: "12h 25mins",
      price: "\u20a6200,000",
      image: "public/images/Project Management.jpg",
    },
    {
      title: "Web Development Mastery",
      description: "Build responsive, user-friendly websites from scratch using HTML, CSS, JavaScript, and modern frameworks.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "\u20a6150,000",
      image: "public/images/Web Development.jpg",
    },
    {
      title: "Data Analysis & Visualization",
      description: "Work with real datasets, build dashboards, and develop problem-solving skills that employers seek worldwide.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "\u20a6200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134138/Data_Analysis_Visualization_j3ad4a.jpg",
    },
    {
      title: "Product Design & UX/UI",
      description: "Master the art of designing intuitive, user-focused digital products with Figma, design systems, and prototyping tools.",
      lessons: "5 Live Projects",
      duration: "3 Months",
      price: "\u20a6200,000",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134166/Product_Design_UX_UI_o357u2.jpg",
    },
  ];

  const programsData = [
    {
      title: "SkillUp Plus",
      description: "A structured 3-month programme for serious learners ready to build job-ready skills, complete practical projects, and grow with mentorship from SkillUp Edtech.",
      duration: "3 months",
      projects: "LMS learning + live sync sessions + capstone project",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134122/ai_now_wtzyup.jpg",
      waitlistCount: 828,
      href: applicationPath,
      action: "Apply Now",
      open: true,
    },
    {
      title: "Tech Trybe Bootcamp",
      description: "Master in-demand digital skills and gain hands-on experience that gets you job-ready. Perfect for beginners and career switchers who want to learn tech in Africa and compete on a global stage.",
      duration: "6 weeks",
      projects: "Practical, mentor-led sessions + project-based learning",
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134179/tribe_ycwxxg.jpg",
      waitlistCount: 32,
      href: "tech-trybe/",
      action: "Join Waitlist Now",
      open: false,
    },
  ];

  const testimonials = [
    ["Before joining SkillUp Edtech, I had no clear path into tech. The program's hands-on projects and mentorship gave me the skills and confidence to land my first data analyst role in less than six months. Learning tech in Africa has never felt this practical and empowering.", "Caroline Moren", "Data Analyst"],
    ["I went from being a self-taught coder struggling to get noticed, to a full-time developer with a global client base. SkillUp Edtech's digital skills bootcamp isn't just training, it's a career launchpad.", "Adebayo Kareem", "Frontend Developer"],
    ["The online tech training in Nigeria gave me real-world projects to showcase my skills. The community support and career guidance were game-changers for me.", "Chiamaka Eze", "Product Designer"],
    ["SkillUp Edtech connects you to the right people, tools, and opportunities. I didn't just learn, I became part of a pan-African network of innovators and tech leaders.", "Samuel Otieno", "Data Engineer"],
    ["I joined SkillUp Edtech to switch careers, and within weeks of completing the digital skills bootcamp, I landed my first digital marketing role. The blend of practical training and career support is unmatched in Africa.", "Funke Ajayi", "Digital Marketer"],
    ["The projects I built during SkillUp Edtech's online tech training in Nigeria impressed my future employer. I now work remotely for a tech company in Europe, proving that African talent can compete globally.", "Ahmed Musa", "Full Stack Developer"],
    ["SkillUp Edtech didn't just teach me data science, they gave me the portfolio, confidence, and connections to break into the industry. I'm proud to be part of a growing movement of tech talent in Africa.", "Linda Nwosu", "Data Scientist"],
    ["I had the passion but no roadmap. With SkillUp Edtech, I gained in-demand cybersecurity skills, real job placement support, and a pan-African community that pushes me to grow every day.", "David Mensah", "Cybersecurity Specialist"],
  ];

  const faqs = [
    ["What kind of courses are available on this platform?", "We offer a range of expert-led courses in tech, business, creative skills, and personal development tailored for learners at every level. From coding bootcamps to UI/UX design, data science, cybersecurity, and digital marketing, our programs are designed to grow tech talent in Africa and provide world-class online tech training in Nigeria."],
    ["Do I get a certificate after completing a course?", "Yes! Every learner who successfully completes a course receives an industry-recognized certificate. This helps you showcase your skills to employers and stand out in Africa's competitive digital job market."],
    ["Can I learn at my own pace?", "Absolutely. We provide flexible learning options so you can study at a pace that fits your schedule whether you're a full-time student, working professional, or career changer."],
    ["What payment methods do you accept?", "We accept payments via debit/credit cards, bank transfers, and popular mobile payment platforms across Africa. For some programs, installment plans are available to make our digital skills bootcamp even more accessible."],
    ["Will I have access to the course after I complete it?", "Yes. Once enrolled, you get lifetime access to your course materials, including updates and new resources, so you can revisit and refresh your skills anytime."],
    ["Are the courses mobile-friendly?", "Yes. Our learning platform is fully mobile-optimized, allowing you to access lessons, videos, and assignments on your phone, tablet, or laptop - perfect for learners on the go."],
    ["Can I get a refund if I don't like a course?", "We offer a satisfaction guarantee. If you're not happy with your course, you can request a refund within the first 7 days of enrollment, subject to our refund policy."],
  ];

  const historyContent = {
    years: {
      label: "SkillUp Warri",
      title: "SkillUp Warri",
      description: "The Warri Skill-Up Invasion series has become a flagship initiative for empowering young people in Nigeria's South-South region with future-ready skills. Featuring two different editions, participants took part in hands-on, action-based learning programs designed to provide not just technical skills, but also access to valuable resources, entrepreneurial tools, and professional networks.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Advanced our mission to grow tech talent in Africa",
        "Equipped participants to innovate, lead, and thrive in a digital-first world",
      ],
      stats: [["384", "students enrolled"], ["4", "Courses Offered"]],
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138215/Copy_of_IMG_2591_ecgb80.jpg",
    },
    phc: {
      label: "SkillUp PHC",
      title: "SkillUp Port Harcourt",
      description: "The SkillUp Port Harcourt brought together aspiring tech professionals and entrepreneurs from across Rivers State for an intensive week of training and empowerment. Participants engaged in hands-on, action-based learning programs designed to deliver practical digital skills, entrepreneurial resources, and access to valuable professional networks.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Advanced our mission to grow tech talent in Africa",
        "Equipped participants to innovate, lead, and thrive in a digital-first world",
      ],
      stats: [["117", "Students enrolled"], ["4", "Courses Offered"]],
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138228/3_chvd7f.jpg",
    },
    kaduna: {
      label: "SkillUp Redemption Camp",
      title: "SkillUp Redemption Camp",
      description: "The SkillUp Redemption Camp brought together hundreds of aspiring tech professionals for an intensive week of digital skills development. Hosted at the RECTEM Lecture Halls, Redemption Camp, the program created a vibrant learning environment where participants engaged in hands-on training, gained access to vital resources, and built connections with mentors and industry peers.",
      achievements: [
        "Delivered hands-on, action-based learning programs focused on digital skills and entrepreneurship",
        "Strengthened our mission to grow tech talent in Africa",
        "Provided participants with access to resources, networks, and mentorship opportunities",
        "Empowered attendees to innovate, lead, and thrive in a digital-first economy",
      ],
      stats: [["327", "Students enrolled"], ["4", "Courses Offered"]],
      image: "https://res.cloudinary.com/dq2jag0q6/image/upload/v1756138214/2_vg7ltj.jpg",
    },
  };

  const courseModules = [
    ["software-development", "Software Development", "Build scalable applications and master coding best practices."],
    ["data-science-and-analytics", "Data Science & Analytics", "Learn to analyze, visualize, and interpret data for real impact."],
    ["product-design", "Product Design (UI/UX)", "Design user-centered digital products with industry tools."],
    ["digital-marketing", "Digital Marketing", "Drive growth with digital campaigns and performance strategies."],
    ["projects", "Project Management", "Lead teams, manage sprints, and deliver impactful projects."],
  ];

  const skillUpFields = [
    {
      eyebrow: "Section 1",
      title: "Personal Information",
      description: "Help us identify you correctly and prepare your onboarding details.",
      fields: [
        ["fullName", "Full name", "text", true, "Enter your name as it should appear on your certificate"],
        ["gender", "Gender", "select", true, "", ["Female", "Male"]],
        ["email", "Email address", "email", true, "you@example.com", null, "We will use this for LMS onboarding and selection notifications."],
        ["phone", "Primary phone number", "tel", true, "+234..."],
        ["country", "Country", "text", true, "Nigeria"],
        ["location", "Local government, city, state/province", "text", true, "Ikeja, Lagos State"],
        ["ageRange", "Age range", "select", true, "", ["Under 15", "16 - 18", "18 - 21", "22 - 25", "26 - 29", "30 - 33", "34 - 37", "38 - 41", "42 - 45", "46+"]],
        ["occupation", "Current primary occupation", "select", true, "", ["Student", "Employed Full-Time", "Employed Part-Time", "Freelancer", "Unemployed / Job Seeker"]],
      ],
    },
    {
      eyebrow: "Section 2",
      title: "Course Selection",
      description: "Choose your preferred track and share your current skill baseline.",
      fields: [
        ["trainingTrack", "Preferred training track", "select", true, "", ["Cybersecurity", "Data Analysis", "Product Design", "Software Development", "AI for Professionals"]],
        ["competenceLevel", "Current competence level in your selected skill", "radio", true, "", ["1 - Absolute beginner", "2 - Basic awareness", "3 - Some practice", "4 - Comfortable with fundamentals", "5 - Advanced / built small projects"]],
        ["priorLearning", "Have you taken any prior courses, certifications, or self-study modules?", "radio", true, "", ["Yes, extensively", "Yes, a little bit", "No, this is my first time"]],
        ["previousExposure", "Briefly describe previous exposure or projects in this field", "textarea", true, 'Type "N/A" if this is your first exposure.'],
        ["portfolioLink", "Portfolio or work link", "url", false, "GitHub, Behance, LinkedIn, or Google Drive URL"],
      ],
    },
    {
      eyebrow: "Section 3",
      title: "Technical Readiness",
      description: "Confirm that you can access the tools needed for remote learning and project work.",
      fields: [
        ["computerAccess", "Do you have daily access to a functional laptop or desktop?", "radio", true, "", ["Yes, I personally own one", "Yes, but I borrow/share it", "No, I rely solely on a smartphone/tablet"]],
        ["operatingSystem", "What operating system does your primary computer run?", "select", true, "", ["Windows", "macOS", "Linux", "I do not have a computer"]],
        ["internetReliability", "How reliable is your daily internet access?", "radio", true, "", ["Highly reliable (Broadband/Wi-Fi)", "Moderately reliable (Mobile data)", "Unreliable / intermittent connection"]],
        ["powerBackup", "What is your secondary power/electricity backup plan?", "radio", true, "", ["Main grid only", "Generator / solar inverter backup", "Power bank for mobile/router + laptop battery power"]],
      ],
    },
    {
      eyebrow: "Section 4",
      title: "Availability",
      description: "SkillUp Plus requires steady weekly commitment through the full learning pipeline.",
      fields: [
        ["weeklyCommitment", "Can you dedicate 10-15 hours weekly for the next 3 months?", "radio", true, "", ["Yes, absolutely", "Unsure / depends on my work schedule", "No"]],
        ["liveSyncCommitment", "Can you attend one mandatory live sync contact session every week?", "radio", true, "", ["Yes, I will prioritize it", "No, I cannot attend live sessions"]],
        ["pipelineAvailability", "Are you available to complete the full 3-month pipeline without interruptions?", "radio", true, "", ["Yes, I am fully available", "No, I have major engagements coming up within this timeline"]],
      ],
    },
    {
      eyebrow: "Section 5",
      title: "Motivation & Commitment",
      description: "Share your intent and acknowledge the programme commitment structure.",
      fields: [
        ["primaryGoal", "What is your primary goal for joining SkillUp Plus?", "select", true, "", ["To switch career paths", "To gain practical skills for my current job", "To build a portfolio for freelance opportunities", "Personal interest / hobby"]],
        ["selectionReason", "Why should you be selected for this competitive slot?", "textarea", true, "Keep your answer within 150 words."],
        ["commitmentFee", "Do you understand and agree to the mandatory N25,000 commitment fee upon selection?", "radio", true, "", ["Yes, I am aware and ready to make the payment upon selection confirmation", "No, I cannot meet this commitment requirement"]],
      ],
    },
    {
      eyebrow: "Section 6",
      title: "Campaign Source & Declaration",
      description: "Tell us how you found the programme and confirm your application details.",
      fields: [
        ["discoverySource", "How did you first discover this training campaign?", "select", true, "", ["Social media sponsored ad", "Traditional media", "Word of mouth / referral", "WhatsApp status/broadcast link", "Email newsletter invitation"]],
        ["declaration", "I certify that all information provided is accurate, and I acknowledge that false information may result in immediate disqualification.", "checkbox", true],
      ],
    },
  ];

  const renderNav = () => `
    <nav class="site-nav" data-nav>
      <div class="container">
        <div class="nav-inner">
          <a class="brand" href="${path("")}" aria-label="Go to SkillUp Edtech home">
            <img src="${asset("public/images/skillUp.png")}" alt="SkillUp Edtech Logo">
          </a>
          <div class="nav-links">
            ${navLinks.map((item) => `<a class="nav-link ${item.key === page ? "active" : ""}" href="${path(item.href)}"${item.key === page ? ' aria-current="page"' : ""}>${item.label}</a>`).join("")}
          </div>
          <div class="nav-actions">
            <button class="btn btn-outline" type="button" data-coming-soon>Login</button>
            <a class="btn" href="${path(applicationPath)}">Apply Now</a>
          </div>
          <button class="nav-toggle" type="button" aria-label="Open main menu" aria-expanded="false" data-nav-toggle>${icon("menu")}</button>
        </div>
        <div class="mobile-panel" data-mobile-panel>
          <div class="mobile-links">
            ${navLinks.map((item) => `<a class="${item.key === page ? "active" : ""}" href="${path(item.href)}">${item.label}</a>`).join("")}
            <div class="mobile-actions">
              <button class="btn btn-outline" type="button" data-coming-soon>Login</button>
              <a class="btn" href="${path(applicationPath)}">Apply Now</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;

  const renderFooter = () => {
    const column = (title, links) => `
      <div>
        <h3>${title}</h3>
        <div class="footer-links">
          ${links.map((label) => `<a href="#">${label}</a>`).join("")}
        </div>
      </div>
    `;

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <img class="footer-logo" src="${asset("public/images/skillUp.png")}" alt="SkillUp Edtech Logo">
              <div class="social-row">
                <a class="social-link" href="https://www.facebook.com/skillupedtech" aria-label="Facebook">f</a>
                <a class="social-link" href="https://youtube.com/@theskillupedtech?si=LUIQ8mae_wX0tW88" aria-label="YouTube">Y</a>
                <a class="social-link" href="https://www.linkedin.com/company/theskillupglobal" aria-label="LinkedIn">in</a>
              </div>
            </div>
            ${column("Programs", ["Digital Skills Bootcamp", "Data Science & Analytics", "Web & App Development", "Cybersecurity Essentials", "UI/UX Design & Prototyping", "Digital Marketing"])}
            ${column("Explore", ["Learn Tech in Africa", "Online Tech Training Nigeria", "Career Pathways", "Success Stories", "Partner With Us", "Hire Tech Talent"])}
            ${column("Resources", ["Blog", "Student Guides", "Best Practices in Tech Learning", "Alumni Network", "Events & Webinars"])}
          </div>
        </div>
      </footer>
    `;
  };

  const renderLayout = (main, options = {}) => `
    ${renderNav()}
    ${main}
    ${options.chat ? `<a class="chat-button" href="${path("contact/")}" aria-label="Contact SkillUp Edtech"><img src="${asset("public/images/chat.png")}" alt=""></a>` : ""}
    ${options.popup ? renderPopup() : ""}
    ${renderFooter()}
  `;

  const renderPopup = () => `
    <div class="modal" data-popup aria-hidden="true">
      <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button class="modal-close" type="button" aria-label="Close popup" data-popup-close>&times;</button>
        <div class="popup-image">
          <img src="${asset("public/images/skillup-plus-popup-flyer.jpg")}" width="821" height="420" alt="SkillUp Plus programme flyer">
        </div>
        <div class="popup-copy">
          <p class="eyebrow">SkillUp Plus</p>
          <h2 id="popup-title">Apply for the next cohort</h2>
          <p>Build practical, job-ready skills through a 3-month learning pipeline with live sync sessions, LMS content, mentorship, and project work.</p>
          <a class="btn" href="${path(applicationPath)}">Start Application</a>
        </div>
      </div>
    </div>
  `;

  const renderCourseCard = (course) => `
    <article class="card">
      <div class="card-image">
        <img src="${asset(course.image)}" alt="${course.title}">
        <span class="badge-floating">${icon("clock")} Coming Soon</span>
        <span class="icon-button" aria-hidden="true">${icon("external")}</span>
      </div>
      <div class="card-body">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="meta-row">
          <span class="pill">${icon("bookmark")} ${course.lessons}</span>
          <span class="pill">${icon("clock")} ${course.duration}</span>
        </div>
        <div class="card-foot">
          <div class="price">${course.price}</div>
          <a class="btn btn-ghost" href="${path(applicationPath)}">Enroll now</a>
        </div>
      </div>
    </article>
  `;

  const renderProgramCard = (program, index) => `
    <article class="card">
      <div class="card-image tall">
        <img src="${asset(program.image)}" alt="${program.title}">
        ${program.open ? "" : `<span class="badge-floating">${icon("clock")} Coming Soon</span>`}
        <span class="icon-button" aria-hidden="true">${icon("external")}</span>
      </div>
      <div class="card-body">
        <h3 class="brand">${program.title}</h3>
        <p>${program.description}</p>
        <div class="meta-row">
          <span class="pill">${icon("bookmark")} ${program.projects}</span>
          <span class="pill">${icon("clock")} ${program.duration}</span>
        </div>
        <div class="card-foot">
          <div>
            <div class="avatars" aria-hidden="true">
              <img src="${asset("public/images/pic.png")}" alt="">
              <img src="${asset("public/images/pic.png")}" alt="">
              <img src="${asset("public/images/pic.png")}" alt="">
            </div>
            <div class="small-muted">${program.waitlistCount} ${index === 0 ? "learners impacted" : "people on waitlist"}</div>
          </div>
          ${program.open ? `<a class="btn btn-ghost" href="${path(program.href)}">${program.action}</a>` : `<button class="btn btn-ghost" type="button" data-coming-soon>${program.action}</button>`}
        </div>
      </div>
    </article>
  `;

  const renderDeck = (id, title, active = "programs", query = "") => {
    const normalized = query.trim().toLowerCase();
    const filterItems = (items) => normalized
      ? items.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(normalized))
      : items;
    const data = active === "courses" ? filterItems(coursesData) : filterItems(programsData);
    const card = active === "courses" ? renderCourseCard : renderProgramCard;
    const gridClass = active === "courses" ? "cards-grid" : "cards-grid two";
    const empty = `<div class="card-body"><p>No matching ${active} found yet. Try another search term.</p></div>`;
    return `
      <section id="${id}" class="section section-soft">
        <div class="container">
          <div class="section-head">
            <h2 class="section-title" data-deck-title>${title}</h2>
            <div class="segmented" role="tablist" aria-label="Courses and programs">
              <button type="button" class="${active === "programs" ? "active" : ""}" data-deck-tab="programs">Programs</button>
              <button type="button" class="${active === "courses" ? "active" : ""}" data-deck-tab="courses">Courses</button>
            </div>
          </div>
          <div class="desktop-deck">
            <div class="${gridClass}" data-deck-grid>
              ${data.length ? data.map(card).join("") : empty}
            </div>
          </div>
          <div class="carousel" data-carousel>
            <div class="carousel-viewport">
              <div class="carousel-track" data-carousel-track>
                ${data.length ? data.map((item, index) => `<div class="carousel-slide">${card(item, index)}</div>`).join("") : `<div class="carousel-slide">${empty}</div>`}
              </div>
            </div>
            <button class="carousel-arrow prev" type="button" data-carousel-prev aria-label="Previous">${icon("left")}</button>
            <button class="carousel-arrow next" type="button" data-carousel-next aria-label="Next">${icon("right")}</button>
            <div class="dots" data-carousel-dots></div>
          </div>
        </div>
      </section>
    `;
  };

  const renderTestimonials = () => {
    const card = ([text, author, role]) => `
      <article class="testimonial-card">
        <p>"${text}"</p>
        <div class="testimonial-person">
          <span class="initials">${author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
          <div>
            <strong>${author}</strong>
            <div class="small-muted">${role}</div>
          </div>
        </div>
      </article>
    `;
    const doubled = [...testimonials, ...testimonials];
    return `
      <section class="section section-soft testimonial-section">
        <div class="container">
          <div class="section-head" style="display:block;text-align:center">
            <h2 class="section-title">What Our Alumnis Are Saying</h2>
            <p class="section-copy">From beginners with big dreams to professionals seeking a competitive edge, our graduates are living proof that Africa's digital future is here.</p>
          </div>
          <div class="testimonial-track left">${doubled.map(card).join("")}</div>
          <div class="testimonial-track right">${doubled.map(card).join("")}</div>
          <div class="stats-band">
            <div class="stats-content">
              <div>
                <p>We provide <strong>professional tutoring</strong> that can help you break into <strong>tech</strong> and make an impact in your industry.</p>
              </div>
              <div class="stats-numbers">
                <div><div class="stat-number" data-count="828">0</div><div class="small-muted">Learners Reached</div></div>
                <div><div class="stat-number" data-count="3">0</div><div class="small-muted">Communities</div></div>
                <div><div class="stat-number" data-count="5">0</div><div class="small-muted">Learning Tracks</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  const renderFaq = () => `
    <section class="section">
      <div class="container">
        <div style="text-align:center;margin-bottom:42px">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-copy">Find quick answers about our digital skills bootcamp, tech training, and how we empower tech talent in Africa.</p>
        </div>
        <div class="faq-list">
          ${faqs.map(([question, answer], index) => `
            <details ${index === 0 ? "open" : ""}>
              <summary>${question}</summary>
              <p>${answer}</p>
            </details>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  const renderHome = () => renderLayout(`
    <main>
      <section class="hero" style="--hero-image:url('https://res.cloudinary.com/dq2jag0q6/image/upload/v1756134161/rename_ldcybc.jpg')">
        <div class="hero-content">
          <h1>Up your skills to advance your <span class="rotating-word" data-rotating-word>Career Path</span></h1>
          <p>Upskill yourself to thrive in Africa's digital future today.</p>
          <form class="hero-search" data-course-search>
            <input type="search" name="query" placeholder="What do you want to learn?" aria-label="Search courses and programs">
            <button type="submit" aria-label="Search">${icon("search")}</button>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2 class="section-title" style="text-align:center;margin-bottom:52px">Organizations we've worked with</h2>
          <div class="logo-marquee">
            <div class="logo-track">
              ${["global.png", "rccg.png", "incubator.png", "champions.png", "global.png", "rccg.png", "global.png", "incubator.png", "rccg.png", "global.png"].map((file) => `<div class="logo-item"><img src="${asset(`public/images/${file}`)}" alt=""></div>`).join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container split">
          <div class="circle-photo"><img src="${asset("public/images/skill_up.png")}" alt="Student with thumbs up"></div>
          <div>
            <h2 class="section-title">Why Choose SkillUp Edtech?</h2>
            <p class="section-copy" style="margin-left:0">Our programs are designed to help you gain in-demand digital skills, connect with real job opportunities, and thrive in the global digital economy.</p>
            <div class="feature-stack" style="margin-top:28px">
              ${featureRow("Industry-Relevant Training", "Learn from experts with hands-on experience in top industries, giving you the skills global and African employers actually want.", "blue", `<img src="${asset("public/images/flight.jpg")}" alt="">`)}
              ${featureRow("Career-Focused Support", "From CV makeovers to interview prep, we provide personalised support to help you secure roles in tech locally and globally.", "orange", icon("users"))}
              ${featureRow("Pan-African Network", "Join a vibrant community of learners, mentors, and employers across Africa, creating opportunities to grow your career and make an impact.", "green", icon("briefcase"))}
            </div>
          </div>
        </div>
      </section>
      <div data-home-deck>${renderDeck("programs", "Interested In Our Programs?")}</div>
      ${renderSetsApart()}
      ${renderTestimonials()}
      ${renderFaq()}
      ${renderBlog()}
      ${renderNewsletter()}
    </main>
  `, { chat: true, popup: true });

  function featureRow(title, copy, tone, iconHtml) {
    return `
      <article class="feature-row ${tone === "blue" ? "feature-blue" : ""}">
        <div class="feature-icon ${tone || ""}">${iconHtml}</div>
        <div>
          <h3>${title}</h3>
          <p>${copy}</p>
        </div>
      </article>
    `;
  }

  const renderSetsApart = () => `
    <section class="section">
      <div class="container">
        <div style="text-align:center;margin-bottom:42px">
          <h2 class="section-title">What Sets Us Apart</h2>
          <p class="section-copy">At SkillUp Edtech, we are redefining how Africans learn, work, and thrive in the digital age.</p>
        </div>
        <div class="set-grid">
          <div class="set-column">
            <div class="set-image"><img src="${asset("public/images/Facilitators.jpg")}" alt="Professionals collaborating at a desk"></div>
            ${setCard("Expert Facilitators", "Our trainers aren't just teachers, they're industry veterans who've built products, led teams, and solved real business challenges across Africa and beyond. They bring hands-on knowledge, mentorship, and insider insights to help you learn tech in Africa the right way practical, market-relevant, and future-proof.", "users")}
          </div>
          <div class="set-card">
            <div class="set-image" style="margin-bottom:24px"><img src="${asset("public/images/abj.png")}" alt="SkillUp learning community"></div>
            ${setCard("Vast Online Community", "Learning doesn't stop at the classroom. Join a pan-African network of thousands of learners, alumni, and employers collaborating, sharing opportunities, and building solutions for the continent. This community is your launchpad into Africa's thriving tech ecosystem.", "globe", true)}
          </div>
          <div class="set-column">
            ${setCard("Focused Learning Tracks", "From software development to data analytics, product design, project management, and AI, our learning tracks are designed to take you from beginner to hire-ready. Whether you're upskilling for your current job or breaking into a new career, our online tech training in Nigeria gives you the tools to compete on a global stage.", "folder")}
            <div class="set-image"><img src="${asset("public/images/whygood.jpg")}" alt="Library with curved bookshelves"></div>
          </div>
        </div>
      </div>
    </section>
  `;

  function setCard(title, copy, iconName, innerOnly = false) {
    const body = `<div class="set-card-header">${icon(iconName)}<h3>${title}</h3></div><p>${copy}</p>`;
    return innerOnly ? body : `<article class="set-card">${body}</article>`;
  }

  const renderBlog = () => {
    const posts = [
      ["public/images/consistent.jpg", "How to Stay Consistent with Learning (Even on Busy Days)", "Life gets busy but your learning goals don't have to suffer. With the right strategy, you can stay consistent and make progress every single day. Discover practical methods for balancing work, study, and personal life while thriving in your online tech training journey."],
      ["public/images/right_course.jpg", "How to Choose the Right Course for Your Career Goals", "Picking the right course shouldn't feel like guesswork. Learn how to align your studies with your career ambitions, avoid common mistakes, and choose programs like our digital skills bootcamp that open doors in Africa's growing tech industry."],
      ["public/images/remote.jpg", "Mastering Remote Work as a Tech Professional in Africa", "Remote work is now the norm in the tech industry, but excelling at it takes more than just a good internet connection. Learn how tech talent in Africa can build productive routines, collaborate effectively across time zones, and thrive in global teams after completing our online tech training in Nigeria."],
      ["public/images/beginners.jpg", "From Beginner to Pro: Your Roadmap to Learning Tech in Africa", "Breaking into tech can feel overwhelming but it doesn't have to be. This step-by-step guide walks you through choosing a career path, enrolling in a digital skills bootcamp, building your portfolio, and landing your first job in the thriving African tech ecosystem."],
    ];
    return `
      <section class="section section-soft">
        <div class="container">
          <div class="blog-head">
            <div>
              <h2 class="section-title">Read. Learn. Grow</h2>
              <p class="section-copy" style="margin-left:0">Explore expert tips, inspiring stories, and practical strategies to help you succeed in the fast-paced world of technology.</p>
            </div>
            <a class="btn" href="#">Read More Blogs</a>
          </div>
          <div class="blog-grid">
            ${posts.map(([image, title, copy]) => `
              <article class="card">
                <div class="card-image"><img src="${asset(image)}" alt="${title}"></div>
                <div class="card-body">
                  <h3>${title}</h3>
                  <p>${copy}</p>
                  <a class="small-muted" href="#">Read post &raquo;</a>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  };

  const renderNewsletter = () => `
    <section class="newsletter">
      <img src="${asset("public/images/Shape.png")}" alt="">
      <div class="newsletter-inner">
        <h2 class="section-title" style="color:white">Stay Updated with us</h2>
        <p>Join our learning community and never miss out on the latest opportunities, tips, and success stories shaping the future of tech talent in Africa.</p>
        <a class="btn btn-light" href="${path("contact/")}">Contact Us</a>
      </div>
    </section>
  `;

  const renderAbout = () => renderLayout(`
    <main>
      ${pageHeader("ABOUT US", "Discover how we improve lives through technology and skills.")}
      <section class="section">
        <div class="container">
          <div class="split" style="margin-bottom:56px">
            <div>
              <h2 class="section-title">First Choice for<br>Tech Education Anywhere</h2>
              <p class="section-copy" style="margin-left:0">Whether you're starting fresh or advancing your career, SkillUp Edtech is your trusted partner for world-class tech education. We combine expert-led training, hands-on projects, and career support to shape the next generation of tech talent in Africa. From coding to data analytics, UI/UX design to cybersecurity, our programs are designed for real-world results helping you gain skills that open doors both locally and globally.</p>
            </div>
            <img class="rounded-img" src="https://res.cloudinary.com/dq2jag0q6/image/upload/v1756133369/1_zn9l2y.jpg" alt="Students collaborating on technology projects">
          </div>
          <div style="text-align:center">
            <p class="section-copy">We provide professional tutoring that can help you break into tech and make an impact in your industry.</p>
            <div class="about-stats">
              <div><div class="stat-number">828</div><div class="small-muted">Learners Reached</div></div>
              <div><div class="stat-number">3</div><div class="small-muted">Communities Activated</div></div>
              <div><div class="stat-number">4+</div><div class="small-muted">Years</div></div>
            </div>
          </div>
          <div class="split" style="margin-top:64px">
            <div>
              <h2 class="section-title">Why You Should Start<br>Learning With Us</h2>
              <div class="feature-stack" style="margin-top:28px">
                ${featureRow("Promoting Digital Education", "Our comprehensive learning programs build both foundational and advanced tech skills equipping you for the modern workplace and positioning you among the most in-demand tech talent in Africa.", "blue", icon("monitor"))}
                ${featureRow("Innovative Tech Workshops", "Engage in hands-on, immersive workshops focused on emerging technologies. We foster creativity, problem-solving, and practical application - ensuring you can turn knowledge into career growth.", "orange", icon("light"))}
                ${featureRow("Online Resource Hub", "Access a centralized platform filled with tutorials, templates, and industry insights. Whether you're coding, designing, or strategizing, our resources make continuous learning and upskilling simple and accessible.", "green", icon("file"))}
              </div>
            </div>
            <img class="rounded-img" src="https://res.cloudinary.com/dq2jag0q6/image/upload/v1756146453/man-siting_s0xaoh.jpg" alt="Happy student with book giving thumbs up">
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-head">
            <h2 class="section-title">Our History</h2>
            <p class="section-copy" style="margin:0">At SkillUp Edtech, our mission is to clearly bridge Africa's digital divide and empower communities with the tools to thrive in a fast-evolving world. As one of Nigeria's leading digital skills bootcamps and online tech training providers, we've impacted 828 learners through our flagship programs.</p>
          </div>
          <div class="history-tabs" data-history-tabs></div>
          <div data-history-content></div>
        </div>
      </section>
      ${renderTestimonials()}
      <section class="section cta-blue">
        <div class="container">
          <h2 class="section-title" style="color:white">Join Our Growing Community</h2>
          <p class="section-copy">Be part of Africa's digital transformation. Whether you're a learner, partner, or supporter, there's a place for you in our mission. From digital skills bootcamps to online tech training in Nigeria, we are building the next generation of tech talent in Africa. Together, we can empower communities, close the digital divide, and create opportunities for all.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px">
            <a class="btn btn-light" href="${path(applicationPath)}">Join A Program</a>
            <a class="btn" style="background:#0b0f19" href="${path("contact/")}">Partner With Us</a>
          </div>
        </div>
      </section>
    </main>
  `);

  const pageHeader = (label, title) => `
    <header class="page-header">
      <div class="container">
        <p class="eyebrow">${label}</p>
        <h1>${title}</h1>
      </div>
    </header>
  `;

  const renderHistory = (active = "years") => {
    const item = historyContent[active];
    return `
      <div class="history-content">
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <h4>${icon("check")} Key Achievements</h4>
          <ul class="dot-list">${item.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}</ul>
          <div class="history-stats">
            ${item.stats.map(([number, label]) => `<div class="history-stat"><strong>${number}</strong><span>${label}</span></div>`).join("")}
          </div>
        </div>
        <img class="rounded-img" src="${item.image}" alt="${item.title}">
      </div>
    `;
  };

  const renderContact = () => renderLayout(`
    <main>
      ${pageHeader("CONTACT US", "Reach Out To Us")}
      <section class="section" style="padding-bottom:32px">
        <div class="container" style="text-align:center;max-width:900px">
          <h2 class="section-title">Have a Question? Let's Connect.</h2>
          <p class="section-copy">We'd love to hear from you. Whether you're interested in our digital skills bootcamps, exploring online tech training in Nigeria, or looking to partner in building tech talent in Africa. Share your ideas, projects, or inquiries, and our team will get back to you promptly.</p>
        </div>
      </section>
      <section class="section" style="padding-top:24px">
        <div class="container">
          <div class="contact-card">
            <aside class="contact-info">
              <div>
                <h2>Get in touch</h2>
                <div class="contact-list">
                  ${contactItem("mail", "EMAIL US", "skilluplimited@gmail.com", "mailto:skilluplimited@gmail.com")}
                  ${contactItem("phone", "PHONE NUMBER", "+2347040309594")}
                  ${contactItem("map", "", "Dare Adeboye Innovation Hub, 2, Abiona road, Behind House of Favour, Redemption City, Mowe, Ogun State")}
                </div>
              </div>
              <div>
                <p><strong>Connect with us:</strong></p>
                <div class="social-row">
                  <a class="social-link" href="https://www.facebook.com/skillupedtech">f</a>
                  <a class="social-link" href="#">X</a>
                  <a class="social-link" href="https://www.linkedin.com/company/theskillupglobal">in</a>
                </div>
              </div>
            </aside>
            <div class="form-panel">
              <form data-form="contact" novalidate>
                <div class="form-grid">
                  ${fieldHtml(["name", "Name", "text", true, "Full name"])}
                  ${fieldHtml(["email", "Email", "email", true, "Email address"])}
                  ${fieldHtml(["subject", "Subject", "text", true, "Subject"], true)}
                  ${fieldHtml(["company", "Company Name", "text", false, "Brand/Company/Product Name"], true)}
                  ${fieldHtml(["message", "Message", "textarea", true, "Write your message here..."], true)}
                </div>
                <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:22px">
                  <button class="btn" type="submit">Send Message</button>
                  <p class="form-status" data-form-status></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      ${renderFaq()}
    </main>
  `);

  function contactItem(iconName, label, value, href) {
    const content = `<div class="contact-item"><div class="contact-icon">${icon(iconName)}</div><div>${label ? `<div class="small-muted" style="font-weight:800">${label}</div>` : ""}<strong>${value}</strong></div></div>`;
    return href ? `<a href="${href}">${content}</a>` : content;
  }

  function fieldHtml(field, full = false) {
    const [name, label, type, required, placeholder, options, note] = field;
    const req = required ? " required" : "";
    const star = required ? " <span style=\"color:#ea580c\">*</span>" : "";
    if (type === "textarea") {
      return `<div class="field ${full ? "full" : ""}"><label for="${name}">${label}${star}</label><textarea id="${name}" name="${name}" placeholder="${placeholder || ""}"${req}></textarea></div>`;
    }
    if (type === "select") {
      return `<div class="field ${full ? "full" : ""}"><label for="${name}">${label}${star}</label><select id="${name}" name="${name}"${req}><option value="">Select an option</option>${(options || []).map((option) => `<option value="${option}">${option}</option>`).join("")}</select>${note ? `<div class="field-note">${note}</div>` : ""}</div>`;
    }
    if (type === "radio") {
      return `<div class="field full"><div class="field-label">${label}${star}</div><div class="radio-grid">${(options || []).map((option) => `<label class="option-card"><input type="radio" name="${name}" value="${option}"${req}> <span>${option}</span></label>`).join("")}</div></div>`;
    }
    if (type === "checkbox") {
      return `<div class="field full"><label class="option-card"><input type="checkbox" name="${name}" value="Yes"${req}> <span>${label}${star}</span></label></div>`;
    }
    return `<div class="field ${full ? "full" : ""}"><label for="${name}">${label}${star}</label><input id="${name}" name="${name}" type="${type}" placeholder="${placeholder || ""}"${req}>${note ? `<div class="field-note">${note}</div>` : ""}</div>`;
  }

  const renderSkillUpPlus = () => renderLayout(`
    <main class="application-main">
      <section class="application-hero">
        <div class="container application-hero-grid">
          <div>
            <p class="eyebrow">SkillUp Plus</p>
            <h1>Apply for the next SkillUp Edtech intensive cohort.</h1>
            <p>This form helps us confirm your readiness, preferred track, availability, and commitment for the SkillUp Plus programme.</p>
          </div>
          <div class="hero-notes">
            ${heroNote("clock", "3-month learning pipeline", "LMS content, live sync sessions, projects, mentoring, and certification.")}
            ${heroNote("laptop", "Practical track selection", "Choose Cybersecurity, Data Analysis, Product Design, Software Development, or AI for Professionals.")}
            ${heroNote("shield", "N25,000 commitment structure", "Acknowledged during application and processed after selection confirmation.")}
          </div>
        </div>
      </section>
      <section>
        <div class="container application-layout">
          <aside class="progress-card">
            <p><strong>Application progress</strong></p>
            <div class="progress-bar"><span data-progress-bar></span></div>
            <p class="small-muted" data-progress-text>0 required fields completed</p>
            <div class="info-list">
              <div>${icon("users")} Built for serious applicants</div>
              <div>${icon("check")} Sent to the SkillUp Plus sheet</div>
            </div>
          </aside>
          <form data-form="skillUpPlus" novalidate>
            ${skillUpFields.map((section) => `
              <section class="form-section">
                <p class="small-muted" style="font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:var(--blue-700)">${section.eyebrow}</p>
                <h2>${section.title}</h2>
                <p class="small-muted">${section.description}</p>
                <div class="form-grid" style="margin-top:24px">
                  ${section.fields.map((field) => fieldHtml(field, ["textarea", "radio", "checkbox"].includes(field[2]))).join("")}
                </div>
              </section>
            `).join("")}
            <div class="application-submit">
              <p class="form-status" data-form-status></p>
              <button class="btn" type="submit">Submit application</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  `);

  function heroNote(iconName, title, copy) {
    return `<div class="hero-note">${icon(iconName)}<div><strong>${title}</strong><p>${copy}</p></div></div>`;
  }

  const renderTechTrybe = () => {
    const sidebar = `
      <aside class="course-sidebar">
        <div class="sidebar-card sticky">
          <a class="btn" style="width:100%" href="${path(applicationPath)}">Enroll now</a>
          <ul class="info-list">
            <li>${icon("video")} <span>Fully Online (Live + LMS + Mentorship)</span></li>
            <li>${icon("check")} <span>Commitment: 6 - 10 hours weekly</span></li>
            <li>${icon("clock")} <span>6 Weeks</span></li>
            <li>${icon("link")} <span>Limited Access</span></li>
            <li>${icon("award")} <span>Certificate upon completion</span></li>
          </ul>
        </div>
        ${sidebarCard("Instructor", `<div class="testimonial-person"><span class="initials">SE</span><div><strong>SkillUp Edtech</strong><div class="small-muted">skilluplimited@gmail.com</div></div></div><p>Our mission is simple but powerful to bridge Africa's digital divide and empower individuals to thrive in today's fast-evolving tech world. Through our intensive, hands-on training, we've already impacted 828 learners across our flagship programs, helping them pivot into tech, grow their freelance businesses, or advance their careers.</p>`)}
        ${sidebarCard("Program Timeline", dotList(["Week 1: Orientation & Fundamentals Review", "Week 2: Core Skill Building & Mini Project 1", "Week 3: Applied Projects & Guest Masterclass", "Week 4: Advanced Topics & Career Workshops", "Week 5: Capstone Project", "Week 6: Demo Day & Career Launch"]))}
        ${sidebarCard("Requirements", dotList(["A laptop with stable internet connection", "Prior knowledge in the chosen course area", "Commitment to attend class or re-watch.", "Willingness to complete assignments and practical projects."]))}
        ${sidebarCard("Tags", `<div class="tag-cloud">${["Product Design", "Programs", "Professional", "Software Development", "Data Science & Analytics", "Project Management", "Digital Marketing"].map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`)}
        ${sidebarCard("Audience", dotList(["Working professionals ready to level up.", "Entrepreneurs who want smarter, tech-enabled businesses.", "Anyone with basic knowledge who wants practical growth.", "Freelancers aiming for advanced skills.", "Anyone who loves organizing & planning"]))}
      </aside>
    `;

    return renderLayout(`
      <main>
        <header class="course-header">
          <div class="container course-header-inner">
            <div>
              <h1>Tech Trybe Bootcamp</h1>
              <span class="rating">${Array.from({ length: 5 }, () => icon("star")).join("")} (5.0)</span>
            </div>
            <div class="small-muted">${icon("users")} Favorites &nbsp; ${icon("globe")} Share</div>
          </div>
        </header>
        <section class="section">
          <div class="container course-layout">
            <div class="course-main">
              <div class="course-hero-image"><img src="${asset("public/images/Tech.jpg")}" alt="Tech Trybe Bootcamp students working on laptops"></div>
              <section>
                <h2>About Tech Trybe</h2>
                <p>Tech Trybe Bootcamp is a 6-week, fully virtual, instructor-led program designed for graduates, young professionals, and mid-level talent.</p>
                <p>Through live classes, mentorship, and career support, you'll gain job-ready digital skills, build a standout portfolio, and position yourself to upskill, pivot, or accelerate your career in today's most in-demand digital fields.</p>
              </section>
              <section>
                <h2>By the end of the bootcamp, you will:</h2>
                <div class="cards-grid two" style="gap:16px">
                  ${["Gain job-ready skills in your chosen track", "Build mini projects and a capstone project for your portfolio", "Access career support, mentorship & job placement partners", "Join a vibrant community of tech talent & industry experts"].map((text) => `<div class="feature-row">${icon("check")}<span>${text}</span></div>`).join("")}
                </div>
              </section>
              <section>
                <h2>Course Tracks</h2>
                <div class="track-list">
                  <div style="display:flex;justify-content:space-between;gap:16px;margin-bottom:18px"><strong>Available Tracks</strong><span class="small-muted">${courseModules.length} Tracks</span></div>
                  ${courseModules.map(([id, title, lesson], index) => `
                    <details class="track-item" ${index === 0 ? "open" : ""}>
                      <summary><span style="display:flex;align-items:center;gap:14px"><span class="track-index">${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong></span><span>+</span></summary>
                      <p>${lesson}</p>
                    </details>
                  `).join("")}
                </div>
              </section>
              <section>
                <h2>Related Programs</h2>
                <div class="desktop-deck"><div class="cards-grid">${coursesData.slice(0, 3).map(renderCourseCard).join("")}</div></div>
                <div class="carousel" data-carousel>
                  <div class="carousel-viewport"><div class="carousel-track" data-carousel-track>${coursesData.slice(0, 3).map((course) => `<div class="carousel-slide">${renderCourseCard(course)}</div>`).join("")}</div></div>
                  <button class="carousel-arrow prev" type="button" data-carousel-prev aria-label="Previous">${icon("left")}</button>
                  <button class="carousel-arrow next" type="button" data-carousel-next aria-label="Next">${icon("right")}</button>
                  <div class="dots" data-carousel-dots></div>
                </div>
              </section>
            </div>
            ${sidebar}
          </div>
        </section>
      </main>
    `);
  };

  function sidebarCard(title, body) {
    return `<section class="sidebar-card"><h3>${title}</h3>${body}</section>`;
  }

  function dotList(items) {
    return `<ul class="dot-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function initNav() {
    const nav = document.querySelector("[data-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    if (!nav || !toggle) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? icon("x") : icon("menu");
    });
  }

  function initPopup() {
    const popup = document.querySelector("[data-popup]");
    if (!popup) return;
    const close = () => {
      popup.classList.remove("visible");
      popup.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    };
    window.setTimeout(() => {
      popup.classList.add("visible");
      popup.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }, 350);
    popup.addEventListener("click", (event) => {
      if (event.target === popup || event.target.closest("[data-popup-close]") || event.target.closest(".popup-copy .btn")) close();
    });
  }

  function initRotatingWord() {
    const node = document.querySelector("[data-rotating-word]");
    if (!node) return;
    const words = ["Career Path", "Employability", "Talent"];
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % words.length;
      node.textContent = words[index];
    }, 2000);
  }

  function initDecks() {
    document.querySelectorAll("[data-home-deck]").forEach((host) => {
      let active = "programs";
      let query = "";
      const update = () => {
        host.innerHTML = renderDeck("programs", active === "courses" ? "Courses We Offer." : "Interested In Our Programs?", active, query);
        bind();
        initCarousels(host);
        initComingSoon(host);
      };
      const bind = () => {
        host.querySelectorAll("[data-deck-tab]").forEach((button) => {
          button.addEventListener("click", () => {
            active = button.dataset.deckTab;
            query = "";
            update();
          });
        });
      };
      bind();
      initCarousels(host);
      const searchForm = document.querySelector("[data-course-search]");
      if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
          event.preventDefault();
          query = new FormData(searchForm).get("query")?.toString() || "";
          active = "courses";
          update();
          host.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  }

  function initCarousels(scope = document) {
    scope.querySelectorAll("[data-carousel]").forEach((carousel) => {
      const track = carousel.querySelector("[data-carousel-track]");
      const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
      const dots = carousel.querySelector("[data-carousel-dots]");
      let index = 0;
      if (!track || !slides.length || !dots) return;
      const renderDots = () => {
        dots.innerHTML = slides.map((_, dotIndex) => `<button type="button" class="${dotIndex === index ? "active" : ""}" aria-label="Go to slide ${dotIndex + 1}"></button>`).join("");
        dots.querySelectorAll("button").forEach((button, dotIndex) => button.addEventListener("click", () => go(dotIndex)));
      };
      const go = (nextIndex) => {
        index = Math.max(0, Math.min(slides.length - 1, nextIndex));
        track.style.transform = `translateX(-${index * 100}%)`;
        renderDots();
      };
      carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => go(index - 1));
      carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => go(index + 1));
      go(0);
    });
  }

  function initHistory() {
    const tabs = document.querySelector("[data-history-tabs]");
    const content = document.querySelector("[data-history-content]");
    if (!tabs || !content) return;
    let active = "years";
    const update = () => {
      tabs.innerHTML = Object.entries(historyContent).map(([key, item]) => `<button type="button" class="${key === active ? "active" : ""}" data-history-tab="${key}">${item.label}</button>`).join("");
      content.innerHTML = renderHistory(active);
      tabs.querySelectorAll("[data-history-tab]").forEach((button) => {
        button.addEventListener("click", () => {
          active = button.dataset.historyTab;
          update();
        });
      });
    };
    update();
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    const run = (node) => {
      const target = Number(node.dataset.count || "0");
      const duration = 900;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        node.textContent = String(Math.round(target * progress));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function initForms() {
    document.querySelectorAll("form[data-form]").forEach((form) => {
      const formType = form.dataset.form;
      const status = form.querySelector("[data-form-status]");
      const submitButton = form.querySelector("button[type='submit']");
      const requiredFields = Array.from(form.querySelectorAll("[required]"));
      const progressBar = document.querySelector("[data-progress-bar]");
      const progressText = document.querySelector("[data-progress-text]");

      const updateProgress = () => {
        if (!progressBar || !progressText) return;
        const names = new Set(requiredFields.map((field) => field.name).filter(Boolean));
        const completed = Array.from(names).filter((name) => {
          const fields = Array.from(form.querySelectorAll(`[name="${CSS.escape(name)}"]`));
          if (fields[0]?.type === "radio") return fields.some((field) => field.checked);
          if (fields[0]?.type === "checkbox") return fields.some((field) => field.checked);
          return Boolean(fields[0]?.value.trim());
        }).length;
        const total = names.size;
        progressBar.style.width = `${Math.round((completed / total) * 100)}%`;
        progressText.textContent = `${completed} of ${total} required fields completed`;
      };

      form.addEventListener("input", updateProgress);
      form.addEventListener("change", updateProgress);
      updateProgress();

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const data = Object.fromEntries(new FormData(form).entries());
        if (formType === "skillUpPlus") data.programme = "SkillUp Plus";
        setStatus(status, "submitting", formType === "contact" ? "Sending..." : "Submitting...");
        if (submitButton) submitButton.disabled = true;
        try {
          await submitFormPayload(formType, data);
          form.reset();
          updateProgress();
          setStatus(status, "success", formType === "contact" ? "Your message has been received. Our team will get back to you shortly." : "Your SkillUp Plus application has been received.");
        } catch (error) {
          setStatus(status, "error", formType === "contact" ? "We could not send your message. Please try again." : "We could not submit the form. Please try again.");
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });
    });
  }

  function setStatus(node, className, message) {
    if (!node) return;
    node.className = `form-status ${className}`;
    node.textContent = message;
  }

  async function submitFormPayload(formType, data) {
    const payload = {
      formType,
      sheetName: formSheets[formType],
      submittedAt: new Date().toISOString(),
      data,
    };
    const webhookUrl = window.SKILLUP_FORMS_WEBHOOK_URL;
    if (!webhookUrl) {
      const stored = JSON.parse(localStorage.getItem("skillupFormSubmissions") || "[]");
      stored.push(payload);
      localStorage.setItem("skillupFormSubmissions", JSON.stringify(stored.slice(-50)));
      return { ok: true, mode: "preview" };
    }
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Submission failed");
    return response.json().catch(() => ({ ok: true }));
  }

  function initComingSoon(scope = document) {
    scope.querySelectorAll("[data-coming-soon]").forEach((button) => {
      button.addEventListener("click", () => {
        window.alert("Coming Soon! We'll notify you when this program opens for enrollment.");
      });
    });
  }

  function render() {
    const root = document.getElementById("site-root");
    if (!root) return;
    const pages = {
      home: renderHome,
      about: renderAbout,
      contact: renderContact,
      "skillup-plus": renderSkillUpPlus,
      "tech-trybe": renderTechTrybe,
    };
    root.innerHTML = (pages[page] || renderHome)();
    initNav();
    initPopup();
    initRotatingWord();
    initDecks();
    initCarousels();
    initHistory();
    initCounters();
    initForms();
    initComingSoon();
  }

  render();
})();
