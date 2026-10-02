(function () {
    const LANG_KEY = 'unihub-language';
    const DEFAULT_LANG = 'en';

    const dictionaries = {
        sq: {
            'About': 'Rreth nesh',
            'Contact': 'Kontakt',
            'ABOUT UNIHUB': 'RRETH UNIHUB',
            'Built to make student life simpler.': 'Ndërtuar për ta bërë jetën studentore më të thjeshtë.',
            'OUR PURPOSE': 'QËLLIMI YNË',
            'Learn. Connect. Grow.': 'Mëso. Lidhu. Zhvillohu.',
            'MEET THE TEAM': 'NJOHU ME EKIPIN',
            'The students behind UniHub.': 'Studentët pas UniHub.',
            'Project team member': 'Anëtar i ekipit të projektit',
            'CONTACT UNIHUB': 'KONTAKTO UNIHUB',
            'Questions, ideas or feedback?': 'Pyetje, ide ose komente?',
            'Project': 'Projekti',
            'Team': 'Ekipi',
            'Location': 'Lokacioni',
            'Focus': 'Fokusi',
            'SEND A MESSAGE': 'DËRGO MESAZH',
            'We would love to hear from you.': 'Do të donim të dëgjonim nga ti.',
            'Name': 'Emri',
            'Email': 'Email',
            'Subject': 'Subjekti',
            'Message': 'Mesazhi',
            'Choose a subject': 'Zgjidh një subjekt',
            'General question': 'Pyetje e përgjithshme',
            'Feedback': 'Koment',
            'Report an issue': 'Raporto një problem',
            'Partnership or event': 'Partneritet ose event',
            'Send message': 'Dërgo mesazh',
            'Privacy': 'Privatësia',
            'Terms': 'Kushtet',
            'Features': 'Funksionet',
            'UniHub — Your Student Life, Connected': 'UniHub — Jeta jote studentore, e lidhur',
            'UniHub — Everything for Students': 'UniHub — Gjithçka për studentët',
            'Sign in — UniHub': 'Hyr — UniHub',
            'Create account — UniHub': 'Krijo llogari — UniHub',
            'Personalize UniHub': 'Personalizo UniHub',
            'Universities': 'Universitetet',
            'Stories': 'Historitë',
            'FAQ': 'Pyetje',
            'Sign in': 'Hyr',
            'Create account': 'Krijo llogari',
            'BUILT BY STUDENTS, FOR STUDENTS': 'NDËRTUAR NGA STUDENTËT, PËR STUDENTËT',
            'Everything students need.': 'Gjithçka që u duhet studentëve.',
            'One intelligent platform.': 'Një platformë inteligjente.',
            'UniHub brings learning resources, previous exams, internships, events, teammates, roommates and campus announcements into one connected student ecosystem.': 'UniHub bashkon materiale mësimore, provime të mëparshme, praktika, evente, bashkëpunëtorë, bashkëbanues dhe njoftime në një ekosistem studentor.',
            'Create your free account ↗': 'Krijo llogarinë falas ↗',
            'Explore features': 'Shiko funksionet',
            'PERSONALIZED FOR YOU': 'PERSONALIZUAR PËR TY',
            'Good evening, User': 'Mirëmbrëma, përdorues',
            'What are you looking for today?': 'Çfarë po kërkon sot?',
            'Course resources': 'Materiale të lëndëve',
            'New notes for your subjects': 'Shënime të reja për lëndët e tua',
            'Career matches': 'Mundësi karriere',
            '2 internships fit your profile': '2 praktika përshtaten me profilin tënd',
            'Events nearby': 'Evente afër teje',
            '3 upcoming this week': '3 këtë javë',
            'Team matches': 'Përputhje ekipi',
            '95% compatibility': '95% përputhshmëri',
            'New internship posted': 'U publikua praktikë e re',
            '95% teammate match': '95% përputhje me bashkëpunëtor',
            'THE STUDENT ECOSYSTEM': 'EKOSISTEMI STUDENTOR',
            'Not another university portal.': 'Jo thjesht një portal tjetër universitar.',
            'A platform students enjoy using.': 'Një platformë që studentët e përdorin me kënaqësi.',
            'Notes & summaries': 'Shënime dhe përmbledhje',
            'Upload, discover, rate and save resources organized by university, faculty, course and semester.': 'Ngarko, zbulo, vlerëso dhe ruaj materiale të organizuara sipas universitetit, fakultetit, lëndës dhe semestrit.',
            'Previous exams': 'Provime të mëparshme',
            'Practice with past exams, difficulty ratings, solution availability and useful student feedback.': 'Ushtro me provime të kaluara, vlerësime vështirësie, zgjidhje dhe komente të dobishme nga studentët.',
            'Internships': 'Praktika',
            'Find verified student-friendly opportunities matched to your interests, skills and location.': 'Gjej mundësi të verifikuara për studentë sipas interesave, aftësive dhe lokacionit tënd.',
            'IT events': 'Evente IT',
            'Never miss hackathons, workshops, meetups, conferences and networking opportunities.': 'Mos humb hackathone, punëtori, takime, konferenca dhe mundësi rrjetëzimi.',
            'Team finder': 'Gjetës ekipi',
            'Meet compatible students for hackathons, assignments, startups and personal projects.': 'Njihu me studentë të përshtatshëm për hackathone, detyra, startupe dhe projekte personale.',
            'Roommates & housing': 'Bashkëbanues dhe banim',
            'Discover student-friendly rooms and connect with potential roommates more easily.': 'Zbulo dhoma për studentë dhe lidhu më lehtë me bashkëbanues të mundshëm.',
            'MADE FOR EVERY CAMPUS': 'PËR ÇDO KAMPUS',
            'Your university belongs here.': 'Universiteti yt e ka vendin këtu.',
            'STUDENT STORIES': 'HISTORI STUDENTORE',
            'Built around real student needs.': 'Ndërtuar rreth nevojave reale të studentëve.',
            'Software engineering student': 'Student i inxhinierisë softuerike',
            'Computer science student': 'Student i shkencave kompjuterike',
            'Second-year student': 'Student i vitit të dytë',
            'Questions students usually ask.': 'Pyetje që studentët bëjnë shpesh.',
            'Is UniHub free for students?': 'A është UniHub falas për studentët?',
            'Yes. The student account and core platform are designed to be free.': 'Po. Llogaria studentore dhe platforma kryesore janë menduar të jenë falas.',
            'Which universities can join?': 'Cilat universitete mund të bashkohen?',
            'UniHub includes IT-related faculties and study programmes from public and private universities across North Macedonia, with an “Other” option so no accredited IT student is excluded.': 'UniHub përfshin fakultete dhe programe studimi të lidhura me IT nga universitete publike dhe private në Maqedoninë e Veriut, me opsionin “Tjetër” që asnjë student i akredituar i IT-së të mos përjashtohet.',
            'Can students upload notes and exams?': 'A mund të ngarkojnë studentët shënime dhe provime?',
            'Yes. Logged-in students can contribute resources, while moderation and reporting keep content organized.': 'Po. Studentët e kyçur mund të kontribuojnë materiale, ndërsa moderimi dhe raportimi e mbajnë përmbajtjen të organizuar.',
            'Ready to make university easier?': 'Gati ta bësh universitetin më të lehtë?',
            'Create your student profile and receive resources, events and opportunities matched to your university, year and interests.': 'Krijo profilin studentor dhe merr materiale, evente dhe mundësi sipas universitetit, vitit dhe interesave të tua.',
            'Join UniHub': 'Bashkohu me UniHub',
            'Privacy · Terms · Contact': 'Privatësia · Kushtet · Kontakti',

            'WELCOME BACK': 'MIRË SE U KTHEVE',
            'Your university life,': 'Jeta jote universitare,',
            'ready when you are.': 'gati kur je edhe ti.',
            'Continue where you left off and see everything personalized for your faculty, year and interests.': 'Vazhdo aty ku e le dhe shiko gjithçka të personalizuar për fakultetin, vitin dhe interesat e tua.',
            'New materials for your courses': 'Materiale të reja për lëndët e tua',
            'Internships matching your profile': 'Praktika që përputhen me profilin tënd',
            'Students looking for teammates': 'Studentë që kërkojnë bashkëpunëtorë',
            'UniHub · Student platform for North Macedonia': 'UniHub · Platformë studentore për Maqedoninë e Veriut',
            'STUDENT ACCOUNT': 'LLOGARI STUDENTORE',
            'Sign in to UniHub': 'Hyr në UniHub',
            'Use any demo email and password to preview the logged-in platform.': 'Përdor çfarëdo emaili dhe fjalëkalimi demo për të parë platformën.',
            'G Continue with Google': 'G Vazhdo me Google',
            'OR CONTINUE WITH EMAIL': 'OSE VAZHDO ME EMAIL',
            'EMAIL': 'EMAIL',
            'PASSWORD': 'FJALËKALIMI',
            'New to UniHub?': 'I ri në UniHub?',
            'Create an account': 'Krijo llogari',
            'JOIN THE COMMUNITY': 'BASHKOHU ME KOMUNITETIN',
            'Build a smarter': 'Ndërto një përvojë',
            'student experience.': 'studentore më të zgjuar.',
            'Your account personalizes resources, opportunities, events and people around what you study.': 'Llogaria jote personalizon materiale, mundësi, evente dhe njerëz sipas asaj që studion.',
            'Choose your university and faculty': 'Zgjidh universitetin dhe fakultetin',
            'Personalize your interests and skills': 'Personalizo interesat dhe aftësitë',
            'Unlock your student dashboard': 'Hap panelin tënd studentor',
            'Free student account · Demo version': 'Llogari falas studentore · Version demo',
            'CREATE ACCOUNT': 'KRIJO LLOGARI',
            'Join UniHub': 'Bashkohu me UniHub',
            'Create your demo account, then complete the personalization flow.': 'Krijo llogarinë demo dhe pastaj plotëso personalizimin.',
            'G Sign up with Google': 'G Regjistrohu me Google',
            'OR USE EMAIL': 'OSE PËRDOR EMAIL',
            'FULL NAME': 'EMRI I PLOTË',
            'Already have an account?': 'Ke tashmë llogari?',

            'PERSONALIZE YOUR EXPERIENCE': 'PERSONALIZO PËRVOJËN TËNDE',
            'Let UniHub get to know you.': 'Lejo UniHub të të njohë.',
            'This determines the notes, exams, opportunities, events and students shown on your dashboard.': 'Kjo përcakton shënimet, provimet, mundësitë, eventet dhe studentët që shfaqen në panelin tënd.',
            'Choose your university': 'Zgjidh universitetin',
            'Every listed institution offers at least one IT-related study path.': 'Çdo institucion i listuar ofron të paktën një drejtim studimi të lidhur me IT.',
            'Choose your faculty or school': 'Zgjidh fakultetin ose shkollën',
            'Only IT-related faculties from your university will appear.': 'Do të shfaqen vetëm fakultetet e lidhura me IT nga universiteti yt.',
            'Choose your study programme': 'Zgjidh programin e studimit',
            'This helps UniHub recommend the most relevant subjects and resources.': 'Kjo e ndihmon UniHub të rekomandojë lëndët dhe materialet më relevante.',
            'Choose your study year': 'Zgjidh vitin e studimit',
            'Your year controls which course materials and exam archives appear first.': 'Viti yt përcakton cilat materiale dhe arkiva provimesh shfaqen së pari.',
            'Year 1': 'Viti 1',
            'First year': 'Viti i parë',
            'Year 2': 'Viti 2',
            'Second year': 'Viti i dytë',
            'Year 3': 'Viti 3',
            'Third year': 'Viti i tretë',
            'Year 4': 'Viti 4',
            'Fourth year': 'Viti i katërt',
            'Postgraduate': 'Pasuniversitar',
            "Master's or doctoral studies": 'Studime master ose doktorature',
            'Select your interests': 'Zgjidh interesat',
            'Choose as many as you like.': 'Zgjidh sa të duash.',
            'Artificial Intelligence': 'Inteligjenca artificiale',
            'AI, ML and data': 'AI, ML dhe të dhëna',
            'Web Development': 'Zhvillim web',
            'Frontend and backend': 'Frontend dhe backend',
            'Cybersecurity': 'Siguri kibernetike',
            'Security and networks': 'Siguri dhe rrjete',
            'Software Engineering': 'Inxhinieri softuerike',
            'Architecture and product development': 'Arkitekturë dhe zhvillim produkti',
            'Data Science': 'Shkenca e të dhënave',
            'Analytics and intelligent systems': 'Analitikë dhe sisteme inteligjente',
            'UI/UX Design': 'Dizajn UI/UX',
            'Product and interaction design': 'Dizajn produkti dhe ndërveprimi',
            'Game Development': 'Zhvillim lojërash',
            'Graphics, engines and interactive media': 'Grafikë, motorë dhe media interaktive',
            'Robotics': 'Robotikë',
            'Automation and embedded systems': 'Automatizim dhe sisteme të integruara',
            'Back': 'Mbrapa',
            'Continue': 'Vazhdo',
            'Open my dashboard': 'Hap panelin tim',
            'Choose at least one interest to continue.': 'Zgjidh të paktën një interes për të vazhduar.',
            'Please choose one option to continue.': 'Zgjidh një opsion për të vazhduar.',

            'PLATFORM': 'PLATFORMA',
            'Dashboard': 'Paneli',
            'Find teammates': 'Gjej bashkëpunëtorë',
            'Find roommates': 'Gjej bashkëbanues',
            'Announcements': 'Njoftime',
            'My profile': 'Profili im',
            'Student': 'Student',
            'Your faculty · Study year': 'Fakulteti yt · Viti i studimit',
            'Search UniHub...': 'Kërko në UniHub...',
            '+ Create': '+ Krijo',
            'MONDAY, 27 JULY': 'E HËNË, 27 KORRIK',
            'Here is what is happening across your student network today.': 'Ja çfarë po ndodh sot në rrjetin tënd studentor.',
            'Customize dashboard': 'Personalizo panelin',
            'UNI ASSISTANT': 'ASISTENTI UNI',
            'Smart discovery': 'Zbulim inteligjent',
            'Ask naturally. UniHub will guide you to notes, exams, internships, events, teammates, roommates or announcements.': 'Pyet natyrshëm. UniHub do të të drejtojë te shënimet, provimet, praktikat, eventet, bashkëpunëtorët, bashkëbanuesit ose njoftimet.',
            'Find it': 'Gjeje',
            'Internships in Skopje': 'Praktika në Shkup',
            'Upcoming hackathons': 'Hackathone të ardhshme',
            'Calculus notes': 'Shënime kalkulusi',
            'Java teammates': 'Bashkëpunëtorë Java',
            'YOUR FEED': 'RRJEDHA JOTE',
            'Fresh from the student community': 'Të rejat nga komuniteti studentor',
            'View all activity →': 'Shiko gjithë aktivitetin →',
            'STUDY MATERIAL': 'MATERIAL STUDIMI',
            'Algorithms and Data Structures — Complete Exam Collection': 'Algoritme dhe struktura të të dhënave — Koleksion i plotë provimesh',
            'I organized all previous exams from 2021–2025 and added short solution hints.': 'I organizova të gjitha provimet nga 2021-2025 dhe shtova udhëzime të shkurtra për zgjidhje.',
            'Open ↗': 'Hap ↗',
            'Like': 'Pëlqe',
            'Liked': 'Pëlqyer',
            'Share': 'Ndaje',
            'TEAM REQUEST': 'KËRKESË EKIPI',
            'Looking for one UI/UX designer for Code by the Lake': 'Kërkohet një dizajner UI/UX për Code by the Lake',
            'We are building a student budgeting app and need one designer available on 3–4 August.': 'Po ndërtojmë një aplikacion buxheti për studentë dhe na duhet një dizajner më 3-4 gusht.',
            'View ↗': 'Shiko ↗',
            'Upcoming deadlines': 'Afatet e ardhshme',
            'Frontend internship': 'Praktikë frontend',
            'Application closes soon': 'Aplikimi mbyllet së shpejti',
            'Team registration': 'Regjistrimi i ekipit',
            'Workshop registration': 'Regjistrimi për punëtori',
            'Your contribution level': 'Niveli yt i kontributit',
            'You are close to unlocking the': 'Je afër zhbllokimit të distinktivit',
            'Notes Master': 'Mjeshtër i shënimeve',
            'badge.': '.',
            '780 points': '780 pikë',
            'Trending subjects': 'Lëndë në trend',
            'STUDY SMARTER': 'STUDIO MË ZGJUAR',
            'Organized student-made resources by faculty, subject and semester.': 'Materiale studentore të organizuara sipas fakultetit, lëndës dhe semestrit.',
            '+ Upload material': '+ Ngarko material',
            'All resources': 'Të gjitha materialet',
            'Notes': 'Shënime',
            'Summaries': 'Përmbledhje',
            'All universities': 'Të gjitha universitetet',
            'All IT faculties': 'Të gjitha fakultetet IT',

            'KNOW WHAT TO EXPECT': 'DI ÇFARË TË PRESËSH',
            'Exam archives sorted by subject, professor, semester and year.': 'Arkiva provimesh të renditura sipas lëndës, profesorit, semestrit dhe vitit.',
            '+ Upload exam': '+ Ngarko provim',
            'All exams': 'Të gjitha provimet',
            'Easier': 'Më të lehta',
            'Medium': 'Mesatare',
            'Hard': 'Të vështira',

            'BUILD YOUR FUTURE': 'NDËRTO TË ARDHMEN',
            'Student internships': 'Praktika studentore',
            'Verified student-friendly opportunities from companies across Macedonia.': 'Mundësi të verifikuara për studentë nga kompani në gjithë Maqedoninë.',
            '+ Post opportunity': '+ Publiko mundësi',
            'All roles': 'Të gjitha rolet',
            'Software': 'Softuer',
            'Data': 'Të dhëna',
            'Design': 'Dizajn',

            "WHAT'S HAPPENING": 'ÇFARË PO NDODH',
            'IT events across Macedonia': 'Evente IT në Maqedoni',
            'Meetups, hackathons, conferences and workshops across the country.': 'Takime, hackathone, konferenca dhe punëtori në gjithë vendin.',
            '+ Add event': '+ Shto event',
            'All events': 'Të gjitha eventet',
            'Meetups': 'Takime',
            'Hackathons': 'Hackathone',
            'Workshops': 'Punëtori',

            'FIND YOUR PEOPLE': 'GJEJ NJERËZIT E TU',
            'Teammate matching': 'Përputhje bashkëpunëtorësh',
            'Match by university, skills, interests, availability and project goals.': 'Përputhu sipas universitetit, aftësive, interesave, disponueshmërisë dhe qëllimeve të projektit.',
            '+ Create team request': '+ Krijo kërkesë ekipi',
            'Best matches': 'Përputhjet më të mira',
            'Frontend': 'Frontend',
            'Backend': 'Backend',
            'AI': 'AI',

            'STUDENT HOUSING': 'BANIM STUDENTOR',
            'Find roommates & rooms': 'Gjej bashkëbanues dhe dhoma',
            'Browse student-friendly housing and connect with compatible roommates.': 'Shfleto banime për studentë dhe lidhu me bashkëbanues të përshtatshëm.',
            '+ Post listing': '+ Publiko shpallje',
            'All listings': 'Të gjitha shpalljet',

            'STAY INFORMED': 'QËNDRO I INFORMUAR',
            'Student announcements': 'Njoftime studentore',
            'Important updates, deadlines, scholarships and opportunities.': 'Përditësime të rëndësishme, afate, bursa dhe mundësi.',
            '+ Post announcement': '+ Publiko njoftim',
            'Categories': 'Kategoritë',
            'Most followed sources': 'Burimet më të ndjekura',
            'Follow': 'Ndiq',

            'YOUR STUDENT IDENTITY': 'IDENTITETI YT STUDENTOR',
            'Your contributions, badges, saved items and activity across UniHub.': 'Kontributet, distinktivët, artikujt e ruajtur dhe aktiviteti yt në UniHub.',
            'Edit profile': 'Ndrysho profilin',
            'Your faculty · Your programme · Study year': 'Fakulteti yt · Programi yt · Viti i studimit',
            'North Macedonia': 'Maqedonia e Veriut',
            'contribution points': 'pikë kontributi',
            'Badges': 'Distinktivë',
            'Active Student': 'Student aktiv',
            'Team Player': 'Lojtar ekipi',
            'Career Hunter': 'Gjuetar karriere',
            'Top Rated': 'Më i vlerësuar',
            'Mentor': 'Mentor',
            'About': 'Rreth meje',

            'Software engineering student interested in AI, web development and building useful digital products for students.': 'Student i inxhinierisë softuerike i interesuar në AI, zhvillim web dhe produkte digjitale të dobishme për studentë.',

            'Recent activity': 'Aktiviteti i fundit',
            'Uploaded Algorithms exam collection': 'Ngarkoi koleksionin e provimeve të Algoritmeve',
            'Reached 428 downloads': 'Arriti 428 shkarkime',
            'Saved AI Builders Macedonia': 'Ruajti AI Builders Macedonia',
            'Event in Skopje': 'Event në Shkup',
            'Joined Code by the Lake team': 'U bashkua me ekipin Code by the Lake',
            'Role: Frontend developer': 'Roli: zhvillues frontend',

            'Notifications': 'Njoftime',
            'Create a UniHub post': 'Krijo postim në UniHub',
            'Category': 'Kategoria',
            'Study material': 'Material studimi',
            'Internship': 'Praktikë',
            'Event': 'Event',
            'Team request': 'Kërkesë ekipi',
            'Roommate post': 'Postim për bashkëbanues',
            'Announcement': 'Njoftim',
            'University': 'Universiteti',
            'Faculty': 'Fakulteti',
            'Study programme': 'Programi i studimit',
            'Title': 'Titulli',
            'Description': 'Përshkrimi',
            'Cancel': 'Anulo',
            'Publish post': 'Publiko postimin',
            'Saved ✨': 'U ruajt ✨',

            'Post created in demo mode': 'Postimi u krijua në modalitet demo',
            'Finding the best results': 'Po kërkohen rezultatet më të mira',
            'Download started': 'Shkarkimi filloi',
            'Saved to your list': 'U ruajt në listën tënde',
            'Removed from saved': 'U hoq nga të ruajturat',
            'Invitation sent': 'Ftesa u dërgua',
            'Search UniHub...': 'Kërko në UniHub...',
            'Example: Find Calculus 1 summaries...': 'Shembull: Gjej përmbledhje të Kalkulus 1...',
            'Search university or city…': 'Kërko universitet ose qytet…',
            'Your name': 'Emri yt',
            'Write your message here...': 'Shkruaj mesazhin tënd këtu...',
            'At least 4 characters': 'Të paktën 4 karaktere',
            'e.g. Semos Education': 'p.sh. Semos Education',
            'e.g. January 2025': 'p.sh. janar 2025',
            'e.g. Skopje': 'p.sh. Shkup',
            'e.g. Figma, UX Research': 'p.sh. Figma, UX Research',
            'e.g. Karpoš, Skopje': 'p.sh. Karposh, Shkup',
            'e.g. 180': 'p.sh. 180',
            'e.g. Wi-Fi, Furnished': 'p.sh. Wi-Fi, e mobiluar',
            'e.g. C++, Java, Python': 'p.sh. C++, Java, Python',
            'Following': 'Ndjekur',
            'Messages': 'Mesazhet',
            'Direct conversations with other students on UniHub.': 'Biseda direkte me studentë të tjerë në UniHub.',
            'Loading conversations…': 'Po ngarkohen bisedat…',
            'Select a conversation to start chatting.': 'Zgjidh një bisedë për të filluar.',
            'Type a message…': 'Shkruaj një mesazh…',
            'Send': 'Dërgo',
            'Seen': 'Parë',
            'No messages yet': 'Ende pa mesazhe',
            'No messages yet — say hi.': 'Ende pa mesazhe — thuaj përshëndetje.',
            'No conversations yet — use Contact on a teammate or roommate post to start one.': 'Ende pa biseda — përdor Kontakt te një postim ekipi ose bashkëbanuesi për ta nisur një.',
            'Could not load conversations.': 'Bisedat nuk mund të ngarkoheshin.',
            'Could not load this conversation.': 'Kjo bisedë nuk mund të ngarkohej.',
            'Loading conversation…': 'Po ngarkohet biseda…',
            'Log in to see your messages.': 'Hyr për të parë mesazhet e tua.',
            'Comments': 'Komentet',
            'Add a comment...': 'Shto një koment...',
            'Post comment': 'Publiko komentin',
            'No comments yet — be the first.': 'Ende pa komente — bëhu i pari.',
            'Could not post comment': 'Komenti nuk mund të publikohej',
            'Could not delete comment': 'Komenti nuk mund të fshihej',
            'You need to be logged in': 'Duhet të jesh i/e kyçur',
            'Edit': 'Ndrysho',
            'Delete': 'Fshi',
            'Report': 'Raporto',
            'Report post': 'Raporto postimin',
            'Spam': 'Spam',
            'Harassment or bullying': 'Ngacmim ose bullizëm',
            'Inappropriate content': 'Përmbajtje e papërshtatshme',
            'Misinformation': 'Keqinformim',
            'Other': 'Tjetër',
            'Additional details (optional)': 'Detaje shtesë (opsionale)',
            'Submit report': 'Dërgo raportimin',
            'Report submitted. Thanks for flagging this.': 'Raportimi u dërgua. Faleminderit që e sinjalizove.',
            "You've already reported this post.": 'E ke raportuar tashmë këtë postim.',
            'Something went wrong submitting your report.': 'Diçka shkoi gabim gjatë dërgimit të raportimit.',
            'My profile': 'Profili im',
            'STUDENT PROFILE': 'PROFIL STUDENTI',
            'Your posts, saved items and activity across UniHub.': 'Postimet, artikujt e ruajtur dhe aktiviteti yt në UniHub.',
            'My posts': 'Postimet e mia',
            'Saved items': 'Artikujt e ruajtur',
            'My comments': 'Komentet e mia',
            'Posts': 'Postime',
            'Followers': 'Ndjekësit',
            'Unfollow': 'Mos e ndiq më',
            'No bio yet.': 'Ende pa bio.',
            "Hasn't completed their profile yet": 'Ende nuk e ka plotësuar profilin',
            'Log in to see your saved items.': 'Hyr për të parë artikujt e ruajtur.',
            'No saved items yet.': 'Ende nuk ka artikuj të ruajtur.',
            'Log in to see your comments.': 'Hyr për të parë komentet e tua.',
            'No comments yet.': 'Ende pa komente.',
            'Log in to see posts.': 'Hyr për të parë postimet.',
            'No posts yet.': 'Ende pa postime.',
            'Deleted post': 'Postim i fshirë',
            'Loading your feed…': 'Po ngarkohet feed-i yt…',
            'No activity yet — be the first to post.': 'Ende pa aktivitet — bëhu i pari që poston.',
            'Could not load the feed right now.': 'Feed-i nuk mund të ngarkohet tani.',
            'Log in to see posts from people you follow.': 'Hyr për të parë postime nga njerëzit që ndjek.',
            'Loading your following feed…': 'Po ngarkohet feed-i i ndjekjeve…',
            'Follow other students to see their posts here.': 'Ndiq studentë të tjerë për të parë postimet e tyre këtu.',
            'Follow other students to see their posts here. Following is coming in a later step.': 'Ndiq studentë të tjerë për të parë postimet e tyre këtu. Ndjekjet vijnë në një hap tjetër.',
            'No posts yet from people you follow.': 'Ende nuk ka postime nga njerëzit që ndjek.',
            'Searching UniHub…': 'Po kërkohet në UniHub…',
            'Search failed — try again': 'Kërkimi dështoi — provo përsëri',
            'All': 'Të gjitha',
            'Results for': 'Rezultatet për',
            'No matches for': 'Nuk ka përputhje për',
            'Upload study material': 'Ngarko material studimi',
            'Upload a previous exam': 'Ngarko një provim të mëparshëm',
            'Post an internship': 'Publiko praktikë',
            'Add an event': 'Shto event',
            'Create a team request': 'Krijo kërkesë ekipi',
            'Post a roommate listing': 'Publiko shpallje bashkëbanimi',
            'Edit post': 'Ndrysho postimin',
            'File (PDF or DOC)': 'Skedar (PDF ose DOC)',
            'Type': 'Lloji',
            'Summary': 'Përmbledhje',
            'Difficulty': 'Vështirësia',
            'Easy': 'E lehtë',
            'Company': 'Kompania',
            'Exam period': 'Periudha e provimit',
            'Solutions included': 'Zgjidhjet përfshihen',
            'Work type': 'Lloji i punës',
            'City': 'Qyteti',
            'Application link': 'Linku i aplikimit',
            'Event webpage': 'Faqja e eventit',
            'Event date': 'Data e eventit',
            'Skills needed': 'Aftësitë e nevojshme',
            'Project type': 'Lloji i projektit',
            'Location': 'Lokacioni',
            'Rent € / month': 'Qira € / muaj',
            'Amenities': 'Komoditete',
            'Move-in date': 'Data e hyrjes',
            'Give your post a clear title': 'Jepi postimit një titull të qartë',
            'Add the important details...': 'Shto detajet e rëndësishme...',
            'Tell other students about yourself...': 'Tregoju studentëve të tjerë për veten...',
            'Skills (comma-separated)': 'Aftësi (të ndara me presje)',
            'Profile photo': 'Foto profili',
            'Full name': 'Emri i plotë',
            'Choose university': 'Zgjidh universitetin',
            'Choose faculty': 'Zgjidh fakultetin',
            'Choose programme': 'Zgjidh programin',
            'Choose year': 'Zgjidh vitin',
            'Save changes': 'Ruaj ndryshimet',
            'Profile updated!': 'Profili u përditësua!',
            'Could not save profile': 'Profili nuk mund të ruhej',
            'Photo upload failed': 'Ngarkimi i fotos dështoi',
            'No description added.': 'Nuk është shtuar përshkrim.',
            'No file attached.': 'Nuk ka skedar të bashkangjitur.',
            'Open file in a new tab ↗': 'Hape skedarin në tab të ri ↗',
            'No application link': 'Nuk ka link aplikimi',
            'No event link': 'Nuk ka link eventi',
            'No file attached to this post': 'Nuk ka skedar të bashkangjitur në këtë postim',
            'Preparing download…': 'Po përgatitet shkarkimi…',
            'Download failed — try opening the file link instead': 'Shkarkimi dështoi — provo ta hapësh linkun e skedarit',
            "That's your own post": 'Ky është postimi yt',
            'Could not open conversation': 'Biseda nuk mund të hapej',
            'Could not start conversation': 'Biseda nuk mund të nisej',
            'Could not send message': 'Mesazhi nuk mund të dërgohej',
            'Could not unfollow': 'Nuk mund të hiqej ndjekja',
            'Could not load.': 'Nuk mund të ngarkohej.',
            'Loading…': 'Po ngarkohet…',
            'Post deleted': 'Postimi u fshi',
            'Could not delete post': 'Postimi nuk mund të fshihej',
            'Could not load post': 'Postimi nuk mund të ngarkohej',
            'Could not load post for editing': 'Postimi nuk mund të ngarkohej për ndryshim',
            "Delete this post? This can't be undone.": 'Ta fshish këtë postim? Kjo nuk mund të zhbëhet.',
            'File upload failed': 'Ngarkimi i skedarit dështoi',
            'Could not save post': 'Postimi nuk mund të ruhej',
            'Could not save exam': 'Provimi nuk mund të ruhej',
            'Could not save internship': 'Praktika nuk mund të ruhej',
            'Could not save event': 'Eventi nuk mund të ruhej',
            'Could not save request': 'Kërkesa nuk mund të ruhej',
            'Could not save listing': 'Shpallja nuk mund të ruhej',
            'Resource updated!': 'Materiali u përditësua!',
            'Resource uploaded!': 'Materiali u ngarkua!',
            'Exam updated!': 'Provimi u përditësua!',
            'Exam uploaded!': 'Provimi u ngarkua!',
            'Internship updated!': 'Praktika u përditësua!',
            'Internship posted!': 'Praktika u publikua!',
            'Event updated!': 'Eventi u përditësua!',
            'Event posted!': 'Eventi u publikua!',
            'Team request updated!': 'Kërkesa e ekipit u përditësua!',
            'Team request posted!': 'Kërkesa e ekipit u publikua!',
            'Listing updated!': 'Shpallja u përditësua!',
            'Listing posted!': 'Shpallja u publikua!',
            "This category isn't connected yet — coming in a later step": 'Kjo kategori nuk është lidhur ende — vjen në një hap tjetër',
            'Resource': 'Material',
            'Exam': 'Provim',
            'Roommate post': 'Postim për bashkëbanues',
            'No followers yet.': 'Ende pa ndjekës.',
            'No following yet.': 'Ende nuk ndjek askënd.',
            'STUDY MATERIAL': 'MATERIAL STUDIMI',
            'INTERNSHIP': 'PRAKTIKË',
            'EVENT': 'EVENT',
            'TEAM REQUEST': 'KËRKESË EKIPI',
            'ROOMMATE POST': 'POSTIM BASHKËBANIMI',
            'EXAM': 'PROVIM',
            'SOLUTIONS INCLUDED': 'ZGJIDHJET PËRFSHIHEN',
            'MONTH': 'MUAJ',

            'Preview': 'Parashiko',
            'Download': 'Shkarko',
            'Practice': 'Ushtro',
            'Save': 'Ruaj',
            'Saved': 'Ruajtur',
            'Details': 'Detaje',
            'Apply now': 'Apliko tani',
            'View event': 'Shiko eventin',
            'Profile': 'Profili',
            'Invite': 'Fto',
            'Contact': 'Kontakto',

            'Structured student-made resource with clear explanations and exam-focused examples.': 'Material studentor i strukturuar me shpjegime të qarta dhe shembuj të fokusuar në provime.',

            'PREVIOUS EXAM': 'PROVIM I MËPARSHËM',
            'Difficulty: medium · Solutions included': 'Vështirësia: mesatare · Zgjidhjet përfshihen',
            'Difficulty: hard · Solutions included': 'Vështirësia: e vështirë · Zgjidhjet përfshihen',
            'Difficulty: easy · Solutions included': 'Vështirësia: e lehtë · Zgjidhjet përfshihen',

            'Junior Frontend Developer': 'Zhvillues i ri Frontend',
            'Software Engineering Intern': 'Praktikant i inxhinierisë softuerike',
            'Data Analytics Intern': 'Praktikant i analizës së të dhënave',
            'Junior QA Intern': 'Praktikant i ri QA',
            'Machine Learning Intern': 'Praktikant i mësimit makinerik',
            'Product Design Intern': 'Praktikant i dizajnit të produktit',

            'Paid · Skopje': 'Me pagesë · Shkup',
            'Paid · Macedonia': 'Me pagesë · Maqedoni',
            'Hybrid': 'Hibrid',
            'On-site': 'Në zyrë',
            'Remote': 'Nga distanca',
            'Free': 'Falas',

            'Meetup · Free': 'Takim · Falas',
            'Hackathon · Team event': 'Hackathon · Event ekipor',
            'Workshop · Limited': 'Punëtori · Vende të kufizuara',
            'Talks · Networking': 'Ligjërata · Rrjetëzim',
            'Conference · Free': 'Konferencë · Falas',
            'Startup · 54 hours': 'Startup · 54 orë',
            '120 students interested': '120 studentë të interesuar',

            'Deadline': 'Afat',
            'Scholarships': 'Bursa',
            'Campus': 'Kampus',
            'Competitions': 'Gara',
            'Mobility': 'Mobilitet',
            'Volunteering': 'Vullnetarizëm',

            'Applications open for student mobility programme': 'Aplikimet janë hapur për programin e mobilitetit studentor',
            'Students can apply for the autumn semester exchange programme until 15 August.': 'Studentët mund të aplikojnë për shkëmbimin e semestrit të vjeshtës deri më 15 gusht.',

            'New summer consultation schedule published': 'U publikua orari i ri veror i konsultimeve',
            'The updated consultation schedule for Mathematics 1, ADS and Computer Networks is now available.': 'Orari i përditësuar i konsultimeve për Matematikë 1, ADS dhe Rrjete Kompjuterike tani është në dispozicion.',

            'Call for student speakers: Technology and Society': 'Thirrje për folës studentë: Teknologjia dhe shoqëria',
            'Cookie notice': 'Njoftim për cookies',
            'Cookies and storage': 'Cookies dhe ruajtja në shfletues',
            'UniHub uses essential browser storage for login sessions and small preferences like your last viewed tab. We do not use advertising or analytics cookies. Read our': 'UniHub përdor ruajtje thelbësore në shfletues për sesionet e hyrjes dhe preferenca të vogla si skeda e fundit e parë. Nuk përdorim cookies reklamimi ose analitike. Lexo',
            'Privacy page': 'faqen e privatësisë',
            'Reject': 'Refuzo',
            'Accept': 'Prano',
            'Submit a 10-minute talk proposal by 5 August. First-time speakers are welcome.': 'Dërgo propozim për ligjëratë 10-minutëshe deri më 5 gusht. Folësit e rinj janë të mirëseardhur.'
        },

        mk: {
            'About': 'За нас',
            'Contact': 'Контакт',
            'ABOUT UNIHUB': 'ЗА UNIHUB',
            'Built to make student life simpler.': 'Создадено за полесен студентски живот.',
            'OUR PURPOSE': 'НАШАТА ЦЕЛ',
            'Learn. Connect. Grow.': 'Учи. Поврзи се. Расти.',
            'MEET THE TEAM': 'ЗАПОЗНАЈ ГО ТИМОТ',
            'The students behind UniHub.': 'Студентите зад UniHub.',
            'Project team member': 'Член на проектниот тим',
            'CONTACT UNIHUB': 'КОНТАКТИРАЈ UNIHUB',
            'Questions, ideas or feedback?': 'Прашања, идеи или мислења?',
            'Project': 'Проект',
            'Team': 'Тим',
            'Location': 'Локација',
            'Focus': 'Фокус',
            'SEND A MESSAGE': 'ИСПРАТИ ПОРАКА',
            'We would love to hear from you.': 'Би сакале да те слушнеме.',
            'Name': 'Име',
            'Email': 'Е-пошта',
            'Subject': 'Предмет',
            'Message': 'Порака',
            'Choose a subject': 'Избери предмет',
            'General question': 'Општо прашање',
            'Feedback': 'Мислење',
            'Report an issue': 'Пријави проблем',
            'Partnership or event': 'Партнерство или настан',
            'Send message': 'Испрати порака',
            'Privacy': 'Приватност',
            'Terms': 'Услови',

            'Features': 'Функции',
            'UniHub — Your Student Life, Connected': 'UniHub — Твојот студентски живот, поврзан',
            'UniHub — Everything for Students': 'UniHub — Сè за студентите',
            'Sign in — UniHub': 'Најава — UniHub',
            'Create account — UniHub': 'Креирај сметка — UniHub',
            'Personalize UniHub': 'Персонализирај UniHub',
            'Universities': 'Универзитети',
            'Stories': 'Приказни',
            'FAQ': 'Прашања',
            'Sign in': 'Најави се',
            'Create account': 'Креирај сметка',

            'BUILT BY STUDENTS, FOR STUDENTS': 'СОЗДАДЕНО ОД СТУДЕНТИ, ЗА СТУДЕНТИ',
            'Everything students need.': 'Сè што им треба на студентите.',
            'One intelligent platform.': 'Една интелигентна платформа.',

            'UniHub brings learning resources, previous exams, internships, events, teammates, roommates and campus announcements into one connected student ecosystem.': 'UniHub ги поврзува материјалите за учење, старите испити, праксите, настаните, тимските партнери, цимерите и универзитетските известувања во еден студентски екосистем.',

            'Create your free account ↗': 'Креирај бесплатна сметка ↗',
            'Explore features': 'Истражи функции',

            'PERSONALIZED FOR YOU': 'ПЕРСОНАЛИЗИРАНО ЗА ТЕБЕ',
            'Good evening, User': 'Добра вечер, кориснику',
            'What are you looking for today?': 'Што бараш денес?',

            'Course resources': 'Материјали за предмети',
            'New notes for your subjects': 'Нови белешки за твоите предмети',
            'Career matches': 'Кариерни можности',
            '2 internships fit your profile': '2 пракси одговараат на твојот профил',
            'Events nearby': 'Настани во близина',
            '3 upcoming this week': '3 претстојни оваа недела',
            'Team matches': 'Тимски совпаѓања',
            '95% compatibility': '95% компатибилност',
            'New internship posted': 'Објавена е нова пракса',
            '95% teammate match': '95% совпаѓање со тимски партнер',

            'THE STUDENT ECOSYSTEM': 'СТУДЕНТСКИ ЕКОСИСТЕМ',
            'Not another university portal.': 'Не уште еден универзитетски портал.',
            'A platform students enjoy using.': 'Платформа што студентите сакаат да ја користат.',

            'Notes & summaries': 'Белешки и резимеа',
            'Upload, discover, rate and save resources organized by university, faculty, course and semester.': 'Прикачувај, откривај, оценувај и зачувувај материјали организирани по универзитет, факултет, предмет и семестар.',

            'Previous exams': 'Стари испити',
            'Practice with past exams, difficulty ratings, solution availability and useful student feedback.': 'Вежбај со стари испити, оценки за тежина, достапни решенија и корисни студентски коментари.',

            'Internships': 'Пракси',
            'Find verified student-friendly opportunities matched to your interests, skills and location.': 'Најди проверени можности за студенти според твоите интереси, вештини и локација.',

            'IT events': 'ИТ настани',
            'Never miss hackathons, workshops, meetups, conferences and networking opportunities.': 'Не пропуштај хакатони, работилници, средби, конференции и можности за вмрежување.',

            'Team finder': 'Пронаоѓач на тим',
            'Meet compatible students for hackathons, assignments, startups and personal projects.': 'Запознај компатибилни студенти за хакатони, задачи, стартапи и лични проекти.',

            'Roommates & housing': 'Цимери и сместување',
            'Discover student-friendly rooms and connect with potential roommates more easily.': 'Откриј студентски сместувања и полесно поврзи се со потенцијални цимери.',

            'MADE FOR EVERY CAMPUS': 'ЗА СЕКОЈ КАМПУС',
            'Your university belongs here.': 'Твојот универзитет припаѓа тука.',
            'STUDENT STORIES': 'СТУДЕНТСКИ ПРИКАЗНИ',
            'Built around real student needs.': 'Создадено според реални студентски потреби.',
            'Software engineering student': 'Студент по софтверско инженерство',
            'Computer science student': 'Студент по компјутерски науки',
            'Second-year student': 'Студент втора година',

            'Questions students usually ask.': 'Прашања што студентите најчесто ги поставуваат.',
            'Is UniHub free for students?': 'Дали UniHub е бесплатен за студенти?',
            'Yes. The student account and core platform are designed to be free.': 'Да. Студентската сметка и главната платформа се замислени да бидат бесплатни.',
            'Which universities can join?': 'Кои универзитети можат да се приклучат?',

            'UniHub includes IT-related faculties and study programmes from public and private universities across North Macedonia, with an “Other” option so no accredited IT student is excluded.': 'UniHub вклучува ИТ факултети и студиски програми од јавни и приватни универзитети низ Северна Македонија, со опција „Друго“ за да не биде исклучен ниту еден акредитиран ИТ студент.',

            'Can students upload notes and exams?': 'Дали студентите можат да прикачуваат белешки и испити?',
            'Yes. Logged-in students can contribute resources, while moderation and reporting keep content organized.': 'Да. Најавените студенти можат да придонесуваат со материјали, а модерацијата и пријавувањето ја одржуваат содржината организирана.',

            'Ready to make university easier?': 'Подготвен/а да го направиш факултетот полесен?',
            'Create your student profile and receive resources, events and opportunities matched to your university, year and interests.': 'Креирај студентски профил и добивај материјали, настани и можности според универзитетот, годината и интересите.',
            'Join UniHub': 'Приклучи се на UniHub',
            'Privacy · Terms · Contact': 'Приватност · Услови · Контакт',
            'WELCOME BACK': 'ДОБРЕДОЈДЕ НАЗАД',
            'Your university life,': 'Твојот универзитетски живот,',
            'ready when you are.': 'подготвен кога си и ти.',
            'Continue where you left off and see everything personalized for your faculty, year and interests.': 'Продолжи таму каде што застана и види сè персонализирано за твојот факултет, година и интереси.',
            'New materials for your courses': 'Нови материјали за твоите предмети',
            'Internships matching your profile': 'Пракси што одговараат на твојот профил',
            'Students looking for teammates': 'Студенти што бараат тимски партнери',
            'UniHub · Student platform for North Macedonia': 'UniHub · Студентска платформа за Северна Македонија',

            'STUDENT ACCOUNT': 'СТУДЕНТСКА СМЕТКА',
            'Sign in to UniHub': 'Најави се на UniHub',
            'Use any demo email and password to preview the logged-in platform.': 'Користи било која демо е-пошта и лозинка за да ја прегледаш најавената платформа.',
            'G Continue with Google': 'G Продолжи со Google',
            'OR CONTINUE WITH EMAIL': 'ИЛИ ПРОДОЛЖИ СО Е-ПОШТА',
            'EMAIL': 'Е-ПОШТА',
            'PASSWORD': 'ЛОЗИНКА',
            'New to UniHub?': 'Нов/а си на UniHub?',
            'Create an account': 'Креирај сметка',

            'JOIN THE COMMUNITY': 'ПРИКЛУЧИ СЕ НА ЗАЕДНИЦАТА',
            'Build a smarter': 'Изгради попаметно',
            'student experience.': 'студентско искуство.',
            'Your account personalizes resources, opportunities, events and people around what you study.': 'Твојата сметка ги персонализира материјалите, можностите, настаните и луѓето според тоа што го студираш.',
            'Choose your university and faculty': 'Избери универзитет и факултет',
            'Personalize your interests and skills': 'Персонализирај ги интересите и вештините',
            'Unlock your student dashboard': 'Отклучи го студентскиот панел',
            'Free student account · Demo version': 'Бесплатна студентска сметка · Демо верзија',

            'CREATE ACCOUNT': 'КРЕИРАЈ СМЕТКА',
            'Create your demo account, then complete the personalization flow.': 'Креирај демо сметка, потоа заврши ја персонализацијата.',
            'G Sign up with Google': 'G Регистрирај се со Google',
            'OR USE EMAIL': 'ИЛИ КОРИСТИ Е-ПОШТА',
            'FULL NAME': 'ЦЕЛОСНО ИМЕ',
            'Already have an account?': 'Веќе имаш сметка?',

            'PERSONALIZE YOUR EXPERIENCE': 'ПЕРСОНАЛИЗИРАЈ ГО ИСКУСТВОТО',
            'Let UniHub get to know you.': 'Дозволи му на UniHub да те запознае.',
            'This determines the notes, exams, opportunities, events and students shown on your dashboard.': 'Ова одредува кои белешки, испити, можности, настани и студенти ќе се прикажуваат на твојот панел.',

            'Choose your university': 'Избери универзитет',
            'Every listed institution offers at least one IT-related study path.': 'Секоја наведена институција нуди најмалку една студиска насока поврзана со ИТ.',
            'Choose your faculty or school': 'Избери факултет или школа',
            'Only IT-related faculties from your university will appear.': 'Ќе се прикажат само ИТ факултетите од твојот универзитет.',
            'Choose your study programme': 'Избери студиска програма',
            'This helps UniHub recommend the most relevant subjects and resources.': 'Ова му помага на UniHub да ги препорача најрелевантните предмети и материјали.',
            'Choose your study year': 'Избери година на студии',
            'Your year controls which course materials and exam archives appear first.': 'Твојата година одредува кои материјали и архиви на испити ќе се појават први.',

            'Year 1': 'Година 1',
            'First year': 'Прва година',
            'Year 2': 'Година 2',
            'Second year': 'Втора година',
            'Year 3': 'Година 3',
            'Third year': 'Трета година',
            'Year 4': 'Година 4',
            'Fourth year': 'Четврта година',
            'Postgraduate': 'Постдипломски',
            "Master's or doctoral studies": 'Магистерски или докторски студии',

            'Select your interests': 'Избери ги твоите интереси',
            'Choose as many as you like.': 'Избери колку што сакаш.',
            'Artificial Intelligence': 'Вештачка интелигенција',
            'AI, ML and data': 'AI, ML и податоци',
            'Web Development': 'Веб развој',
            'Frontend and backend': 'Frontend и backend',
            'Cybersecurity': 'Сајбер безбедност',
            'Security and networks': 'Безбедност и мрежи',
            'Software Engineering': 'Софтверско инженерство',
            'Architecture and product development': 'Архитектура и развој на производи',
            'Data Science': 'Наука за податоци',
            'Analytics and intelligent systems': 'Аналитика и интелигентни системи',
            'UI/UX Design': 'UI/UX дизајн',
            'Product and interaction design': 'Дизајн на производи и интеракција',
            'Game Development': 'Развој на игри',
            'Graphics, engines and interactive media': 'Графика, енџини и интерактивни медиуми',
            'Robotics': 'Роботика',
            'Automation and embedded systems': 'Автоматизација и вградени системи',

            'Back': 'Назад',
            'Continue': 'Продолжи',
            'Open my dashboard': 'Отвори го мојот панел',
            'Choose at least one interest to continue.': 'Избери најмалку еден интерес за да продолжиш.',
            'Please choose one option to continue.': 'Избери една опција за да продолжиш.',

            'PLATFORM': 'ПЛАТФОРМА',
            'Dashboard': 'Панел',
            'Find teammates': 'Најди тимски партнери',
            'Find roommates': 'Најди цимери',
            'Announcements': 'Известувања',
            'My profile': 'Мој профил',
            'Student': 'Студент',
            'Your faculty · Study year': 'Твој факултет · Година на студии',
            'Search UniHub...': 'Пребарај на UniHub...',
            '+ Create': '+ Креирај',

            'MONDAY, 27 JULY': 'ПОНЕДЕЛНИК, 27 ЈУЛИ',
            'Here is what is happening across your student network today.': 'Еве што се случува денес во твојата студентска мрежа.',
            'Customize dashboard': 'Прилагоди го панелот',

            'UNI ASSISTANT': 'UNI АСИСТЕНТ',
            'Smart discovery': 'Паметно пребарување',
            'Ask naturally. UniHub will guide you to notes, exams, internships, events, teammates, roommates or announcements.': 'Прашај природно. UniHub ќе те насочи кон белешки, испити, пракси, настани, тимски партнери, цимери или известувања.',
            'Find it': 'Најди',
            'Internships in Skopje': 'Пракси во Скопје',
            'Upcoming hackathons': 'Претстојни хакатони',
            'Calculus notes': 'Белешки по калкулус',
            'Java teammates': 'Java тимски партнери',

            'YOUR FEED': 'ТВОЈОТ ФИД',
            'Fresh from the student community': 'Ново од студентската заедница',
            'View all activity →': 'Види ја целата активност →',

            'STUDY MATERIAL': 'МАТЕРИЈАЛ ЗА УЧЕЊЕ',
            'Algorithms and Data Structures — Complete Exam Collection': 'Алгоритми и податочни структури — Комплетна колекција на испити',
            'I organized all previous exams from 2021–2025 and added short solution hints.': 'Ги организирав сите претходни испити од 2021–2025 и додадов кратки насоки за решенијата.',
            'Open ↗': 'Отвори ↗',
            'Like': 'Ми се допаѓа',
            'Liked': 'Допаднато',
            'Share': 'Сподели',

            'TEAM REQUEST': 'БАРАЊЕ ЗА ТИМ',
            'Looking for one UI/UX designer for Code by the Lake': 'Бараме еден UI/UX дизајнер за Code by the Lake',
            'We are building a student budgeting app and need one designer available on 3–4 August.': 'Развиваме студентска апликација за буџетирање и ни треба еден дизајнер достапен на 3–4 август.',
            'View ↗': 'Види ↗',

            'Upcoming deadlines': 'Претстојни рокови',
            'Frontend internship': 'Frontend пракса',
            'Application closes soon': 'Апликацијата наскоро се затвора',
            'Team registration': 'Регистрација на тим',
            'Workshop registration': 'Регистрација за работилница',

            'Your contribution level': 'Твоето ниво на придонес',
            'You are close to unlocking the': 'Блиску си до отклучување на',
            'Notes Master': 'Мајстор за белешки',
            'badge.': 'значката.',
            '780 points': '780 поени',
            'Trending subjects': 'Предмети во тренд',

            'STUDY SMARTER': 'УЧИ ПОПАМЕТНО',
            'Organized student-made resources by faculty, subject and semester.': 'Организирани студентски материјали по факултет, предмет и семестар.',
            '+ Upload material': '+ Прикачи материјал',
            'All resources': 'Сите материјали',
            'Notes': 'Белешки',
            'Summaries': 'Резимеа',
            'All universities': 'Сите универзитети',
            'All IT faculties': 'Сите ИТ факултети',

            'KNOW WHAT TO EXPECT': 'ЗНАЈ ШТО ДА ОЧЕКУВАШ',
            'Exam archives sorted by subject, professor, semester and year.': 'Архиви на испити подредени по предмет, професор, семестар и година.',
            '+ Upload exam': '+ Прикачи испит',
            'All exams': 'Сите испити',
            'Easier': 'Полесни',
            'Medium': 'Средни',
            'Hard': 'Тешки',

            'BUILD YOUR FUTURE': 'ГРАДИ ЈА ТВОЈАТА ИДНИНА',
            'Student internships': 'Студентски пракси',
            'Verified student-friendly opportunities from companies across Macedonia.': 'Проверени можности за студенти од компании низ Македонија.',
            '+ Post opportunity': '+ Објави можност',
            'All roles': 'Сите улоги',
            'Software': 'Софтвер',
            'Data': 'Податоци',
            'Design': 'Дизајн',

            "WHAT'S HAPPENING": 'ШТО СЕ СЛУЧУВА',
            'IT events across Macedonia': 'ИТ настани низ Македонија',
            'Meetups, hackathons, conferences and workshops across the country.': 'Средби, хакатони, конференции и работилници низ земјата.',
            '+ Add event': '+ Додај настан',
            'All events': 'Сите настани',
            'Meetups': 'Средби',
            'Hackathons': 'Хакатони',
            'Workshops': 'Работилници',

            'FIND YOUR PEOPLE': 'НАЈДИ ГИ ТВОИТЕ ЛУЃЕ',
            'Teammate matching': 'Совпаѓање со тимски партнери',
            'Match by university, skills, interests, availability and project goals.': 'Совпаѓај се според универзитет, вештини, интереси, достапност и проектни цели.',
            '+ Create team request': '+ Креирај барање за тим',
            'Best matches': 'Најдобри совпаѓања',
            'Frontend': 'Frontend',
            'Backend': 'Backend',
            'AI': 'AI',

            'STUDENT HOUSING': 'СТУДЕНТСКО СМЕСТУВАЊЕ',
            'Find roommates & rooms': 'Најди цимери и соби',
            'Browse student-friendly housing and connect with compatible roommates.': 'Прегледај студентско сместување и поврзи се со компатибилни цимери.',
            '+ Post listing': '+ Објави оглас',
            'All listings': 'Сите огласи',

            'STAY INFORMED': 'БИДИ ИНФОРМИРАН/А',
            'Student announcements': 'Студентски известувања',
            'Important updates, deadlines, scholarships and opportunities.': 'Важни новости, рокови, стипендии и можности.',
            '+ Post announcement': '+ Објави известување',
            'Categories': 'Категории',
            'Most followed sources': 'Најследени извори',
            'Follow': 'Следи',

            'YOUR STUDENT IDENTITY': 'ТВОЈОТ СТУДЕНТСКИ ИДЕНТИТЕТ',
            'Your contributions, badges, saved items and activity across UniHub.': 'Твоите придонеси, значки, зачувани ставки и активност на UniHub.',
            'Edit profile': 'Уреди профил',
            'Your faculty · Your programme · Study year': 'Твој факултет · Твоја програма · Година на студии',
            'North Macedonia': 'Северна Македонија',
            'contribution points': 'поени за придонес',
            'Badges': 'Значки',
            'Active Student': 'Активен студент',
            'Team Player': 'Тимски играч',
            'Career Hunter': 'Ловец на кариера',
            'Top Rated': 'Најдобро оценет',
            'Mentor': 'Ментор',
            'About': 'За мене',

            'Software engineering student interested in AI, web development and building useful digital products for students.': 'Студент по софтверско инженерство заинтересиран за AI, веб развој и создавање корисни дигитални производи за студенти.',

            'Recent activity': 'Неодамнешна активност',
            'Uploaded Algorithms exam collection': 'Прикачи колекција на испити по Алгоритми',
            'Reached 428 downloads': 'Достигна 428 преземања',
            'Saved AI Builders Macedonia': 'Го зачува AI Builders Macedonia',
            'Event in Skopje': 'Настан во Скопје',
            'Joined Code by the Lake team': 'Се приклучи на тимот Code by the Lake',
            'Role: Frontend developer': 'Улога: Frontend програмер',

            'Notifications': 'Известувања',
            'Create a UniHub post': 'Креирај UniHub објава',
            'Category': 'Категорија',
            'Study material': 'Материјал за учење',
            'Internship': 'Пракса',
            'Event': 'Настан',
            'Team request': 'Барање за тим',
            'Roommate post': 'Објава за цимер',
            'Announcement': 'Известување',
            'University': 'Универзитет',
            'Faculty': 'Факултет',
            'Study programme': 'Студиска програма',
            'Title': 'Наслов',
            'Description': 'Опис',
            'Cancel': 'Откажи',
            'Publish post': 'Објави',
            'Saved ✨': 'Зачувано ✨',

            'Post created in demo mode': 'Објавата е креирана во демо режим',
            'Finding the best results': 'Ги бараме најдобрите резултати',
            'Download started': 'Преземањето започна',
            'Saved to your list': 'Зачувано во твојата листа',
            'Removed from saved': 'Отстрането од зачувани',
            'Invitation sent': 'Поканата е испратена',
            'Search UniHub...': 'Пребарај во UniHub...',
            'Example: Find Calculus 1 summaries...': 'Пример: Најди резимеа за Калкулус 1...',
            'Search university or city…': 'Пребарај универзитет или град…',
            'Your name': 'Твоето име',
            'Write your message here...': 'Напиши ја твојата порака тука...',
            'At least 4 characters': 'Најмалку 4 карактери',
            'e.g. Semos Education': 'пр. Semos Education',
            'e.g. January 2025': 'пр. јануари 2025',
            'e.g. Skopje': 'пр. Скопје',
            'e.g. Figma, UX Research': 'пр. Figma, UX Research',
            'e.g. Karpoš, Skopje': 'пр. Карпош, Скопје',
            'e.g. 180': 'пр. 180',
            'e.g. Wi-Fi, Furnished': 'пр. Wi-Fi, наместено',
            'e.g. C++, Java, Python': 'пр. C++, Java, Python',
            'Following': 'Следиш',
            'Messages': 'Пораки',
            'Direct conversations with other students on UniHub.': 'Директни разговори со други студенти на UniHub.',
            'Loading conversations…': 'Се вчитуваат разговори…',
            'Select a conversation to start chatting.': 'Избери разговор за да започнеш.',
            'Type a message…': 'Напиши порака…',
            'Send': 'Испрати',
            'Seen': 'Видено',
            'No messages yet': 'Сè уште нема пораки',
            'No messages yet — say hi.': 'Сè уште нема пораки — поздрави.',
            'No conversations yet — use Contact on a teammate or roommate post to start one.': 'Сè уште нема разговори — користи Контакт на објава за тим или цимер за да започнеш.',
            'Could not load conversations.': 'Разговорите не можеа да се вчитаат.',
            'Could not load this conversation.': 'Овој разговор не можеше да се вчита.',
            'Loading conversation…': 'Се вчитува разговор…',
            'Log in to see your messages.': 'Најави се за да ги видиш пораките.',
            'Comments': 'Коментари',
            'Add a comment...': 'Додај коментар...',
            'Post comment': 'Објави коментар',
            'No comments yet — be the first.': 'Сè уште нема коментари — биди прв/а.',
            'Could not post comment': 'Коментарот не можеше да се објави',
            'Could not delete comment': 'Коментарот не можеше да се избрише',
            'You need to be logged in': 'Треба да си најавен/а',
            'Edit': 'Уреди',
            'Delete': 'Избриши',
            'Report': 'Пријави',
            'Report post': 'Пријави објава',
            'Spam': 'Спам',
            'Harassment or bullying': 'Вознемирување или малтретирање',
            'Inappropriate content': 'Несоодветна содржина',
            'Misinformation': 'Дезинформации',
            'Other': 'Друго',
            'Additional details (optional)': 'Дополнителни детали (опционално)',
            'Submit report': 'Испрати пријава',
            'Report submitted. Thanks for flagging this.': 'Пријавата е испратена. Фала што сигнализираше.',
            "You've already reported this post.": 'Веќе ја пријави оваа објава.',
            'Something went wrong submitting your report.': 'Нешто тргна наопаку при испраќањето на пријавата.',
            'My profile': 'Мој профил',
            'STUDENT PROFILE': 'СТУДЕНТСКИ ПРОФИЛ',
            'Your posts, saved items and activity across UniHub.': 'Твоите објави, зачувани ставки и активност на UniHub.',
            'My posts': 'Мои објави',
            'Saved items': 'Зачувани ставки',
            'My comments': 'Мои коментари',
            'Posts': 'Објави',
            'Followers': 'Следбеници',
            'Unfollow': 'Отследи',
            'No bio yet.': 'Сè уште нема био.',
            "Hasn't completed their profile yet": 'Сè уште нема пополнет профил',
            'Log in to see your saved items.': 'Најави се за да ги видиш зачуваните ставки.',
            'No saved items yet.': 'Сè уште нема зачувани ставки.',
            'Log in to see your comments.': 'Најави се за да ги видиш твоите коментари.',
            'No comments yet.': 'Сè уште нема коментари.',
            'Log in to see posts.': 'Најави се за да видиш објави.',
            'No posts yet.': 'Сè уште нема објави.',
            'Deleted post': 'Избришана објава',
            'Loading your feed…': 'Се вчитува твојот feed…',
            'No activity yet — be the first to post.': 'Сè уште нема активност — биди прв/а што ќе објави.',
            'Could not load the feed right now.': 'Feed-от не може да се вчита во моментов.',
            'Log in to see posts from people you follow.': 'Најави се за да видиш објави од луѓето што ги следиш.',
            'Loading your following feed…': 'Се вчитува feed-от од следења…',
            'Follow other students to see their posts here.': 'Следи други студенти за да ги видиш нивните објави тука.',
            'Follow other students to see their posts here. Following is coming in a later step.': 'Следи други студенти за да ги видиш нивните објави тука. Следењето доаѓа во следен чекор.',
            'No posts yet from people you follow.': 'Сè уште нема објави од луѓето што ги следиш.',
            'Searching UniHub…': 'Се пребарува UniHub…',
            'Search failed — try again': 'Пребарувањето не успеа — обиди се повторно',
            'All': 'Сите',
            'Results for': 'Резултати за',
            'No matches for': 'Нема резултати за',
            'Upload study material': 'Прикачи материјал за учење',
            'Upload a previous exam': 'Прикачи стар испит',
            'Post an internship': 'Објави пракса',
            'Add an event': 'Додај настан',
            'Create a team request': 'Креирај барање за тим',
            'Post a roommate listing': 'Објави оглас за цимер',
            'Edit post': 'Уреди објава',
            'File (PDF or DOC)': 'Датотека (PDF или DOC)',
            'Type': 'Тип',
            'Summary': 'Резиме',
            'Difficulty': 'Тежина',
            'Easy': 'Лесно',
            'Company': 'Компанија',
            'Exam period': 'Испитен период',
            'Solutions included': 'Вклучени решенија',
            'Work type': 'Тип на работа',
            'City': 'Град',
            'Application link': 'Линк за апликација',
            'Event webpage': 'Веб-страница на настанот',
            'Event date': 'Датум на настан',
            'Skills needed': 'Потребни вештини',
            'Project type': 'Тип на проект',
            'Location': 'Локација',
            'Rent € / month': 'Кирија € / месец',
            'Amenities': 'Удобности',
            'Move-in date': 'Датум за вселување',
            'Give your post a clear title': 'Дај јасен наслов на објавата',
            'Add the important details...': 'Додај ги важните детали...',
            'Tell other students about yourself...': 'Кажи им на другите студенти за себе...',
            'Skills (comma-separated)': 'Вештини (одделени со запирка)',
            'Profile photo': 'Профилна фотографија',
            'Full name': 'Целосно име',
            'Choose university': 'Избери универзитет',
            'Choose faculty': 'Избери факултет',
            'Choose programme': 'Избери програма',
            'Choose year': 'Избери година',
            'Save changes': 'Зачувај промени',
            'Profile updated!': 'Профилот е ажуриран!',
            'Could not save profile': 'Профилот не можеше да се зачува',
            'Photo upload failed': 'Прикачувањето на фотографијата не успеа',
            'No description added.': 'Нема додаден опис.',
            'No file attached.': 'Нема прикачена датотека.',
            'Open file in a new tab ↗': 'Отвори ја датотеката во нов таб ↗',
            'No application link': 'Нема линк за апликација',
            'No event link': 'Нема линк за настан',
            'No file attached to this post': 'Нема прикачена датотека на оваа објава',
            'Preparing download…': 'Се подготвува преземање…',
            'Download failed — try opening the file link instead': 'Преземањето не успеа — обиди се да го отвориш линкот',
            "That's your own post": 'Ова е твоја објава',
            'Could not open conversation': 'Разговорот не можеше да се отвори',
            'Could not start conversation': 'Разговорот не можеше да започне',
            'Could not send message': 'Пораката не можеше да се испрати',
            'Could not unfollow': 'Не можеше да се отследи',
            'Could not load.': 'Не можеше да се вчита.',
            'Loading…': 'Се вчитува…',
            'Post deleted': 'Објавата е избришана',
            'Could not delete post': 'Објавата не можеше да се избрише',
            'Could not load post': 'Објавата не можеше да се вчита',
            'Could not load post for editing': 'Објавата не можеше да се вчита за уредување',
            "Delete this post? This can't be undone.": 'Да ја избришеш оваа објава? Ова не може да се врати.',
            'File upload failed': 'Прикачувањето на датотеката не успеа',
            'Could not save post': 'Објавата не можеше да се зачува',
            'Could not save exam': 'Испитот не можеше да се зачува',
            'Could not save internship': 'Праксата не можеше да се зачува',
            'Could not save event': 'Настанот не можеше да се зачува',
            'Could not save request': 'Барањето не можеше да се зачува',
            'Could not save listing': 'Огласот не можеше да се зачува',
            'Resource updated!': 'Материјалот е ажуриран!',
            'Resource uploaded!': 'Материјалот е прикачен!',
            'Exam updated!': 'Испитот е ажуриран!',
            'Exam uploaded!': 'Испитот е прикачен!',
            'Internship updated!': 'Праксата е ажурирана!',
            'Internship posted!': 'Праксата е објавена!',
            'Event updated!': 'Настанот е ажуриран!',
            'Event posted!': 'Настанот е објавен!',
            'Team request updated!': 'Барањето за тим е ажурирано!',
            'Team request posted!': 'Барањето за тим е објавено!',
            'Listing updated!': 'Огласот е ажуриран!',
            'Listing posted!': 'Огласот е објавен!',
            "This category isn't connected yet — coming in a later step": 'Оваа категорија сè уште не е поврзана — доаѓа во следен чекор',
            'Resource': 'Материјал',
            'Exam': 'Испит',
            'Roommate post': 'Објава за цимер',
            'No followers yet.': 'Сè уште нема следбеници.',
            'No following yet.': 'Сè уште не следи никого.',
            'STUDY MATERIAL': 'МАТЕРИЈАЛ ЗА УЧЕЊЕ',
            'INTERNSHIP': 'ПРАКСА',
            'EVENT': 'НАСТАН',
            'TEAM REQUEST': 'БАРАЊЕ ЗА ТИМ',
            'ROOMMATE POST': 'ОБЈАВА ЗА ЦИМЕР',
            'EXAM': 'ИСПИТ',
            'SOLUTIONS INCLUDED': 'ВКЛУЧЕНИ РЕШЕНИЈА',
            'MONTH': 'МЕСЕЦ',

            'Preview': 'Преглед',
            'Download': 'Преземи',
            'Practice': 'Вежбај',
            'Save': 'Зачувај',
            'Saved': 'Зачувано',
            'Details': 'Детали',
            'Apply now': 'Аплицирај',
            'View event': 'Види настан',
            'Profile': 'Профил',
            'Invite': 'Покани',
            'Contact': 'Контакт',
            'Structured student-made resource with clear explanations and exam-focused examples.': 'Структуриран студентски материјал со јасни објаснувања и примери фокусирани на испити.',
            'PREVIOUS EXAM': 'СТАР ИСПИТ',
            'Difficulty: medium · Solutions included': 'Тежина: средна · Вклучени решенија',
            'Difficulty: hard · Solutions included': 'Тежина: тешка · Вклучени решенија',
            'Difficulty: easy · Solutions included': 'Тежина: лесна · Вклучени решенија',

            'Junior Frontend Developer': 'Junior Frontend програмер',
            'Software Engineering Intern': 'Практикант по софтверско инженерство',
            'Data Analytics Intern': 'Практикант за анализа на податоци',
            'Junior QA Intern': 'Junior QA практикант',
            'Machine Learning Intern': 'Практикант за машинско учење',
            'Product Design Intern': 'Практикант за продукт дизајн',

            'Paid · Skopje': 'Платено · Скопје',
            'Paid · Macedonia': 'Платено · Македонија',
            'Hybrid': 'Хибридно',
            'On-site': 'Во канцеларија',
            'Remote': 'Далечински',
            'Free': 'Бесплатно',

            'Meetup · Free': 'Средба · Бесплатно',
            'Hackathon · Team event': 'Хакатон · Тимски настан',
            'Workshop · Limited': 'Работилница · Ограничени места',
            'Talks · Networking': 'Предавања · Вмрежување',
            'Conference · Free': 'Конференција · Бесплатно',
            'Startup · 54 hours': 'Стартап · 54 часа',
            '120 students interested': '120 заинтересирани студенти',

            'Deadline': 'Рок',
            'Scholarships': 'Стипендии',
            'Campus': 'Кампус',
            'Competitions': 'Натпревари',
            'Mobility': 'Мобилност',
            'Volunteering': 'Волонтирање',

            'Applications open for student mobility programme': 'Отворени апликации за студентска мобилност',

            'Students can apply for the autumn semester exchange programme until 15 August.': 'Студентите можат да аплицираат за есенската размена до 15 август.',

            'New summer consultation schedule published': 'Објавен е нов летен распоред за консултации',

            'The updated consultation schedule for Mathematics 1, ADS and Computer Networks is now available.': 'Ажурираниот распоред за консултации по Математика 1, ADS и Компјутерски мрежи е достапен.',

            'Call for student speakers: Technology and Society': 'Повик за студентски говорници: Технологија и општество',
            'Cookie notice': 'Известување за колачиња',
            'Cookies and storage': 'Колачиња и складирање во прелистувач',
            'UniHub uses essential browser storage for login sessions and small preferences like your last viewed tab. We do not use advertising or analytics cookies. Read our': 'UniHub користи неопходно складирање во прелистувач за сесии за најава и мали поставки како последно отворениот таб. Не користиме рекламни или аналитички колачиња. Прочитај ја нашата',
            'Privacy page': 'страница за приватност',
            'Reject': 'Одбиј',
            'Accept': 'Прифати',

            'Submit a 10-minute talk proposal by 5 August. First-time speakers are welcome.': 'Испрати предлог за 10-минутно предавање до 5 август. Добредојдени се и први говорници.'
        }
    };

    const rules = {
        sq: [
            [/^Good evening, (.+)$/, 'Mirëmbrëma, $1'],
            [/^Switch to (light|dark) mode$/, 'Kalo në modalitetin $1'],
            [/^(\d+) comments$/, '$1 komente'],
            [/^Rating (.+)$/, 'Vlerësimi $1'],
            [/^(.+) downloads$/, '$1 shkarkime'],
            [/^Closes in (\d+) days$/, 'Mbyllet për $1 ditë'],
            [/^(\d+) minutes ago$/, '$1 minuta më parë'],
            [/^(\d+) hours ago$/, '$1 orë më parë'],
            [/^(\d+) days ago$/, '$1 ditë më parë'],
            [/^Results for "(.+)"$/, 'Rezultatet për "$1"'],
            [/^No matches for "(.+)"\.$/, 'Nuk ka përputhje për "$1".'],
            [/^(.+)'s posts and activity on UniHub\.$/, 'Postimet dhe aktiviteti i $1 në UniHub.'],
            [/^(.+) liked your resource$/, '$1 pëlqeu materialin tënd'],
            [/^(.+) liked your exam$/, '$1 pëlqeu provimin tënd'],
            [/^(.+) liked your internship$/, '$1 pëlqeu praktikën tënde'],
            [/^(.+) liked your event$/, '$1 pëlqeu eventin tënd'],
            [/^(.+) liked your team request$/, '$1 pëlqeu kërkesën tënde të ekipit'],
            [/^(.+) liked your roommate post$/, '$1 pëlqeu postimin tënd për bashkëbanim'],
            [/^(.+) commented on your resource$/, '$1 komentoi në materialin tënd'],
            [/^(.+) commented on your exam$/, '$1 komentoi në provimin tënd'],
            [/^(.+) commented on your internship$/, '$1 komentoi në praktikën tënde'],
            [/^(.+) commented on your event$/, '$1 komentoi në eventin tënd'],
            [/^(.+) commented on your team request$/, '$1 komentoi në kërkesën tënde të ekipit'],
            [/^(.+) commented on your roommate post$/, '$1 komentoi në postimin tënd për bashkëbanim'],
            [/^(.+) liked your (.+)$/, '$1 pëlqeu $2 tënd'],
            [/^(.+) commented on your (.+)$/, '$1 komentoi në $2 tënd'],
            [/^(.+) started following you$/, '$1 filloi të të ndjekë'],
            [/^(.+) sent you a message$/, '$1 të dërgoi një mesazh'],
            [/^(.+)% match$/, '$1% përputhje'],
            [/^(\d+) projects$/, '$1 projekte'],
            [/^(.+) rating$/, 'Vlerësimi $1'],
            [/^(.+) weekly$/, '$1 në javë'],
            [/^(.+) to campus$/, '$1 deri në kampus'],
            [/^(.+) included$/, '$1 përfshirë'],
            [/^(.+) move-in$/, '$1 hyrje'],
            [/^Choose (.+)$/, 'Zgjidh $1']
        ],

        mk: [
            [/^Good evening, (.+)$/, 'Добра вечер, $1'],
            [/^Switch to (light|dark) mode$/, 'Префрли во $1 режим'],
            [/^(\d+) comments$/, '$1 коментари'],
            [/^Rating (.+)$/, 'Оцена $1'],
            [/^(.+) downloads$/, '$1 преземања'],
            [/^Closes in (\d+) days$/, 'Затвора за $1 дена'],
            [/^(\d+) minutes ago$/, 'пред $1 минути'],
            [/^(\d+) hours ago$/, 'пред $1 часа'],
            [/^(\d+) days ago$/, 'пред $1 дена'],
            [/^Results for "(.+)"$/, 'Резултати за "$1"'],
            [/^No matches for "(.+)"\.$/, 'Нема резултати за "$1".'],
            [/^(.+)'s posts and activity on UniHub\.$/, 'Објавите и активноста на $1 на UniHub.'],
            [/^(.+) liked your resource$/, '$1 го лајкна твојот материјал'],
            [/^(.+) liked your exam$/, '$1 го лајкна твојот испит'],
            [/^(.+) liked your internship$/, '$1 ја лајкна твојата пракса'],
            [/^(.+) liked your event$/, '$1 го лајкна твојот настан'],
            [/^(.+) liked your team request$/, '$1 го лајкна твоето барање за тим'],
            [/^(.+) liked your roommate post$/, '$1 ја лајкна твојата објава за цимер'],
            [/^(.+) commented on your resource$/, '$1 коментираше на твојот материјал'],
            [/^(.+) commented on your exam$/, '$1 коментираше на твојот испит'],
            [/^(.+) commented on your internship$/, '$1 коментираше на твојата пракса'],
            [/^(.+) commented on your event$/, '$1 коментираше на твојот настан'],
            [/^(.+) commented on your team request$/, '$1 коментираше на твоето барање за тим'],
            [/^(.+) commented on your roommate post$/, '$1 коментираше на твојата објава за цимер'],
            [/^(.+) liked your (.+)$/, '$1 ја лајкна твојата $2'],
            [/^(.+) commented on your (.+)$/, '$1 коментираше на твојата $2'],
            [/^(.+) started following you$/, '$1 почна да те следи'],
            [/^(.+) sent you a message$/, '$1 ти испрати порака'],
            [/^(.+)% match$/, '$1% совпаѓање'],
            [/^(\d+) projects$/, '$1 проекти'],
            [/^(.+) rating$/, 'Оцена $1'],
            [/^(.+) weekly$/, '$1 неделно'],
            [/^(.+) to campus$/, '$1 до кампус'],
            [/^(.+) included$/, '$1 вклучено'],
            [/^(.+) move-in$/, '$1 вселување'],
            [/^Choose (.+)$/, 'Избери $1']
        ]
    };

    const textOriginals = new WeakMap();
    const originalTitle = document.title;
    let applying = false;

    function finishApplying() {
        setTimeout(() => {
            applying = false;
        }, 0);
    }

    function normalize(text) {
        return text
            .replace(/\u00a0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function translateValue(value, lang) {
        if (!value || lang === DEFAULT_LANG) {
            return value;
        }

        const key = normalize(value);
        const direct = dictionaries[lang]?.[key];

        if (direct) {
            return value.replace(key, direct);
        }

        for (const [pattern, replacement] of rules[lang] || []) {
            if (pattern.test(key)) {
                return value.replace(
                    key,
                    key.replace(pattern, replacement)
                );
            }
        }

        return value;
    }

    function translateTextNode(node, lang) {
        if (!normalize(node.nodeValue)) {
            return;
        }

        if (!textOriginals.has(node)) {
            textOriginals.set(node, node.nodeValue);
        }

        const original = textOriginals.get(node);

        const next =
            lang === DEFAULT_LANG
                ? original
                : translateValue(original, lang);

        if (node.nodeValue !== next) {
            node.nodeValue = next;
        }
    }

    function translateAttributes(element, lang) {
        ['placeholder', 'title', 'aria-label'].forEach(attr => {
            if (!element.hasAttribute(attr)) {
                return;
            }

            const key =
                `i18nOriginal${attr.replace(
                    /-([a-z])/g,
                    (_, c) => c.toUpperCase()
                )}`;

            if (!element.dataset[key]) {
                element.dataset[key] =
                    element.getAttribute(attr);
            }

            const original = element.dataset[key];

            const next =
                lang === DEFAULT_LANG
                    ? original
                    : translateValue(original, lang);

            if (element.getAttribute(attr) !== next) {
                element.setAttribute(attr, next);
            }
        });
    }

    function shouldSkipText(element) {
        return element.closest(
            'script,style,textarea,[data-i18n-ignore],.language-switcher'
        );
    }

    function shouldSkipElement(element) {
        return element.closest(
            'script,style,[data-i18n-ignore],.language-switcher'
        );
    }

    function translateNode(node, lang) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (!shouldSkipText(node.parentElement)) {
                translateTextNode(node, lang);
            }

            return;
        }

        if (
            node.nodeType !== Node.ELEMENT_NODE ||
            shouldSkipElement(node)
        ) {
            return;
        }

        translateAttributes(node, lang);

        node.childNodes.forEach(child =>
            translateNode(child, lang)
        );
    }

    function applyLanguage(lang) {
        const selected =
            dictionaries[lang]
                ? lang
                : DEFAULT_LANG;

        applying = true;

        document.documentElement.lang = selected;
        document.documentElement.dataset.language = selected;

        document.title =
            selected === DEFAULT_LANG
                ? originalTitle
                : translateValue(originalTitle, selected);

        document
            .querySelectorAll('.language-switcher select')
            .forEach(select => {
                select.value = selected;
            });

        translateNode(document.body, selected);

        finishApplying();
    }

    function injectSwitcher() {
        if (
            document.querySelector('.language-switcher')
        ) {
            return;
        }

        const switcher =
            document.createElement('label');

        switcher.className = 'language-switcher';
        switcher.dataset.i18nIgnore = 'true';

        switcher.innerHTML = `
      <span>Language</span>
      <select aria-label="Language">
        <option value="en">English</option>
        <option value="sq">Shqip</option>
        <option value="mk">Македонски</option>
      </select>
    `;

        switcher.querySelector('select').value =
            localStorage.getItem(LANG_KEY) ||
            DEFAULT_LANG;

        switcher
            .querySelector('select')
            .addEventListener('change', event => {
                localStorage.setItem(
                    LANG_KEY,
                    event.target.value
                );

                applyLanguage(event.target.value);
            });

        document.body.appendChild(switcher);
    }

    function injectStyles() {
        if (
            document.getElementById('i18nStyles')
        ) {
            return;
        }

        const style =
            document.createElement('style');

        style.id = 'i18nStyles';

        style.textContent = `
      .language-switcher{
        position:fixed;
        right:18px;
        bottom:18px;
        z-index:2000;
        display:flex;
        align-items:center;
        gap:8px;

        padding:8px 10px;

        border:
          1px solid rgba(148,163,184,.28);

        border-radius:999px;

        background:
          rgba(15,23,42,.86);

        color:#f8fafc;

        box-shadow:
          0 16px 40px rgba(0,0,0,.24);

        font:
          600 12px Inter,system-ui,sans-serif;

        backdrop-filter:blur(18px);
      }

      [data-theme="light"]
      .language-switcher{
        background:
          rgba(255,255,255,.9);

        color:#111827;
      }

      .language-switcher span{
        opacity:.72;
      }

      .language-switcher select{
        border:0;
        background:transparent;
        color:inherit;
        font:inherit;
        outline:0;
      }

      .language-switcher option{
        color:#111827;
      }

      @media (max-width:720px){
        .language-switcher{
          right:12px;
          bottom:12px;
        }

        .language-switcher span{
          display:none;
        }
      }
    `;

        document.head.appendChild(style);
    }

    document.addEventListener(
        'DOMContentLoaded',
        () => {
            injectStyles();
            injectSwitcher();

            applyLanguage(
                localStorage.getItem(LANG_KEY) ||
                DEFAULT_LANG
            );

            const observer =
                new MutationObserver(mutations => {
                    if (applying) {
                        return;
                    }

                    const lang =
                        localStorage.getItem(LANG_KEY) ||
                        DEFAULT_LANG;

                    if (lang === DEFAULT_LANG) {
                        return;
                    }

                    applying = true;

                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node =>
                            translateNode(node, lang)
                        );

                        if (
                            mutation.type ===
                            'characterData'
                        ) {
                            textOriginals.delete(
                                mutation.target
                            );

                            translateNode(
                                mutation.target,
                                lang
                            );
                        }
                    });

                    finishApplying();
                });

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true,
                    characterData: true
                }
            );
        }
    );
})();
