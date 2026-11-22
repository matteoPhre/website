export interface Experience {
  role: string;
  company?: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Profile {
  handle: string;
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  summary: string;
  intro: string;
  languages: { name: string; level: string }[];
  skills: string[];
  certifications: string[];
  experience: Experience[];
  education: { school: string; degree: string; period: string }[];
}

export const profile: Profile = {
  handle: 'matteoPhre',
  name: 'Matteo Selleri',
  role: 'Full Stack Software Engineer',
  company: 'FAAC Technologies',
  location: 'Bologna, Emilia Romagna, Italy',
  email: 'matteo.selleri1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matteoselleri',
  github: 'https://github.com/matteoPhre',
  twitter: 'https://twitter.com/mattwoPhre',
  summary:
    'Programmer, information-systems designer, database administrator and data analyst. Full stack engineer with a decade of experience across .NET, Node.js and Angular, distributed systems, cloud-native architectures and CI/CD.',
  intro:
    'I design and build software end to end — from requirements and architecture to backend, frontend, deployment and production maintenance. I care about clean systems, testability and delivery that actually ships.',
  languages: [
    { name: 'Italian', level: 'Native' },
    { name: 'English', level: 'Professional working' },
  ],
  skills: [
    'TypeScript',
    'Node.js',
    'C# / .NET',
    'Angular',
    'Java / Spring Boot',
    'React',
    'Microservices',
    'CQRS & Event Sourcing',
    'RabbitMQ / MQTT / AMQP',
    'Docker / Kubernetes',
    'GCP',
    'Jenkins / CI-CD',
    'Bash / Linux',
    'SQL Server / MongoDB / Redis',
    'TDD',
    'Agile',
  ],
  certifications: [
    'Staying Sharp With AngularJS',
    'Shaping up with Angular.js',
    'Try Python',
  ],
  experience: [
    {
      role: 'Full Stack Software Engineer',
      company: 'FAAC Technologies',
      period: 'Nov 2020 — Present',
      location: 'Bologna, Italy',
      highlights: [
        'Delivered end-to-end access control product features, owning the full stack from requirements analysis to backend, frontend, CI/CD and production maintenance.',
        'Built scalable backend services with Node.js (TypeScript) and C# .NET alongside responsive Angular frontends.',
        'Designed and maintained CI/CD pipelines with Jenkins and Bash for reliable, repeatable deployments.',
        'Managed Linux environments (Debian, Ubuntu): deployment, configuration and runtime stability.',
      ],
    },
    {
      role: 'Full Stack Engineer',
      company: 'Gruppo SCAI — Consulenza Aziendale Informatica',
      period: 'Aug 2020 — Nov 2020',
      location: 'Bologna, Italy',
      highlights: [
        'Cloud-native architecture and portal development for online event management.',
        'CQRS, Outbox pattern, distributed cache, RabbitMQ cluster, Consul service discovery, ELK stack, .NET Core 3.1, SQL Server, MongoDB, Redis, Ocelot gateway, Docker, Kubernetes and GCP.',
      ],
    },
    {
      role: 'Full Stack Engineer',
      company: 'Gruppo SCAI — Consulenza Aziendale Informatica',
      period: 'Jan 2018 — Nov 2020',
      location: 'Bologna, Italy',
      highlights: [
        'Designed and developed an IIoT 4.0 compliant architecture (Node.js, MongoDB, MQTT, AMQP, Redis, OPC-UA, React, Vue.js, .NET Core, Docker, Kubernetes).',
      ],
    },
    {
      role: 'Senior Backend Developer',
      period: 'Mar 2020 — Apr 2020',
      location: 'Bologna, Italy',
      highlights: [
        'Backend for an algae and sea-plant recognition application (C#, ASP.NET Core 3.1, SQL Server).',
      ],
    },
    {
      role: 'Senior Analyst — Developer',
      period: 'Nov 2019 — Jan 2020',
      location: 'Bologna, Italy',
      highlights: [
        'Asynchronous multithread job design and development (Java 11, Spring Boot, MongoDB).',
      ],
    },
    {
      role: 'Designer & Instructor',
      period: 'Sep 2019 — Oct 2019',
      location: 'Bologna, Italy',
      highlights: [
        'Designed and delivered a 240-hour training programme: Java, Spring, SQL, HTML, CSS, JavaScript, React, Git and Agile practices.',
      ],
    },
    {
      role: 'Software Developer (WPF)',
      period: 'Sep 2017 — Jan 2018',
      location: 'Bologna, Italy',
      highlights: ['WPF development using the MVVM pattern and Telerik UI.'],
    },
    {
      role: 'Web Developer — Java / AngularJS',
      period: 'Oct 2016 — Sep 2017',
      location: 'Bologna, Italy',
      highlights: [
        'Portal development: Java, Spring, Thymeleaf, third-party service abstractions, AngularJS and SASS.',
      ],
    },
    {
      role: 'Web Developer — .NET',
      period: 'Sep 2015 — Sep 2016',
      location: 'Bologna, Italy',
      highlights: [
        'Athlete and training management portal: C# NancyFx REST APIs, MongoDB, GrayLog, TypeScript, AngularJS 1.6, Grunt and SASS.',
      ],
    },
    {
      role: 'Web Developer — .NET',
      period: 'Jul 2015 — Sep 2015',
      location: 'Bologna, Italy',
      highlights: [
        'Training and certification web app (C#, ASP.NET MVC, MySQL) in a four-person Agile team.',
      ],
    },
    {
      role: 'Accountant',
      company: 'Samsara Beach',
      period: 'Jul 2013 — Aug 2015',
      location: 'Gallipoli, Italy',
      highlights: ['Personal accounts management and bar station.'],
    },
    {
      role: 'Intern',
      company: 'La piccola Carovana',
      period: 'Jun 2013 — May 2014',
      location: 'Crevalcore, Italy',
      highlights: [
        'Logistics and route optimisation, pre-sorting and plastic packaging selection.',
      ],
    },
  ],
  education: [
    {
      school: 'Università di Bologna',
      degree: 'Laurea L — Ingegneria dei Processi Gestionali',
      period: '2007 — 2015',
    },
  ],
};
