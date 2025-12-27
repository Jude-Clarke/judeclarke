import { media } from "./media";

const resumeLink =
  "https://drive.google.com/file/d/1W8K12743oCt_U8gFR0h3WIaxI5mi_uD7/view?usp=sharing";

export const Bio = {
  name: "Jude",
  roles: [
    "Software Engineer",
    "UI/UX Designer",
    "Full Stack Dev",
    "UI/UX Engineer",
    "Tech Consultant",
  ],
  description: `I develop engaging and scalable full-stack applications. Previously at a New York startup, I executed a full replatform and redesign in React. By collaborating with designers to build their design system, I was able to enhance product usability, brand consistency, and company efficiency. Ask me to demo my work! I'd love to deliver value for your team.`,
  github: "https://github.com/jude-clarke",
  resume: resumeLink,
  linkedin: "https://www.linkedin.com/in/judeclarke/",
};

export const skills = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React Js",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
        link: "https://react.dev/",
      },
      {
        name: "React Native",
        image: media.skillIcons.reactNativeIcon,
        link: "https://react.dev/",
      },
      {
        name: "TypeScript",
        image: media.skillIcons.typescriptIcon,
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Next Js",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTklEQVR4Ab1XAaQqURB9DyohSykREpRIQSAlBCoECKUFCSRCBBEAaSEABQEoCIEASCwAUICALgCo83do0//9v819XX845O7VnDkzOzP7JWGaBd3C3IJpQVjAHeJ+Rs9a97vKLGrBsB1KgMhEP3FMUUwt4ENMfxr1yQIU4SSjRkbeOZtERmHk6pXQVDlnkHh9S+QLTm1hkiz4n/gzFQuny9FoFLquE+i34x+n02k0m00UCoV3BIzn3MMJrVYLtp1OJ0cS/X4f5/MZhmG8IyDsWtDfEaDIn2232/3zbrvdxuFwwGg04qRBt+VnETBNE0IIkE2n07/erdfrWK/X6Ha73Hb9ZXII3G43ivy3dNRqtZe7lUoFs9mM6oBDwCQCgquALT1FT3a5XF7qIZ/PYzgcolqtcggIIgBZAgRKB6lCRalp2uM8k8mAVMrlchwC+DEBipycE4n5fP44j8ViKJVKSCaTbAJCpgaez4vFIsjoWa/XA50FAgEkEgmEw2F2CkxZBZ5Br5tt1ITcbjd8Ph88Hg+7CBefECCsVitS4aVJcV9D/VMCVITk/Hq9YrPZyBBo2a1YMGvAcQYcj0cCtWMugcdYNhjDiBrP25mx3++x3W6RzWZZ8isfxzQLlsslJpMJpYY5jhkqcOH1ejEYDDAej9FoNOByuZxGsfqVzC7KTqcDSkkqleKsZOqX0mAwiHK5DGrJfr+fs5SqX8sjkQji8ThCoRC+v78Za7l6JagrUh3YkUuZpqgwDaecc9VYSDoV5Fg+at7n+eLN57kuE/EvzHr/Kvs31aYAAAAASUVORK5CYII=",
        link: "https://nextjs.org/",
      },
      {
        name: "HTML",
        image: media.skillIcons.htmlIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        name: "CSS",
        image: media.skillIcons.cssIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "JavaScript",
        image: media.skillIcons.javascriptIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Styled Components",
        image: media.skillIcons.styledComponentsIcon,
        link: "https://styled-components.com/",
      },
      {
        name: "Tailwind",
        image: media.skillIcons.tailwindIcon,
        link: "https://tailwindcss.com/",
      },
      {
        name: "Sass",
        image: media.skillIcons.sassIcon,
        link: "https://sass-lang.com/",
      },
      {
        name: "Figma",
        image: media.skillIcons.figmaIcon,
        link: "https://www.figma.com/",
      },
      {
        name: "Email JS",
        image: media.skillIcons.emailJSIcon,
        link: "https://www.emailjs.com/",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node Js",
        image: media.skillIcons.nodeIcon,
        link: "https://nodejs.org/en",
      },
      {
        name: "Express Js",
        image: media.skillIcons.expressIcon,
        link: "https://expressjs.com/",
      },
      {
        name: "OpenAI APIs",
        image: media.skillIcons.aiIcon,
        link: "https://openai.com/api/",
      },
      {
        name: "Firebase",
        image: media.skillIcons.firebaseIcon,
        link: "https://firebase.google.com/",
      },
      {
        name: "Python",
        image: media.skillIcons.pythonIcon,
        link: "https://www.python.org/",
      },
      {
        name: "MongoDB",
        image: media.skillIcons.mongoDBIcon,
        link: "https://www.mongodb.com/",
      },
      {
        name: "Graph Ql",
        image: media.skillIcons.graphQLIcon,
        link: "https://graphql.org/",
      },
      {
        name: "Passport.js",
        image: media.skillIcons.passportIcon,
        link: "https://www.passportjs.org/",
      },
      {
        name: "Nodemailer",
        image: media.skillIcons.nodemailerIcon,
        link: "https://www.nodemailer.com/",
      },
    ],
  },
  {
    title: "Other Tech",
    skills: [
      {
        name: "Google APIs",
        image: media.skillIcons.googleApiIcon,
        link: "https://developers.google.com/",
      },
      {
        name: "Heroku",
        image: media.skillIcons.herokuIcon,
        link: "https://www.heroku.com/",
      },
      {
        name: "AWS",
        image: media.skillIcons.awsIcon,
        link: "https://aws.amazon.com/",
      },
      {
        name: "NPM",
        image: media.skillIcons.npmIcon,
        link: "https://www.npmjs.com/",
      },
      {
        name: "Git",
        image: media.skillIcons.gitIcon,
        link: "https://git-scm.com/",
      },
      {
        name: "CLI",
        image: media.skillIcons.cliIcon,
        link: "https://aws.amazon.com/what-is/cli/#:~:text=Here%20is%20how%20you%20open%20the%20CLI%20on%20Mac%3A,now%20enter%20a%20command%20prompt",
      },
      {
        name: "Docker",
        image: media.skillIcons.dockerIcon,
        link: "https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=BRAND_SEARCH_BRAND_AMER_NORAM&utm_term=docker&gad_source=1&gclid=CjwKCAjww_iwBhApEiwAuG6ccBcrAwuKxV6xeuS5bCTrQ8uqgHM-n3v1gFtlK_qddP-kM4hXzMwkUhoCjksQAvD_BwE",
      },
      {
        name: "Jira",
        image: media.skillIcons.jiraIcon,
        link: "https://www.atlassian.com/software/jira?&aceid=&adposition=&adgroup=136973856930&campaign=18440774103&creative=639487383004&device=c&keyword=jira&matchtype=e&network=g&placement=&ds_kids=p73335831609&ds_e=GOOGLE&ds_eid=700000001558501&ds_e1=GOOGLE&gad_source=1&gclid=CjwKCAjww_iwBhApEiwAuG6ccJqddcANHb8NEdSM--9LpEH5fn-eT4_7yzBolmGdX8WD2C99EzlLcBoCgQ0QAvD_BwE&gclsrc=aw.ds",
      },
      {
        name: "VS Code",
        image: media.skillIcons.vsCodeIcon,
        link: "https://code.visualstudio.com/",
      },
      {
        name: "Vite",
        image: media.skillIcons.viteIcon,
        link: "https://vite.dev/",
      },
      {
        name: "Render",
        image: media.skillIcons.renderIcon,
        link: "https://render.com/",
      },
      {
        name: "Vercel",
        image: media.skillIcons.vercelIcon,
        link: "https://vercel.com/",
      },
      {
        name: "Netlify",
        image: media.skillIcons.netlifyIcon,
        link: "https://www.netlify.com/",
      },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      {
        name: "AI Prompt Engineering",
        image: media.skillIcons.openaiIcon,
        link: "https://aws.amazon.com/what-is/prompt-engineering/",
      },
      {
        name: "SCRUM",
        image: media.skillIcons.scrumIcon,
        link: "https://www.scrum.org/resources/what-scrum-module",
      },
      {
        name: "Teaching",
        image: media.skillIcons.teachingIcon,
        link: "#experience",
      },
      {
        name: "Business Insight",
        image: media.skillIcons.businessIcon,
        link: "#education",
      },
      {
        name: "Research",
        image: media.skillIcons.researchIcon,
        link: "#education",
      },
      {
        name: "Passion for Learning",
        image: media.skillIcons.learningIcon,
        link: "#projects",
      },
      {
        name: "Verbal/Written Communication",
        image: media.skillIcons.communicationIcon,
        link: "#experience",
        minContent: true,
      },
      {
        name: "Presentation",
        image: media.skillIcons.presentationIcon,
        link: "#experience",
      },
      {
        name: "Spanish Fluency",
        image: media.skillIcons.spanishIcon,
        link: "#education",
      },
      // {
      //   name: "Adaptability",
      //   image:
      //     media.skillIcons.adaptabilityIcon,
      //   link: "#experience"
      // },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: media.experienceIcons.mkdsLogo,
    role: "Fullstack Engineer, Technical Consultant",
    company: "Master Key Dev Solutions, LLC.",
    date: "February 2024 - Present",
    desc: "I architect and develop full-stack, applications and user experiences for my clients. I also provide them with consultations in my various areas of expertise to help them find scaleable, cost-effective solutions to the problems they want to solve.",
    skills: [
      "React",
      "NodeJs",
      "ExpressJS",
      "JavaScript",
      "Firebase",
      "MongoDB",
      "CSS",
      "Tailwind",
      "Figma",
      "Git",
      "Google APIs",
      "Netlify",
    ],
    doc: resumeLink,
  },
  {
    id: 1,
    img: media.experienceIcons.emceeLogo,
    role: "Software Engineer",
    company: "EMCEE",
    date: "Sept. 2022 - Feb. 2024",
    desc: "A social e-commerce platform that aims to connect social-media influencers with fashion brands to facilitate affiliate marketing and sales.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next Js",
      "Tailwind",
      "Storybook",
      "Figma",
      "GraphQL",
      "Git",
      "Google APIs",
      "AWS",
      "Jira",
      "SCRUM",
    ],
    doc: resumeLink,
  },
  {
    id: 2,
    img: media.experienceIcons.lwcsLogo,
    role: "Spanish/Computer Science Teacher",
    company: "Lake Wales Charter Schools",
    date: "Aug. 2019 - May 2022",
    desc: "I built the Computer Science and Spanish Departments and websites of 2 schools, and lead engineering clubs with other STEM professionals. I also collaborated with an educational consultant to design and develop an edutech software as a service.",
    skills: [
      "NodeJs",
      "ExpressJS",
      "JavaScript",
      "EJS",
      "MongoDB",
      "Passport.js",
      "CSS",
      "Figma",
      "Git",
      "Google APIs",
      "Heroku",
    ],
    doc: resumeLink,
  },
];

export const education = [
  {
    id: 0,
    img: media.educationIcons.warnerLogo,
    school: "Warner Univiersity",
    date: "2019 - 2021",
    gpa: "4.0",
    desc: "While working, I pursued an MBA with an emphasis on International Business. I completed the program within 2 years, and graduated with distinction.",
    degree:
      "Master of Business Administration - International Business (With Distinction)",
    link: "https://drive.google.com/file/d/158pTskyZzQTquiEHZjF3hwvv1d8ev0Vj/view?usp=sharing",
  },
  {
    id: 1,
    img: media.educationIcons.leeLogo,
    school: "Lee University",
    date: "2014 - 2018",
    gpa: "3.6",
    desc: "I earned a B.A. in Spanish with minors in Business Administration, Art, and Religion. My degree required International Travel, so I took classes in Colombia. I also worked as a Spanish and German workshop instructor and a Spanish tutor.",
    degree: "Bachelors of Arts in Spanish (Cum Laude)",
    link: "https://drive.google.com/file/d/1QZ7Y81-wEOOE-ZG-A4ifvNs7OGNnonw1/view?usp=sharing",
  },
  {
    id: 13,
    img: media.educationIcons.elvtrLogo,
    school: "ELVTR",
    date: "2025",
    grade: "Completed",
    desc: "Explored AI-powered design tools and workflows to enhance UX research and design processes, integrating advanced UX principles with technical development capabilities.",
    degree: "AI for UX/UI Designers",
    link: "https://elvtr.com/certificate/334119fc4c074430955582ee4775290b/",
  },
  {
    id: 12,
    img: media.educationIcons.whartonIcon,
    school: "Wharton University of Pennsylvania",
    date: "2025",
    grade: "100%",
    desc: "Analyzed AI-powered customer journey optimization, consumer behavior analytics, targeted marketing strategies, fraud detection systems using supervised and unsupervised learning, and credit risk assessment methods.",
    degree: "AI Applications in Marketing and Finance",
    link: "https://www.coursera.org/account/accomplishments/verify/TBDTKONZ5KVQ",
  },
  {
    id: 11,
    img: media.educationIcons.whartonIcon,
    school: "Wharton University of Pennsylvania",
    date: "2025",
    grade: "100%",
    desc: "Studied AI and machine learning applications across the employee lifecycle, including data-driven HR decision-making, bias mitigation through blockchain, pattern recognition in workforce data, and predictive analytics for talent management.",
    degree: "AI Applications in People Management",
    link: "https://www.coursera.org/account/accomplishments/verify/TBDTKONZ5KVQ",
  },
  {
    id: 10,
    img: media.educationIcons.whartonIcon,
    school: "Wharton University of Pennsylvania",
    date: "2025",
    grade: "100%",
    desc: "Examined machine learning algorithms, Deep Learning methods, GANs and VAEs, AutoML implementation, TensorFlow and no-code tools, and Big Data strategies for business applications while maintaining customer privacy.",
    degree: "AI Fundamentals for Non-Data Scientists",
    link: "https://www.coursera.org/account/accomplishments/verify/PW9S77WKV1O9",
  },
  {
    id: 9,
    img: media.educationIcons.whartonIcon,
    school: "Wharton University of Pennsylvania",
    date: "2025",
    grade: "100%",
    desc: "Explored enterprise AI implementation strategies, explainable AI frameworks, responsible governance practices, bias detection in datasets, and organizational change management in AI adoption.",
    degree: "AI Strategy and Governance",
    link: "https://www.coursera.org/account/accomplishments/verify/TBDTKONZ5KVQ",
  },
  {
    id: 2,
    img: media.educationIcons.metaIcon,
    school: "Meta",
    date: "2022",
    grade: "96.87%",
    desc: "Learned version control systems, Git repository management for team collaboration, Linux command-line operations, and automated workflow creation for efficient software development processes.",
    degree: "Version Control Certificate",
    link: "https://coursera.org/share/a5edf7c310a95e71817021300ff03b32",
  },
  {
    id: 3,
    img: media.educationIcons.metaIcon,
    school: "Meta",
    date: "2022",
    grade: "97.76%",
    desc: "Studied core JavaScript concepts including functions, objects, arrays, data types, HTML DOM manipulation, interactive web technologies, and unit testing practices using Jest.",
    degree: "Programming with JavaScript Certificate",
    link: "https://coursera.org/share/414021c9a4e72d9610aceddef81f99fc",
  },
  {
    id: 4,
    img: media.educationIcons.udemyIcon,
    school: "Udemy",
    date: "2022",
    desc: "22.5 hours of AI prompt engineering, and generative AI",
    degree: "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More",
    link: "https://www.udemy.com/course/complete-ai-guide/",
  },
  {
    id: 5,
    img: media.educationIcons.udemyIcon,
    school: "Udemy",
    date: "July, 2021",
    desc: "26 hours of mobile, UI/UX, and component design",
    degree: "Complete Web & Mobile Designer: UI/UX, Figma, +more",
    link: "https://www.udemy.com/course/complete-web-designer-mobile-designer-zero-to-mastery/",
  },
  {
    id: 6,
    img: media.educationIcons.udemyIcon,
    school: "Udemy",
    date: "November, 2020",
    desc: "19.5 hours of web design principles and best practices",
    degree: "Complete Web Design: from Figma to Webflow to Freelancing",
    link: "https://www.udemy.com/course/freelance-web-design-from-design-to-development-to-making-money/",
  },
  {
    id: 7,
    img: media.educationIcons.udemyIcon,
    school: "Udemy",
    date: "June, 2020",
    desc: "65.5 hours of full-stack web development",
    degree: "The Complete 2020 Web Development Bootcamp",
    link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
  },
  {
    id: 8,
    img: media.educationIcons.udemyIcon,
    school: "Udemy",
    date: "January, 2019",
    desc: "64 hours of full-stack web development",
    degree: "The Web Developer Bootcamp 2019",
    link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
  },
];

const contributorJude = {
  name: "Jude Clarke",
  img: media.contributors.judeClarke,
  linkedin: "https://www.linkedin.com/in/judeclarke/",
  // github: "https://github.com/jude-clarke/",
  role: "Engineer",
};

export const projects = [
  {
    id: 7,
    title: "AI for UX Design",
    date: "August 2025 - October 2025",
    description:
      "A 9-week course led by Rich Hultman, Senior Innovation Designer at IBM",
    new: true,
    roleOverride: "UX Researcher",
    slides: [
      {
        id: 0,
        image: media.projectImages.aIforUX.slide1,
        desc: "As AI-powered development tools continue to accelerate, I believe strong UI/UX skills will become a key differentiator for software engineers building user-facing products. Acting on this insight, I applied and was accepted into a 9-week course offered by ELVTR, taught by Rich Hultman, Senior Innovation Designer at IBM. Throughout the course, I learned how to leverage AI tools to enhance and streamline the UX design process while maintaining strong design fundamentals. This capstone project represents the culmination of those tools, workflows, and design principles applied to a real product concept.",
      },
      { id: 1, image: media.projectImages.aIforUX.slide2, desc: "" },
      { id: 2, image: media.projectImages.aIforUX.slide3, desc: "" },
      { id: 3, image: media.projectImages.aIforUX.slide4, desc: "" },
      {
        id: 4,
        image: media.projectImages.aIforUX.slide5,
        desc: "I chose language learning as the problem space because it naturally lends itself to conversational interaction and immediate feedback, making it a strong fit for AI-assisted experiences.\n\nWith a background in Spanish education, this domain allowed me to design from lived experience and learner empathy rather than abstraction, grounding early decisions in real-world learning challenges.",
      },
      { id: 5, image: media.projectImages.aIforUX.slide6, desc: "" },
      { id: 6, image: media.projectImages.aIforUX.slide7, desc: "" },
      { id: 7, image: media.projectImages.aIforUX.slide8, desc: "" },
      {
        id: 8,
        image: media.projectImages.aIforUX.slide9,
        desc: "I treated prompt engineering as a way to scaffold my discovery process rather than outsource it. The prompt shown here reflects how I structured the interaction to support research thinking by clearly defining the desired outcome, guiding the model through a step-by-step reasoning process, and shaping the response through role framing and output constraints.\n\nBy setting these parameters upfront, I was able to use AI to pressure-test assumptions and surface blind spots, while keeping research judgment and synthesis firmly in my control.",
      },
      {
        id: 9,
        image: media.projectImages.aIforUX.slide10,
        desc: "By setting these parameters upfront and positioning ChatGPT as a senior research mentor, I was able to pressure-test assumptions, surface blind spots, and slow the process down. This equipped me to ask better questions while keeping research judgment, synthesis, and alignment to the original problem firmly in my control.",
      },
      { id: 10, image: media.projectImages.aIforUX.slide11, desc: "" },
      {
        id: 11,
        image: media.projectImages.aIforUX.slide12,
        desc: "I treated the proto-persona as a working hypothesis rather than a source of truth. Its role was to externalize early assumptions, align my thinking around a likely user profile, and create a concrete reference point before engaging in deeper research.\n\nThis helped me approach interviews and subsequent design decisions with clearer intent, while staying open to revising or discarding assumptions as new insights emerged.",
      },
      {
        id: 12,
        image: media.projectImages.aIforUX.slide13,
        desc: "I used AI to generate an initial question set, but the real value came from the refinement process. I reviewed each question for clarity, bias, and relevance, removing anything that felt leading or redundant and adjusting tone to encourage open-ended responses.\n\nThis ensured the final interview guide supported meaningful qualitative insights rather than simply validating my early assumptions.",
      },
      {
        id: 13,
        image: media.projectImages.aIforUX.slide14,
        desc: "The mind maps and summaries helped surface patterns across interviews, but I consistently cross-referenced insights against the original recordings to preserve context and nuance.\n\nThis approach allowed me to move efficiently while still grounding findings in real participant language and behavior.",
      },
      {
        id: 14,
        image: media.projectImages.aIforUX.slide15,
        desc: "Structuring interview insights in a comparative format helped me move from raw observations to clearer patterns around shared needs, pain points, and expectations.\n\nThis synthesis step gave me confidence that the emerging themes were consistent enough to inform the next phase of work, allowing me to transition into competitor research and heuristic evaluation with a grounded understanding of user priorities.",
      },
      {
        id: 15,
        image: media.projectImages.aIforUX.slide16,
        desc: "",
      },
      {
        id: 16,
        image: media.projectImages.aIforUX.slide17,
        desc: "I chose to have participants demo competitor apps because observing real interactions often reveals subtle usability patterns that interviews alone can miss. While Duolingo was the most familiar reference point, I focused on Talkpal’s conversational role play because its feedback panel closely mirrored the interaction flow I wanted to explore. This helped me ground my design in realistic user expectations rather than abstract assumptions.",
      },
      {
        id: 17,
        image: media.projectImages.aIforUX.slide18,
        desc: "Applying Nielsen’s heuristics at this stage allowed me to evaluate competitors through both a user-informed and principles-based lens. Because the observations were grounded in real participant behavior, the heuristic analysis felt less abstract and more actionable.\n\nI treated the AI-generated findings as a structured first pass, reviewing them critically and focusing on patterns that aligned with user friction points careful not to take every heuristic flag at face value.",
      },
      { id: 18, image: media.projectImages.aIforUX.slide19, desc: "" },
      {
        id: 19,
        image: media.projectImages.aIforUX.slide20,
        desc: "This was a key synthesis moment in the project. While users consistently valued both immersion and feedback, their preferences around timing often conflicted.",
      },
      {
        id: 20,
        image: media.projectImages.aIforUX.slide21,
        desc: "The dual-chat system emerged as a way to reconcile competing user preferences without compromising conversational flow. By separating immersion from reflection, the experience supports both immediate engagement and thoughtful review, allowing users to control when and how feedback appears.\n\nInsights from competitor analysis reinforced this direction. While Duolingo emphasized gamification and visibility at the expense of depth, and TalkPal prioritized realism with limited flexibility, my design intentionally combines immersive interaction with adaptable, user-directed feedback.\n\nThis framing positions the user as an active participant in their own learning. The student is supported rather than corrected, and guided rather than gamified.",
      },
      { id: 21, image: media.projectImages.aIforUX.slide22, desc: "" },
      {
        id: 22,
        image: media.projectImages.aIforUX.slide23,
        desc: "I framed the business objective around confidence-building rather than correctness alone. Fluency is as much about emotional comfort as it is about technical accuracy, so the core tasks were designed to support realistic practice without overwhelming users.\n\nGiving users control over feedback timing and depth was a deliberate choice to respect different learning styles and moments of readiness, reinforcing autonomy while still providing structured guidance.",
      },
      { id: 23, image: media.projectImages.aIforUX.slide24, desc: "" },
      { id: 24, image: media.projectImages.aIforUX.slide25, desc: "" },
      {
        id: 25,
        image: media.projectImages.aIforUX.slide26,
        desc: "I intentionally defined success beyond accuracy to reflect the emotional and experiential dimensions of language learning. If feedback feels disruptive or discouraging, users may disengage even if corrections are technically correct.\n\nBy pairing qualitative perception metrics with behavioral signals like session length and continuation, I aimed to evaluate whether the experience felt supportive, engaging, and worth returning to.",
      },
      { id: 26, image: media.projectImages.aIforUX.slide27, desc: "" },
      { id: 27, image: media.projectImages.aIforUX.slide28, desc: "" },
      {
        id: 28,
        image: media.projectImages.aIforUX.slide29,
        desc: "I treated this initial mockup as a low-commitment exploration rather than a validated solution. The goal was to externalize the dual-chat concept quickly and identify obvious layout and interaction questions before layering in research-driven refinements.\n\nBy acknowledging that this version reflected my assumptions, I was able to use it as a reference point for iteration.",
      },
      { id: 29, image: media.projectImages.aIforUX.slide30, desc: "" },
      {
        id: 30,
        image: media.projectImages.aIforUX.slide31,
        desc: "This phase forced me to confront the difference between a concept that works in theory and one that feels natural in practice. User feedback pushed me to prioritize conversational flow over feature visibility, even when that meant pulling instructional elements further into the background.",
      },
      {
        id: 31,
        image: media.projectImages.aIforUX.slide32,
        desc: "I treated feedback as something users should discover rather than endure. Designing these interactions became less about signaling correctness and more about preserving psychological safety, curiosity, and momentum during conversation.",
      },
      { id: 32, image: media.projectImages.aIforUX.slide33, desc: "" },
      {
        id: 33,
        image: media.projectImages.aIforUX.slide34,
        desc: "Designing an experience that feels human also increases the risk of users treating it as one. This slide reflects a tension I had to actively manage. Realism builds trust, but unchecked immersion can lead to oversharing.\n\nI see ethical design here not as a constraint, but as an extension of UX responsibility. This includes setting clear boundaries, protecting user data, and ensuring that familiarity never comes at the cost of safety or accessibility.",
      },
      { id: 34, image: media.projectImages.aIforUX.slide35, desc: "" },
      {
        id: 35,
        image: media.projectImages.aIforUX.slide36,
        desc: "AI did not replace my design process. It accelerated the parts that slow iteration while forcing me to stay more intentional about judgment. The speed gains were real, but so were the accuracy gaps, which meant I had to stay present, validate outputs, and synthesize insights myself.\n\nWhere AI helped most was in scaffolding. It supported organizing raw data, surfacing patterns, and visualizing ideas early. The responsibility for interpretation, prioritization, and decision-making remained mine. That balance is what made the workflow effective.",
      },
    ],
    tags: [
      "AI",
      "Figma",
      "ChatGPT",
      "NotebookLM",
      "UI/UX Design",
      "Case Study",
    ],
    category: "case study",
    slideDeck:
      "https://docs.google.com/presentation/d/e/2PACX-1vT-h5MEuYMgXqT9R9s_uTfRMhfdcL4OI06cAuHSUL9RE5Isz42xtbn1terLBqZW2KpED7zpCQFgNCEW/pub?start=true&loop=false&delayms=120000&slide=id.g389552280cb_0_295",
    contributors: [
      contributorJude,
      {
        name: "Rich Hultman",
        img: media.contributors.richHultman,
        linkedin: "https://www.linkedin.com/in/richhultman/",
        role: "Course Instructor",
      },
    ],
  },
  {
    id: 5,
    title: "RoyalTea",
    date: "September 2024 - April 2025",
    description:
      "I architected and built a foundational REST API with a database and simple UI for a royalty tracking system, which enabled my client to demo the product to investors and successfully secure a partnership with a more established organization in the industry.",
    slides: [
      {
        id: 0,
        image: media.projectImages.royaltea.homepage,
        desc: "Here, I collaborated with my client to refine and execute his product vision. Through consultations, product planning, and iterative demos, I transformed his early design into a scalable solution. I architected the system, built the backend API, and delivered a minimal user interface choosing technologies with scalability, modularity, and future features in mind.",
      },
    ],
    tags: [
      "React",
      "Node Js",
      "Express Js",
      "Firebase",
      "MongoDB",
      "CSS",
      "JavaScript",
    ],
    category: "web app",
    webapp: "https://royalty.technology/",
    contributors: [
      contributorJude,
      {
        name: "Gynell Journigan",
        img: media.contributors.journey,
        linkedin: "https://www.linkedin.com/in/journ3y/",
        role: "Founder/Product Owner",
      },
    ],
  },
  {
    id: 6,
    title: "CreatorsA2Z",
    date: "January 2025 - March 2025",
    description:
      "I collaborated with CreatorsA2Z to translate Figma mockups into a live MVP using Next.js and Tailwind. Through continuous consultations, iterative development, and user-tested refinements, I delivered a polished landing page now used to onboard new creative influencers to the platform.",
    slides: [
      {
        id: 0,
        image: media.projectImages.creatorsA2Z.homepage,
        desc: "Founder Diana Furka (my former VP of Design) approached me with a concept of a platfom she and her cofounders were designing. Given our prior experience working closely together at Emcee.com, She was confident in her decision to collaborate with me on the new product she was building. I was happy to accept the offer, and my role was to engineer her Figma designs into a live landing page. I collaborated with her to understand the user experience she wanted to create, and then built the landing page using Next.js and Tailwind CSS. I also provided ongoing consultations and iterative development to ensure that the final product met her vision and the needs of the target audience. She now uses this landing page to onboard new creative influencers to the platform solidifying their partnership.",
      },
    ],
    tags: ["React", "Next.js", "Tailwind", "CSS", "JavaScript", "Figma"],
    category: "web app",
    webapp: "https://creatorsa2z.com/",
    contributors: [
      contributorJude,
      {
        name: "Diana Furka",
        img: media.contributors.dianaFurka,
        linkedin: "https://www.linkedin.com/in/furka/",
        role: "Founder, Lead Designer",
      },
    ],
  },
  {
    id: 0,
    title: "Emcee.com",
    date: "Nov 2022 - Feb 2024",
    description:
      "A social e-commerce platform that aims to connect social-media influencers with fashion brands to facilitate affiliate marketing and sales.",
    slides: [
      {
        id: 0,
        image: media.projectImages.emcee.homepage,
        desc: "One of my major achievements at Emcee was when my team and I were tasked with replatforming the entire application from Vue to React. We were looking to take a mobile first approach, and it was more efficient to work with React and React Native for our Single Page Applications. My previous react knowledge proved useful because I was able to debug and explain React code to more senior members of my team who had expertise in other areas.",
      },
      {
        id: 1,
        image: media.projectImages.emcee.homepage2,
        desc: "More specifically, I was responsible for translating the legacy Vue code into React components that could be reused across the application. In the process, we took the opportunity to create a design system that would standardize things like spacing, font-sizes, brand colors, etc. across the site, and between other pods, e.g. the creator team.",
      },
      {
        id: 2,
        image: media.projectImages.emcee.homepage3,
        desc: "The team of designers with whom I collaborated did a complete redesign of the entire app, and I worked closely with them to build and implement the design system into the codebase using tailwind and storybook. I also introduced the design team to Zeroheight as a visual library for displaying component designs and Brand assets ranging from fonts, colors, and digital media to fully-fledged components.",
      },
      {
        id: 3,
        image: media.projectImages.emcee.pdp,
        desc: "The Product Display Page",
      },
      {
        id: 4,
        image: media.projectImages.emcee.mobile,
        desc: "Responsive design on mobile",
      },
      {
        id: 5,
        image: media.projectImages.emcee.search,
        desc: "Search Functionality",
      },
      {
        id: 6,
        image: media.projectImages.emcee.oldAbout,
        desc: "The previous slides contain screenshots of the new, fully-functioning app from my last day with the team. The following slides are screenshots from the website when I first I joined the company. In the 18 months that I contributed to this team, we came a long way, and turned a roadmap of ideas into a real-world product.",
      },
      {
        id: 7,
        image: media.projectImages.emcee.oldAbout2,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 8,
        image: media.projectImages.emcee.oldBrands,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 9,
        image: media.projectImages.emcee.oldBrands2,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 10,
        image: media.projectImages.emcee.oldBrands3,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 11,
        image: media.projectImages.emcee.oldBrands,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 12,
        image: media.projectImages.emcee.oldBrands2,
        desc: "(Before I joined EMCEE)",
      },
      {
        id: 13,
        image: media.projectImages.emcee.oldBrands3,
        desc: "(Before I joined EMCEE)",
      },
    ],
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Figma",
      "JavaScript",
      "Storybook",
      "GraphQL",
      "Jira",
    ],
    category: "web app",
    webapp: "https://emcee.com/",
    contributors: [
      contributorJude,
      {
        name: "Colton Savage",
        img: media.contributors.coltonSavage,
        linkedin: "https://www.linkedin.com/in/csavage1994/",
        role: "Engineer",
      },
      {
        name: "Liccy Fuentes",
        img: media.contributors.liccyFuentes,
        linkedin: "https://www.linkedin.com/in/l-f-64b9761b9/",
        role: "Engineer",
      },
      {
        name: "Daniel Martin",
        img: media.contributors.danielMartin,
        linkedin: "https://www.linkedin.com/in/dpmartintech/",
        role: "Engineer",
      },
      {
        name: "Jason Oliver",
        img: media.contributors.jasonOliver,
        linkedin: "https://www.linkedin.com/in/blueduckdigital/",
        role: "Product Manager",
      },
      {
        name: "Diana Furka",
        img: media.contributors.dianaFurka,
        linkedin: "https://www.linkedin.com/in/furka/",
        role: "VP of Design",
      },
      {
        name: "Jenn Gnuyen",
        img: media.contributors.jennGnuyen,
        linkedin: "https://www.linkedin.com/in/jenn00/",
        role: "Designer",
      },
      {
        name: "Greg Oxsen",
        img: media.contributors.gregOxsen,
        linkedin: "https://www.linkedin.com/in/gregory-oxsen/",
        role: "Designer",
      },
      {
        name: "Kyle Miller",
        img: media.contributors.kyleMiller,
        linkedin: "https://www.linkedin.com/in/kyle-miller-ba3851/",
        role: "VP of Engineering",
      },
    ],
  },
  {
    id: 4,
    title: "JudeGPT",
    date: "July 2024",
    description:
      "I trained and deployed an integrated chatbot using OpenAI's Assistants API to streamline the hiring process for recruiters and managers. Incorporated retrieval-augmented generation (RAG) to improve accuracy and relevance, while demonstrating my ability to quickly adapt to emerging AI technologies and trends.",
    slides: [
      {
        id: 0,
        image: media.projectImages.judeGPT.homepage,
        // desc: "During my job search, I wanted to showcase my ability to keep up with the latest technological trends, and find practical use cases for them. In November of 2023, OpenAI released ChatGPT, and it broke the internet. I bought a course on AI and Prompt engineering in December of 2023. Through it, I learned some of the possibilities for integrating AI into my workflow. I’d been keeping an eye on OpenAi’s gpt-3 since 2020, but with the launch of ChatGPT also came the Assistants API which enabled me to train my own GPT model on proprietary data.",
        desc: "During my job search, I set out to showcase my ability to quickly adapt to emerging technologies and apply them in practical ways. After OpenAI's release of ChatGPT in late 2023, I enrolled in an AI and prompt engineering course to deepen my understanding of integration possibilities. Having followed OpenAI's GPT models since 2020, I leveraged the newly launched Assistants API to build custom AI tools trained on proprietary data.",
        scannable:
          "Leveraged OpenAI's Assistants API to build custom AI tools, showcasing adaptability to emerging technologies.",
      },
      {
        id: 1,
        image: media.projectImages.judeGPT.playground,
        // desc: "I created an OpenAI assistant, and trained it on my resume, my website, and some other documents related to my professional background. I wrote and refined instructions for the assistant to improve the accuracy and efficiency of its responses. I also conducted beta testing with former colleagues and hiring managers to learn how I could further improve its performance.",
        desc: "I created a custom OpenAI assistant trained on my résumé, website, and professional documents. I refined its instructions to improve accuracy and efficiency, and conducted beta testing with colleagues and hiring managers to gather feedback and enhance performance.",
        scannable:
          "Built and refined an OpenAI assistant trained on proprietary professional data, tested with colleagues and hiring managers for accuracy.",
      },
      {
        id: 2,
        image: media.projectImages.judeGPT.docs,
        // desc: "The biggest challenge for me was integrating it into a functional chatbot that stores conversations for me to review later in a database. The Assistants API was still in beta, so there were not a lot of available resources on the internet. It took me two weeks of trial and error, researching alternate solutions, reading documentation, and replatforming to Next.js to accommodate my newly built Node backend with a MongoDB database.",
        desc: "Finally, I overcame the challenge of integrating my assistant into a functional chatbot with persistent conversation storage in a database. With limited resources available during the Assistants API beta, I spent two weeks testing alternate solutions, studying documentation, and ultimately replatforming to Next.js with a Node backend and MongoDB database.",
        scannable:
          "Integrated AI assistant into a chatbot with persistent storage using Next.js, Node, and MongoDB—navigating limited resources during the Assistants API beta.",
      },
    ],
    tags: [
      "React",
      "Next.js",
      "Node Js",
      "Express Js",
      "OpenAI",
      "Assistants API",
      "MongoDB",
      "CSS",
      "JavaScript",
      "Typescript",
      "AI",
      "Retrieval-Augmented Generation (RAG)",
    ],
    category: "web app",
    github: "https://github.com/Jude-Clarke/judeclarke",
    webapp: "/",
    contributors: [contributorJude],
  },
  {
    id: 1,
    title: "Shofolio",
    date: "Jan 2022 - Nov 2022",
    description:
      "I engineered a full-stack social portfolio platform for educators and learners to display their work.",
    slides: [
      {
        id: 0,
        image: media.projectImages.shofolio.mrClarkeProfile,
        desc: "When I realized how useful my Master Key Spanish website was in my own classrooms, I recognized an opportunity to build a platform providing my peers and other educators with the same set of tools. I started by making the homepage of Master Key Spanish customizable, but I quickly realized that what I needed was an entire redesign of the user interface.",
      },
      {
        id: 1,
        image: media.projectImages.shofolio.projectDP,
        desc: "I already had the backend with my own custom CMS, the next step was to reach out to a UI/UX Researcher. I met Christina Armand in an online coding community and from there we set up a series of product design meetings to discuss the details of the redesign, and the desired user experience. Once we finalized a design, I rewrote the entire user interface using HTML, EJS partials, CSS and JavaScript. I started with her design mockups, and then expanded the design to my own CMS and other pages.",
      },
      {
        id: 2,
        image: media.projectImages.shofolio.submission,
        desc: "During this process, I also worked closely with an educational consultant, Dr. Roderic Brame. One of the challenges for educators in STEM is showing off the work and progress students are making. Dr. Brame writes curriculum for STEM professionals with a heavy emphasis on project-based learning. I consulted him to determine which features would create the most value for the target user in the least amount of time. His expertise and demand for this type of software as a service meant that he was both a stakeholder and a wise counselor.",
      },
    ],
    //       Built off of the back end of Master Key Spanish, I designed architected Shofolio.com to be a portfolio-sharing, learning platform.

    // On the Back End:
    // I wrote the back-end code using the Express.js framework with Embedded JavaScript (ejs).
    // I designed the EJS templates and followed RESTful routing for the courses feature, comments, and the Projects pages.
    // I formatted the individual project pages to seamlessly integrate Google Slides presentations.
    // I included password authentication using Passport.js.
    // I validate form and input submissions using Joi.
    // I then store the data using MongoDB and Mongoose Schemas.
    // Many unreleased features on the way.

    // On the Front End:
    // I reached out to @christina.m.armand to discuss completely redesigning the user interface of shofolio.com for more of a social media user experience.
    // We had numerous standups to discuss progress and changes until we finalized a design.
    // I rewrote the code for the entire user interface using HTML, EJS partials, CSS and JavaScript.
    // I built based off of the design, and expanded it to my own CMS and other pages.

    tags: [
      "Node Js",
      "Express Js",
      "MongoDB",
      "JavaScript",
      "EJS",
      "NodeMailer",
      "Passport Js",
      "Google Maps SDKs",
      "Google Slides API",
    ],
    category: "web app",
    webapp: "https://shofolio.com/user/620a619b4e37fb0004ebd396",
    contributors: [
      contributorJude,
      {
        name: "Christina Aarmand",
        img: media.contributors.christinaArmand,
        linkedin: "https://www.linkedin.com/in/christina-armand/",
        role: "UI/UX Researcher",
      },
      {
        name: "Roderic Brame",
        img: media.contributors.rodericBrame,
        linkedin: "https://www.linkedin.com/in/roderic-brame-261b0a170/",
        role: "Educational Consultant",
      },
    ],
  },
  {
    id: 2,
    title: "Master Key Spanish",
    date: "May 2020 - Dec 2021",
    description:
      "I designed and built a full-stack blog that provides community resources.",
    slides: [
      {
        id: 0,
        image: media.projectImages.masterKeySpanish.homepage,
        desc: "I built this web application as a platform to show off the progress and accomplishments of the students in Bok Academy's Spanish program. I started off by designing it using Wordpress, and once I had a design that I liked. I rebuilt it using HTML, CSS, Bootstrap, Embedded Javascript, and Javascript. I wanted more control over the codebase and design. Once I had a static front-end site, I proceeded to build my own content management system for the backend.",
      },
      {
        id: 1,
        image: media.projectImages.masterKeySpanish.project,
        desc: "I built the backend CMS using Node.js with Express and Mongodb. Using RESTful routing, I am able to create, read, update, and delete content using the visual interface I built within the website. I used Passport.js and some extra layers of security to add authentication, meaning that once I logged into my account, I could upload photos, blog posts, resources, projects, and awards to the website without writing any additional code.",
      },
      {
        id: 2,
        image: media.projectImages.masterKeySpanish.slides,
        desc: "I formatted the individual project pages to seamlessly integrate Google Slides presentations.",
      },
      {
        id: 3,
        image: media.projectImages.masterKeySpanish.blog,
        desc: "On the front end, the user is able to create entire blog posts complete with a title, author, and date uploaded written in Plain text or HTML markup.",
      },
      {
        id: 4,
        image: media.projectImages.masterKeySpanish.blogPost,
        desc: "On the backend, I sanitize all of the inputs as a security measure against cross-site scripting (XSS) attacks, and format the html, images, embeds, and links to display as the blog content.",
      },
      {
        id: 5,
        image: media.projectImages.masterKeySpanish.references,
        desc: "",
      },
      {
        id: 6,
        image: media.projectImages.masterKeySpanish.contact,
        desc: "I configured the QuickChat feature to send the instructor direct emails using Mailgun.",
      },
      {
        id: 7,
        image: media.projectImages.masterKeySpanish.newsletter,
        desc: "For the newsletter, I used the Mailchimp API for developers.",
      },
      {
        id: 8,
        image: media.projectImages.masterKeySpanish.resources,
        desc: "Instructors can also upload resources for students and other teachers which can be sorted here. I also use local storage to remember which filter is selected in case the user wants to come back to this page in the future.",
      },
      {
        id: 9,
        image: media.projectImages.masterKeySpanish.about,
        desc: "At orientation, the instructor can use a QR code to direct parents and students to the About section.",
      },
    ],
    tags: [
      "MongoDB",
      "Node Js",
      "Express Js",
      "JavaScript",
      "EJS",
      "Passport Js",
      "NodeMailer",
      "Youtube API",
      "Google Slides API",
    ],
    category: "web app",
    webapp: "https://masterkeyspanish.com/",
    contributors: [contributorJude],
  },
  {
    id: 3,
    title: "Instagram Clone",
    date: "June 2024",
    description: "I built the instagram UI with some minor changes.",
    slides: [
      {
        id: 0,
        image: media.projectImages.igClone.homepage,
        desc: "",
      },
    ],
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    category: "web app",
    webapp: "https://hirejudeclarke.netlify.app",
    contributors: [contributorJude],
  },
];

export const TimeLineData = [
  { year: 2017, text: "Started my journey" },
  { year: 2018, text: "Worked as a freelance developer" },
  { year: 2019, text: "Founded JavaScript Mastery" },
  { year: 2020, text: "Shared my projects with the world" },
  { year: 2021, text: "Started my own platform" },
];
