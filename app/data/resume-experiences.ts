export type ResumeExperiences = {
  title: string;
  company: string;
  detail: string;
  time: string;
  jobDescription: string;
  type: string;
  linkUrl: string;
  gitUrl: string;
};

export const resumeExperiences = [
  {
    title: "Software Engineer | JavaScript, ReactJS, Express, MongoDB",
    company: "BlackRock Design Haus",
    detail: "Mississauga, ON",
    time: "Sept. 2022 - Present",
    descriptionOne:
      "Develop and maintain web applications using ReactJS, TypeScript, MySQL, MongoDB, AWS and Google Cloud.",
    descriptionTwo:
      "Collaborate with all parties to design and implement software solutions that meet or exceed customers' needs.",
    decriptionThree:
      "Write clean, maintainable, and testable code. Red-to-green testing is not nice to have, it's a requirement.",
    descriptionFour:
      "Stay up-to-date with emerging technologies and industry trends by participating in online newsletters. Or contribute to the development of best practices in the industry by attending in-person events/seminars regularly.",
    type: "resume-software-engineer",
    linkUrl: "https://joshlehman.ca/",
    gitUrl: "https://github.com/joshl26",
  },

  {
    title: "Senior Mech. Design Engineer | Robotics/Automation",
    company: "Cousins Packaging",
    detail: "Mississauga, ON",
    time: "April 2018 - April 2022",
    descriptionOne:
      "Created customAutoCAD LISP routines to take CAD drawings fromAutodesk Inventor and convert them to native AutoCAD 2000 file type. The layers, line colors, type, and weights were adjusted while conforming to the company's standards which were precise and pre-determined by years of experience.",
    descriptionTwo:
      "Created detailed large assembly BOMs and Drawing packages containing engineering specifications for each component. Material requirements are shown in detailed BOMs. The number of drawings per machine would routinely exceed 200+ pages. Often times I created new parts/assemblies, requiring new drawings/specs per individual job requirement.",
    descriptionThree: "",
    descriptionFour: "",
    type: "resume-engineering-experience",
    linkUrl: "",
    gitUrl: "",
  },
  {
    title: "Junior Mech. Design Engineer | JuniorWeb Dev",
    company: "Nye Manufacturing",
    detail: "Mississauga, ON",
    time: "Oct. 2006 - Feb. 2018",
    descriptionOne:
      "Coded custom SQL queries/views/detailed cost reports using Crystal in conjunction with Infor VISUAL Manufacturing CRM SQL Server database to produce stunning, live data cost reports for the CEO of the company.",
    descriptionTwo:
      "Developed customVB applications to allow the Engineering Department to interface with SolidWorks 3D CAD design software. The program opens a newwindowwithin the SolidWorks application. This window has multiple sliders and input boxes that allow live control of model constraints. This was solved using SolidWork's built-in API.",
    descriptionThree:
      "Facilitated the design of newmajor product lines: Excavator mounted Engine Block Extractor/Crusher; 360 degrees rotating custom hydraulic attachment for extracting and processing used automobile engines into finer sortable sizes.",
    descriptionFour: "",
    type: "resume-engineering-experience",
    linkUrl: "",
    gitUrl: "",
  },

  {
    title: "McMaster University",
    company:
      "B.Tech, Bachelor of Engineering Technology **(click to see degree)**",
    detail: "Hamilton, ON",
    time: "Sept. 2004 - June 2006",
    descriptionOne:
      "Theoretical focus on Engineering Tech. with more of an emphasis on C++ Programming and Advanced Mathematics.",
    descriptionTwo:
      "Finite Element Analysis, Data Structures and Algorithms, Robotics and Industrial Control Systems (PID).",
    descriptionThree: "",
    descriptionFour: "",
    type: "resume-education",
    linkUrl:
      "https://www.linkedin.com/in/joshrlehman/details/education/1635517112709/single-media-viewer/?profileId=ACoAAAezGnMBBQ7Kllx8EGGOnewtapgsFLreC9s",
    gitUrl: "",
  },
  {
    title: "Mohawk College",
    company:
      "Dipl.T, Advanced Engineering Technologist Diploma **(click to see diploma)**",
    detail: "Hamilton, ON",
    time: "Sept. 2001 - June 2004",
    descriptionOne:
      "Hands-on with focus on Mechanical Engineering and exposure to Robotics/Computer Programming.",
    descriptionTwo:
      "Completed 2 work terms as a co-op student at manufacturing companies in their Engineering Department.",
    descriptionThree: "",
    descriptionFour: "",
    type: "resume-education",
    linkUrl:
      "https://www.linkedin.com/in/joshrlehman/details/education/1635517114601/single-media-viewer/?profileId=ACoAAAezGnMBBQ7Kllx8EGGOnewtapgsFLreC9s",
    gitUrl: "",
  },
  {
    title: "Professional Statement",
    company: "",
    detail: "",
    time: "",
    descriptionOne:
      "I am exceptionally passionate about creating effectual and scalable software engineering solutions to real-world problems. At this time, I am searching for my first Software Engineering position. Throughout the last seventeen years of product advancement and life-cycle development in Mechanical Engineering, I have developed a solid understanding that will be valuable in any programming position. For the past six years, I’ve honed my coding skillsets bymastering numerous languages. This talent has been used to create a stunning portfolio of web applications and websites. My strong communication ability is optimalwhen collaborating with teams. This has been reinforced byworking in group settings during my career as an Engineer. Pairing these experiences with heightened attention to detailmakes me an excellent candidate for filling any go-to Software Engineering role. Furthermore, I am commited to learning new technologies so that I can achieve success in all environments quickly.",
    descriptionTwo: "",
    descriptionThree: "",
    descriptionFour: "",
    type: "resume-professional-statement",
    linkUrl: "",
    gitUrl: "",
  },
  {
    title: "Electronics Inventory | Node, ReactJS, Redux, MongoDB",
    company: "Full Stack Inventory/ERP Control App",
    detail: "Commercial",
    time: "Sept. 2022 - Present",
    descriptionOne:
      "Electronics Inventory is a full-stack web-app project where users can keep track of an electronics lab inventory.",
    descriptionTwo:
      "With thousands of small components its easy to lose track of where and howmany of each part currently in stock.",
    descriptionThree:
      "This app allows full control over you inventory, from anywhere in the world. In order to use the App portion of the website, you must have an account. Login here: **https://el-in.ca/login** with Username - DEMO, Password - DEMO.",
    descriptionFour: "",
    type: "resume-technical-project",
    linkUrl: "https://el-in.ca",
    gitUrl: "https://github.com/joshl26/electronics-inventory-frontend",
  },
  {
    title: "Outdoorsy | ReactJS, Express, Axios, Passport, AWS",
    company: "Full Stack Social App for Campers/Hikers",
    detail: "Open Source",
    time: "Sept. 2022 - Present",
    descriptionOne:
      "Outdoorsy is a full-stack web-app project where users can create and review campgrounds around the world.",
    descriptionTwo:
      "In order to review or create a campground, you must have an account which can be created with a valid email.",
    descriptionThree:
      "This project was coded from scratch as part of Colt Steeles Full StackWeb Developer course.",
    descriptionFour: "",
    type: "resume-technical-project",
    linkUrl: "https://outdors.ca",
    gitUrl: "https://github.com/joshl26/Outdoorsy",
  },
  {
    title: "Pomofocus | Redux, CSS3, HTML5",
    company: "Frontend Pomodor Timer App",
    detail: "Personal Project",
    time: "Dec. 2022 - Oct. 2023",
    descriptionOne:
      "A full featured Pomodoro timer clone based on the infamous Pomofocus app which is user customizable.",
    descriptionTwo:
      "My introduction to Frontend web development utilizing ReactJS for frontend code/Redux for state managment.",
    descriptionThree: "",
    descriptionFour: "",
    type: "resume-technical-project",
    linkUrl: "https://joshlehman.ca/pomodor/",
    gitUrl: "https://github.com/joshl26/pomodoro-app",
  },
];
