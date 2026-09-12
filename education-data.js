/*
  UniHub education directory — North Macedonia IT-related higher education.
  Keep this file as the single source of truth for onboarding, filters and uploads.
  Programme names can be expanded as universities publish new accredited curricula.
*/
window.UNIHUB_EDUCATION = [
  {
    id: 'ukim', shortName: 'UKIM', name: 'Ss. Cyril and Methodius University in Skopje', city: 'Skopje',
    faculties: [
      { id: 'finki', shortName: 'FINKI', name: 'Faculty of Computer Science and Engineering', programs: [
        'Software Engineering and Information Systems', 'Computer Science', 'Computer Engineering',
        'Internet, Networks and Security', 'Applied Information Technologies', 'Professional Informatics'
      ]},
      { id: 'feit', shortName: 'FEIT', name: 'Faculty of Electrical Engineering and Information Technologies', programs: [
        'Computer Technologies and Engineering', 'Computer System Engineering, Automation and Robotics',
        'Telecommunications and Information Engineering', 'Power Engineering and Information Technologies'
      ]},
      { id: 'pmf-ukim', shortName: 'PMF', name: 'Faculty of Natural Sciences and Mathematics — Institute of Mathematics', programs: [
        'Mathematics and Informatics', 'Applied Mathematics', 'Mathematical Informatics'
      ]}
    ]
  },
  {
    id: 'seeu', shortName: 'SEEU', name: 'South East European University', city: 'Tetovo / Skopje',
    faculties: [
      { id: 'seeu-cst', shortName: 'CST', name: 'Faculty of Contemporary Sciences and Technologies', programs: [
        'Computer Sciences', 'Software Engineering', 'Data Science', 'Computer Engineering',
        'Business Informatics', 'Software and Application Development', 'Information and Communication Technologies'
      ]}
    ]
  },
  {
    id: 'ugd', shortName: 'UGD', name: 'Goce Delčev University', city: 'Štip',
    faculties: [
      { id: 'ugd-fi', shortName: 'FI', name: 'Faculty of Computer Science', programs: [
        'Computer Engineering and Technologies', 'Computer Sciences', 'Business Informatics'
      ]}
    ]
  },
  {
    id: 'uklo', shortName: 'UKLO', name: 'St. Kliment Ohridski University — Bitola', city: 'Bitola',
    faculties: [
      { id: 'fikt', shortName: 'FICT', name: 'Faculty of Information and Communication Technologies', programs: [
        'Computer Science and Engineering', 'Information and Communication Technologies',
        'Computer Engineering', 'Software Engineering and Information Systems'
      ]}
    ]
  },
  {
    id: 'unite', shortName: 'UT', name: 'University of Tetova', city: 'Tetovo',
    faculties: [
      { id: 'unite-pmf', shortName: 'FNSM', name: 'Faculty of Natural Sciences and Mathematics — Informatics', programs: [
        'Computer Science', 'Professional Informatics', 'Business Informatics'
      ]}
    ]
  },
  {
    id: 'unt', shortName: 'MTU', name: 'Mother Teresa University in Skopje', city: 'Skopje',
    faculties: [
      { id: 'unt-informatics', shortName: 'FI', name: 'Faculty of Informatics', programs: [
        'Informatics', 'Computer Science', 'Software Engineering', 'Information and Communication Technologies'
      ]}
    ]
  },
  {
    id: 'uist', shortName: 'UIST', name: 'University of Information Science and Technology “St. Paul the Apostle”', city: 'Ohrid',
    faculties: [
      { id: 'uist-cse', shortName: 'CSE', name: 'Faculty of Computer Science and Engineering', programs: [
        'Computer Science and Engineering', 'Software Engineering'
      ]},
      { id: 'uist-cn', shortName: 'CNS', name: 'Faculty of Communication Networks and Security', programs: [
        'Communication Networks and Security', 'Cyber Security'
      ]},
      { id: 'uist-isvma', shortName: 'ISVMA', name: 'Faculty of Information Systems, Visualization, Multimedia and Animation', programs: [
        'Information Systems', 'Visualization, Multimedia and Animation', 'Digital Media Technology'
      ]},
      { id: 'uist-aitmir', shortName: 'AITMIR', name: 'Faculty of Applied IT, Machine Intelligence and Robotics', programs: [
        'Applied Information Technologies', 'Machine Intelligence and Robotics', 'Artificial Intelligence'
      ]}
    ]
  },
  {
    id: 'ibu', shortName: 'IBU', name: 'International Balkan University', city: 'Skopje',
    faculties: [
      { id: 'ibu-engineering', shortName: 'FE', name: 'Faculty of Engineering', programs: [
        'Computer Engineering', 'Artificial Intelligence Engineering'
      ]}
    ]
  },
  {
    id: 'uacs', shortName: 'UACS', name: 'University American College Skopje', city: 'Skopje',
    faculties: [
      { id: 'uacs-scsit', shortName: 'SCSIT', name: 'School of Computer Science and Information Technology', programs: [
        'Computer Science', 'Software Engineering', 'Management of Information Systems',
        'Computer Networks', 'Cybersecurity'
      ]}
    ]
  },
  {
    id: 'aue-fon', shortName: 'AUE-FON', name: 'American University of Europe — FON', city: 'Skopje',
    faculties: [
      { id: 'fon-ict', shortName: 'FICT', name: 'Faculty of Information and Communication Technologies', programs: [
        'Software Engineering', 'Computer Science', 'Information and Communication Technologies'
      ]}
    ]
  },
  {
    id: 'mit', shortName: 'MIT', name: 'MIT University Skopje', city: 'Skopje',
    faculties: [
      { id: 'mit-cst', shortName: 'FCST', name: 'Faculty of Computer Sciences and Technologies', programs: [
        'Computer Science and Technology', 'Software Engineering', 'Information Systems'
      ]}
    ]
  },
  {
    id: 'other', shortName: 'OTHER', name: 'Another accredited university', city: 'North Macedonia',
    faculties: [
      { id: 'other-it', shortName: 'IT', name: 'Another IT-related faculty or school', programs: [
        'Other accredited IT-related study programme'
      ]}
    ]
  }
];

window.getUniHubUniversity = id => window.UNIHUB_EDUCATION.find(u => u.id === id);
window.getUniHubFaculty = (universityId, facultyId) =>
  window.getUniHubUniversity(universityId)?.faculties.find(f => f.id === facultyId);
