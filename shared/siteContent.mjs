export const aboutPage = {
  id: 'about',
  type: 'about',
  title: 'All About Me',
  slug: 'about',
  url: '/about',
  icon: '\u{1F464}',
  color: '#9333EA',
  date: '2025-12-30',
  displayDate: 'Dec 30, 2025',
  summary:
    "Learn about Eesha Gupta, a freshman from Fremont interested in technology, AI, machine learning, web design, writing, and creative projects.",
  keywords: [
    'eesha',
    'about',
    'fremont',
    'freshman',
    'class of 2029',
    'technology',
    'ai',
    'machine learning',
    'coding',
    'web design',
    'writing',
    'photography',
    'running'
  ],
  fullText: `Hi, I'm Eesha, a freshman (class of 2029) from Fremont, California.

I hope this website reminds you of Spotify, because that's what it's based off of. I love listening to music on Spotify, so I decided to base my personal website off it.

On my website, you will find info to contact me, my socials, blogs and my different projects I have made or am working on, if you have any questions feel free to reach out to me through my email :)

Now, a bit about myself because this is an all about me page. As you can probably tell, I'm really into technology. I've been hooked ever since my brother taught me how to use google docs in first grade and I've loved coding ever since I touched scratch in second grade. With Covid, I spent more time coding projects, even sharing them along with tutorials on youtube, with my channel getting overall 30,000 views.

Over time, I started learning new coding languages and getting a better understanding of computer science concepts, doing competitions like ACSL (American computer science league) and of course I've done all the math competitions, Math Olympiad, Math Kangaroo, AMC 8 and AMC 10, and I plan to continue doing more in the future.

Outside of coding, I started learning more skills like working with AI and machine learning, and of course web design, one of my favorite hobbies. (You can see my work with these things on the project page haha)

Outside of technology, I like reading murder mystery and self help books, watching bollywood movies, listening to music, writing, photography, and running. My favorite self-help book is Atomic Habits, it's the first self-help book I read and convinced me to read more. In the past, I definitely did not like movies, but after my parents made me watch some classics, I can definitely say I enjoy them a lot more now. Running is a new hobby I picked up this year, and even though I can question why I ever run while actually running, I wouldn't say it's too bad when you run with other people, and it's a good way to clear your head and the sense of accomplishment after makes it all worth it. In the future, I definitely want to get more experience using a professional camera, and try other hobbies.

Here are some of my favorites:
Favorite color - pink
Favorite animal - cats
Favorite fruit - mangos
Favorite food - tacos
Favorite dessert - pizacookie
Favorite Chocolate - Crunch Bars
Favorite subject - math
Favorite sport - track
Favorite sport to watch - F1, Cricket
Favorite place I've visited - New York City
Favorite music artist - Frank Ocean
Favorite song - Champagne Coast - Blood Orange

Thanks so much for reading, please explore the rest of the website :))`
};

export const projects = [
  {
    id: 5,
    type: 'project',
    name: 'Personal Website',
    title: 'Personal Website',
    slug: 'personal-website',
    url: '/projects/personal-website',
    icon: '\u{1F929}',
    color: '#9E17AB',
    date: '2025-12-28',
    dateAdded: 'Dec 28, 2025',
    summary:
      'A Spotify-inspired personal website that brings together Eesha\'s projects, blogs, socials, contact info, and personal interests.',
    keywords: ['website', 'portfolio', 'spotify', 'personal site', 'react', 'design', 'blogs', 'projects'],
    fullText: `Personal Website: eeshag.com (this website haha)
A personal, Spotify-inspired website that acts as a central hub for my projects, blogs, socials, and contact information.
Blends creative writing, technical work, and personal interests into a single, cohesive interface that feels like browsing playlists and albums.
Why I Made This Project
I wanted one place where people could learn about me, explore my projects, read my thoughts, and easily reach out.
I love both music and web design, and modeling the site after Spotify made the process more fun and personally meaningful.
This combines building something I would actually enjoy using and creating something functional.
How I Built It
Designed the entire site around the mental model of playlists, albums, and tracks to keep navigation intuitive.
Structured content so blogs, projects, and personal sections all feel consistent while serving different purposes.
Iterated continuously, adding new blogs, projects, and UI refinements over time.
Frontend: React, built as a single-page application for smooth navigation and fast transitions.
Platform: Fully web-based and responsive, designed to work cleanly on both desktop and mobile.
Design Focus: Spotify-inspired layout, dark-mode aesthetic, and familiar visual hierarchy.
Each page mimics a music experience: projects as songs, pages as playlists, blogs as albums.
Emphasis on clarity, personality, and a playful but polished feel.
Each post has its own icon and background color, and the player at the bottom fills in as you scroll.
How the Website Works
Sidebar and quick links provide instant access to socials, contact methods, blogs, and projects.
Project pages function like playlists, with a banner at the top and each project listed like a track.
Blog pages resemble Spotify's search and browse view, with each post presented as its own album.
Includes a currently consuming section where I share media categories I am engaging with.
Includes an all about me page which shares quick facts about me and my journey.
What I Learned
Balancing creative expression with clean engineering and responsive design.
The value of continuously shipping and iterating, rather than treating a website as finished.
Future Plans
Add more interactive elements to blogs and project pages.
Continue expanding content, especially long-form writing and more technical projects.
Further refine performance, animations, and personalization while keeping the Spotify-style identity intact.`
  },
  {
    id: 1,
    type: 'project',
    name: 'IHS Imposter',
    title: 'IHS Imposter',
    slug: 'ihs-imposter',
    url: '/projects/ihs-imposter',
    icon: '\u{1F3AD}',
    color: '#6366F1',
    date: '2026-01-07',
    dateAdded: 'Jan 7, 2026',
    summary:
      'A multiplayer school-themed party game inspired by Imposter, built so students can play online instead of sharing one device in person.',
    keywords: ['game', 'multiplayer', 'react', 'render', 'school', 'imposter', 'party game'],
    fullText: `Play the game: https://ihs-imposter.vercel.app/
IHS Imposter is a web-based multiplayer party game inspired by a popular game in my school right now, Imposter, but with my own twists.
Why I Made This Project
I wanted a fun project that people at my school could actually play.
I was interested in how multiplayer games work behind the scenes.
I wanted hands-on coding experience, especially with frontend and backend logic.
I wanted to create a version that could be played online and make it school themed.
How I Built It
Frontend: React.
Backend: Render, designed to support real-time updates.
UI focus: clean school colors with blue and white.
Key things I implemented:
Game code system, create game and join game flows, player limits and validation, imposter role assignment, word and hint system, random turn order selection, and voting.
How the Game Works
A host creates a game and chooses player count and number of imposters.
Players join using a game code.
Once the lobby is full, the host can start the game.
Imposters see Imposter and a hint while other players see the secret word.
Everyone gives clues, then votes on who the imposters are.
What I Learned
Creating backend for an app, managing game state across multiple users, thinking through edge cases, and designing UI that works on phones and computers.
Future Plans
Add timers, more words and categories, more players, and suggestions from fellow Vikings.`
  },
  {
    id: 2,
    type: 'project',
    name: 'Poly Market Project',
    title: 'Poly Market Project',
    slug: 'poly-market-project',
    url: '/projects/poly-market-project',
    icon: '\u{1F4CA}',
    color: '#A78BFA',
    date: '2026-01-22',
    dateAdded: 'Jan 22, 2026',
    summary:
      "Indexr, a frontend Eesha built for Polymarket's news team to track markets, price movements, and activity for a newsletter reaching 250,000+ readers.",
    keywords: ['polymarket', 'indexr', 'frontend', 'newsletter', 'editorial', 'markets', 'ui'],
    fullText: `View project: https://pmindexr.vercel.app/
What is Indexr
Tool used daily by Polymarket's news team to build their newsletter.
Helps track relevant markets, price movements, and notable activity.
Newsletter reaches 250,000 plus readers.
How I Got to Work on This Project
I was introduced to a member of the Polymarket team through a mentor from my robotics background.
I was brought on to design and build the frontend for Indexr.
My Work on This Project
Designed the full frontend UI and interaction flows.
Translated loosely defined internal needs into a clear, usable interface.
Structured information architecture for fast market discovery and selection.
Built reusable UI components focused on speed, clarity, and low cognitive load.
Optimized the interface for editors working under time pressure.
What I Learned
How to design for real operational use rather than demos.
The importance of reliability and speed in data-dense tools.
How to work quickly based on user feedback and evolving requirements.
How thoughtful UI design can materially improve workflow efficiency.`
  },
  {
    id: 3,
    type: 'project',
    name: 'People vs. Pavement',
    title: 'People vs. Pavement',
    slug: 'people-vs-pavement',
    url: '/projects/people-vs-pavement',
    icon: '\u{1F697}',
    color: '#D9C3F0',
    date: '2026-02-05',
    dateAdded: 'Feb 5, 2026',
    summary:
      'An interactive web project about how car-dependent suburban design restricts daily life, using simulations, humor, and experiential storytelling.',
    keywords: ['urbanism', 'suburbia', 'cars', 'interactive', 'react', 'awareness', 'public education'],
    fullText: `People vs. Pavement: https://people-vs-pavement.vercel.app/
People vs. Pavement is an interactive web project that demonstrates how car-dependent suburban design restricts people's daily routines, independence, and opportunities.
Instead of relying on dense statistics or lectures, the site uses simulations, choices, and light humor to make the consequences of car-centric planning experiential.
Why I Made This Project
I grew up in a suburban environment and initially assumed that needing a car for nearly everything was normal.
After learning more from NotJustBikes, I realized this design is not inevitable and has real consequences for accessibility, equity, and quality of life.
I wanted to use my web development skills to raise awareness in a way that people would actually engage with.
How I Built It
Frontend: React single-page application.
Platform: fully web-based and responsive.
Design focus: clean, roads, slight danger, with orange and yellow accents.
How the Website Works
The whole experience lives on one page organized into tab-based sections.
There is a bingo, chatbot questions, a simulator, an excuses section, and a final why section with my own perspective.
What I Learned
How to translate an issue into an interactive, user-driven experience.
How software can be used for public education and real-world causes.
Future Plans
Add more simulations, personal stories, before and after visualizations, an action plan, and more data collection.`
  },
  {
    id: 4,
    type: 'project',
    name: 'Study Goblin',
    title: 'Study Goblin',
    slug: 'study-goblin',
    url: '/projects/study-goblin',
    icon: '\u{1F9CC}',
    color: '#7C9A6E',
    date: '2026-02-12',
    dateAdded: 'Feb 12, 2026',
    summary:
      'A fast, distraction-free study website for UC Scout courses with condensed summaries, practice exams, timers, and personalized feedback.',
    keywords: ['study', 'education', 'uc scout', 'react', 'practice tests', 'students', 'learning'],
    fullText: `View Project: https://study-goblin.vercel.app/
Study Goblin is a fast, distraction-free study website designed to help students review UC Scout courses efficiently.
It provides condensed unit summaries, realistic practice exams, and detailed feedback to help students improve in a short amount of time.
Why I Made This Project
I noticed many of my friends were extremely stressed about UC Scout exams, especially when they were short on time.
I wanted to create one clean, centralized platform with everything they need to review quickly and confidently.
How I Built It
Single-page web application built using React.
Responsive on desktop and mobile.
No accounts or backend required.
Design focus: minimal and sleek interface to reduce distractions, dark mode by default, optional light mode.
How the Website Works
Users select a course and view condensed summaries for every unit.
Each unit includes optional read-aloud buttons.
The site includes practice midterms and finals modeled after real UC Scout exams.
Users can enable a timer and pause, resume, or cancel it.
After submitting a test, users receive their score, percentage, time used, and personalized feedback with explanations.
What I Learned
How to prioritize speed and usability and structure educational content so it is easy to skim but still effective.
Future Plans
Support more AP courses, add flashcards, try a Kahoot-style mode, and keep improving feedback.`
  },
  {
    id: 6,
    type: 'project',
    name: 'Fair Lens',
    title: 'Fair Lens',
    slug: 'fair-lens',
    url: '/projects/fair-lens',
    icon: '\u{1F50E}',
    color: '#06B6D4',
    date: '2026-02-19',
    dateAdded: 'Feb 19, 2026',
    summary:
      'An AI-powered educational tool that helps teachers identify subtle bias and stereotypes in text, images, and PDFs before using them in the classroom.',
    keywords: ['ai', 'machine learning', 'education', 'bias', 'fairness', 'teachers', 'research', 'streamlit'],
    fullText: `Status: In progress, writing and publishing research paper.
FairLens is an AI-powered educational tool that helps teachers and educators identify subtle bias and stereotypes in learning materials before they are used in the classroom.
It analyzes text, images, and PDFs and generates clear reports explaining what types of bias, if any, are present.
Why I Made This Project
Educational content plays a major role in shaping how students perceive gender, race, and culture, often in subtle ways that go unnoticed.
I wanted to help break the cycle of reinforcing harmful stereotypes by giving educators an easy way to review materials ahead of time.
The goal was to use AI not just for efficiency, but for awareness, fairness, and social good in education.
How I Built It
Designed the system around large language models to analyze tone, context, and patterns rather than relying on simple keyword matching.
Integrated text, image, and PDF analysis.
Built a unified dataset for testing model accuracy and compared several different models.
Frontend: Streamlit with Google authentication.
How the Website Works
Users log in, upload text, images, or PDFs, and receive a structured report describing detected biases.
If no bias is detected, the system clearly communicates that result.
What I Learned
How to build and integrate an AI-powered web application end to end, including authentication, file handling, model evaluation, prompt engineering, and dataset validation.
Future Plans
Add video analysis, support multiple languages, and work toward real-world adoption in schools.`
  },
];

export const blogs = [
  {
    id: 1,
    type: 'blog',
    title: 'Cats',
    slug: 'cats',
    url: '/blogs/cats',
    excerpt: 'A personal story about going from being scared of cats to loving them after meeting Mushroom.',
    summary: 'A personal reflection on how meeting a foster kitten changed Eesha\'s view of cats.',
    date: '2026-01-17',
    icon: '\u{1F63A}',
    color: '#B82245',
    keywords: ['cats', 'mushroom', 'pets', 'animals', 'personal story'],
    fullText: `Cats are my favorite animal, which if I told my younger self that, she would have been shocked, because I didn't like cats at all back then.
When I was younger, cats used to terrify me, even though I had never actually met a pet cat.
There were strays that would come into our backyard or be on the street, and they never actually did anything bad but somehow I couldn't shake the image that cats were evil, scary creatures out of my head.
I had met multiple dogs in the past and assumed I wouldn't like cats either.
That all changed over Thanksgiving break when my brother decided to foster a kitten for a month.
Her name was Mushroom.
Mushroom was adorable, curious, entertaining, and followed my brother everywhere.
She taught me to never judge a book by its cover.
Now cats are my favorite animal, and I want a cat myself.`
  },
  {
    id: 2,
    type: 'blog',
    title: 'My First Scratch Project',
    slug: 'my-first-scratch-project',
    url: '/blogs/my-first-scratch-project',
    excerpt: 'A reflection on the first Scratch game Eesha built on her own and how it helped spark her love of coding.',
    summary: 'A story about Eesha\'s first independent Scratch project and why starting imperfectly still matters.',
    date: '2026-02-08',
    icon: '\u{1F603}',
    color: '#9B039A',
    keywords: ['scratch', 'coding', 'youtube', 'nocal robotics', 'first project'],
    fullText: `I was first introduced to Scratch through a local nonprofit called NoCal Robotics.
I didn't think I would find coding fun, but I was completely wrong.
I got hooked and started creating projects and posting them online.
I also loved teaching, so I started a YouTube channel where I shared tutorials and projects.
My first Scratch project was a game called Catching Stars.
You control a dog, collect stars, avoid a starfish and the sun, and try not to lose lives.
Even though it looks simple now, it took a lot of effort, debugging, and experimentation at the time.
Looking back, I am proud of my fourth grade self for starting something imperfectly and following through.`
  },
  {
    id: 3,
    type: 'blog',
    title: 'Why Everyone Should Have a Blog',
    slug: 'why-everyone-should-have-a-blog',
    url: '/blogs/why-everyone-should-have-a-blog',
    excerpt: 'Reasons to start writing and sharing your thoughts online, from writing practice to self-understanding.',
    summary: 'Eesha argues that blogs help with writing, reflection, self-expression, and preserving memories over time.',
    date: '2026-02-16',
    icon: '\u{1F4DD}',
    color: '#F95C4B',
    keywords: ['blogging', 'writing', 'reflection', 'self expression', 'website'],
    fullText: `In this blog post, I talk about why you should start a blog too.
Blogs give you writing practice about topics you actually care about.
They also help you understand yourself better because you have to think about what matters to you.
Blogs become a time capsule you can revisit later to understand how you have changed.
You do not need to be a coder to start one.
You can write about hobbies, stories, opinions, projects, people you care about, and more.
I think if you start one, you will find even more benefits over time.`
  },
  {
    id: 4,
    type: 'blog',
    title: 'The Power of a Cookie',
    slug: 'the-power-of-a-cookie',
    url: '/blogs/the-power-of-a-cookie',
    excerpt: 'A funny middle school story about scraping together exactly four dollars for a cookie that turned out to be terrible.',
    summary: 'A short story about a spontaneous lunch adventure that became a favorite memory despite a terrible cookie.',
    date: '2026-02-25',
    icon: '\u{1F36A}',
    color: '#C17F59',
    keywords: ['cookie', 'friends', 'middle school', 'story', 'memories'],
    fullText: `My mom always said the funniest hangouts are the spontaneous ones.
One lunch in seventh grade, my friends and I became obsessed with buying a huge Christmas sugar cookie sold by a school club.
At first we thought none of us had money.
After digging through backpacks and pockets, we somehow had exactly four dollars in dollar bills and coins.
We sprinted over, bought the cookie, split it six ways, and took a bite together.
It turned out to be the worst cookie ever.
Instead of ruining the moment, that made the whole experience even funnier and more memorable.
It became one of my favorite middle school memories.`
  },
  {
    id: 5,
    type: 'blog',
    title: 'Spaghetti Structures!',
    slug: 'first-stem-workshop-aka-spaghetti-structures',
    url: '/blogs/first-stem-workshop-aka-spaghetti-structures',
    excerpt: 'A debrief of our first GEM STEM workshop on structural engineering and spaghetti towers.',
    summary: 'Eesha reflects on planning and running her first in-person GEM workshop, from logistics and timing to the joy of teaching.',
    date: '2026-03-30',
    icon: '\u{1F477}\u{200D}\u{2640}\u{FE0F}',
    color: '#7A5CFA',
    keywords: ['stem', 'workshop', 'engineering', 'girls in engineering and management', 'gem', 'structural engineering'],
    fullText: `Hi guys, this sunday my cousin and I hosted our first STEM Workshop.
For a bit of context, my cousin and I have been in STEM for a very long time.
We have been doing robotics since second grade.
During all our time in STEM, we have experienced and seen other girls being undermined, ignored, and discouraged, just because of our gender.
We wanted to do something about this, which is why we created GEM (Girls in engineering and management).
We wanted to create a space where girls were valued and respected, so that they could genuinely learn and enjoy STEM.
As part of GEM, we have organized 5 workshops each covering different aspects of STEM.
We just had our engineering workshop where we talked about structural engineering.
We taught them how structures remained stable, following it up with an activity.
In the activity, they were tasked with creating the tallest tower possible with spaghetti, marshmallows and tape, but it also had to be stable, any tower that fell down would not be counted.
We gave them time beforehand to come up with and sketch a design on paper, and present their idea to us.
At the end, we gave everyone prizes, let everyone eat the extra marshmallows (not the one they used for their project of course), and handed out a paper with the summary of the topics we covered in class.
For the extra time before and after the class, we had brought () and () because they both relate to structural engineering, plus letting them improve their towers, build new towers, and draw or play games on the white board.
Not to brag, but I would say the workshop went pretty well.
First off, nearly everyone who signed up showed up, everyone besides one person.
In my experience, that never really happens with free classes and activities.
Everything takes it for granted, because if their kid does not show up, they do not lose money.
So, I am really grateful for everyone actually sticking to their word here, the more the merrier and all the girls were so nice and funny!
One thing me and my cousin were really stressed about beforehand was time.
You can give estimates about how long each acidity will take, but as both of us have figured out through our years of teaching, that never really goes to plan.
We were worried about having too much time or too little time left over, but luckily everything honestly went pretty perfectly in terms of time.
We were right on schedule.
Most of the classes Anika and I have taught have been online.
I have been part of Norcal Robotics since sixth grade, where I did python summer camps, tinkercad summer camps, thunkable summer camps, Canva summer camps, python classes, math classes, ACSL classes, and probably even more, but each of those were online.
Planning in person comes with a whole new set of logistics.
You have to think about where you are going to to do the classes, how you will arrange the chairs, how you will share your screen, how many materials do you need to get, etc.
For us, we definitely got way too many materials.
The marshmallows practically finished because all the girls ate the extras, but the spaghetti on the other hand...
My cousin and I will be eating spaghetti for weeks.
We also had a lot of extra tape.
Luckily, the materials for this workshop were pretty cheap, and it is always better to have more than less.
Planning out these workshops definitely takes a lot of time, my cousin and I spent a ridiculous amount of time and energy just brainstorming.
Then you have to create the website page and do advertising.
Then you have to come out with actual content for the classes, make the slides, make the one pager to give at the end of the class.
You need to practice and memorize the content on the slides.
You have to decide on materials, decide how much of each material to get, and actually try out the activity for yourself to make sure it works.
You need to go a day before to rearrange the classroom, and make sure the projector and everything is working along with bringing all the materials.
On the day of, you need to come early for final adjustments, and stay after to clean everything up.
During the class you need to take pictures for instagram, and you have to go through them and make the instagram post.
You need to be sending out reminder emails and responding to questions.
You have to manage at least 20 girls.
Honestly though, work it.
Doing all the work, although sometimes it can be a headache, is actually pretty fun and rewarding.
It was fun learning about structural engineering, it was fun trying to make a tower on our own beforehand.
It was fun taking pictures during the lesson and designing stuff on Canva.
It was fun talking and teaching the girls.
It was fun spending all this time thinking about ideas and actually seeing them come to life.
Despite the time commitment of hosting in person workshops, it is worth it.
The hands-on activities are so fun, and overall, in person is just funner for everyone compared to online.
I would like to personally thank my mom for the workshops running smoothly, not because she did anything directly, but because of the prior experience and knowledge I had after being a teacher assistant for her summer camps.
During the summer my mom hosts robotics summer camps, from 9am - 3pm, with elementary schoolers.
I am telling you if you can handle 12 elementary schoolers, you can handle anyone, besides parents.
Luckily, since this was a free workshop, all the parents were super nice.
I already have so much experience teaching and answering questions, being patient, being chill and nice but firm when you can see someone is trying to break the rules, or being nonchalant when you see a kid is trying to rage bait you.
It also helped me think about the ways the workshops could go wrong, and made me think of things like bringing games or additional activities in case we had extra time.
Also, as a person who likes things to go to plan, I have learned that life has other plans, and sometimes it is better to just go with the flow then force people to do things they really do not want to do.
For example, we still had a couple of concluding slides at our workshop, but all the girls were out of it and just wanted to eat marshmallows, and I realized to just go with the flow and not finish the slides.
The summer camps also helped me with talking to people younger than me, and getting people who do not know each other to come together and talk, which helps at the start of class when it is super awkward.
It has also just improved my speaking and teaching skills in general, my voice is a lot more clear and confident, thanks to all the elementary schoolers, I can scream pretty loud.
Thats honestly my debrief from the first work.
It was a lot of work but the 1.5 hours of the actual workshop flew by.
My cousin and I are so lucky that all the girls were so nice, when we were giving the lesson they did not really talk over us, and were laughing and having fun during the activity we organized.
They were all super sweet too!
You can see the photos from our workshop on our [instagram(@norcalroboticsgem)](https://www.instagram.com/norcalroboticsgem?igsh=NTc4MTIwNjQ2YQ==).
See you at the next workshop!`
  },
  {
    id: 6,
    type: 'blog',
    title: 'Math Workshop',
    slug: 'math-workshop',
    url: '/blogs/math-workshop',
    excerpt: 'A debrief of our second workshop, where we taught two-variable equations with games and lots of participation.',
    summary: 'Eesha reflects on planning and teaching a math workshop, from trimming a long lesson to running a scavenger hunt and relay race.',
    date: '2026-04-09',
    icon: '\u{1F7F0}',
    color: '#2563EB',
    keywords: ['math', 'workshop', 'algebra', 'substitution', 'elimination', 'teaching', 'stem'],
    fullText: `Hey guys, this weekend we had our second workshop, our math workshop.
As you can probably figure out, you do not need to buy a lot of materials for a math workshop, so this workshop cost us no money.
On the other hand, it is also the most boring and hardest class to teach, so making the curriculum took forever.
We decided to teach two-variable equations.
In hindsight, maybe something geometry-related could have been more fun and hands-on.
We planned out the lesson so that we first did a review of solving one-variable equations before jumping into substitution and elimination.
We had two games to wrap it up at the end: a scavenger hunt and a relay race.
In the scavenger hunt, we had envelopes labeled clue 1, clue 2, and clue 3.
In each envelope there was a system of two-variable equations, and at the end one equation where they had to plug in the values of x and y to find the answer.
Once they solved the final equation for all three clues, they got a code to the lock.
If they tried the code and the lock opened, they won. Otherwise, they lost.
The scavenger hunt part came into play because we hid the envelopes across two rooms in the building.
In our opinion we did a good job, but they found them pretty easily.
We also had a relay race prepared with one-variable equations, where they would have to solve an equation, come to us with the answer, and get the next equation.
The first group to finish all equations won.
When we came the day before to set up, we decided to practice our presentation.
To our surprise, it took around 50 minutes.
We knew no one wanted to listen to that, ourselves included. That is literally a whole normal school period.
So we had to shorten our slides and practice problems a lot.
Another problem we faced was projecting our slideshow.
We learned that projecting onto a whiteboard might not be as clear as projecting onto a wall.
That was pretty interesting because my projector was equally clear on each surface, but my cousin's projector worked much better on a wall than a whiteboard.
In the actual workshop, this time we also handed out Dum Dums for participation because this required a lot of participation and we needed something to convince them.
It actually worked pretty well. We went through a lot of Dum Dums though.
The first part with one-variable equations went pretty well because they already knew how to solve them.
Two-variable equations were a bit harder because some of them knew it and some of them did not.
I went over substitution and my cousin went over elimination because substitution is my favorite and elimination is her favorite.
I will say it was kind of sad that no one got substitution.
I would be like, okay guys, what do we do first? What do we do now? No one raised their hand lol.
That was kind of sad, but I asked and they said there was not anything I could do better.
At least they got how to eliminate, so that did not ruin the scavenger hunt because they could solve the equations.
For this workshop, we did not get nearly as many pictures.
I think I only took 20, compared to the last workshop where I took around 80.
The photos did come out good though, so I am not really mad.
This time we also already had the drill down, so the Instagram post was up the next day.
You can see the photos from our workshop on our [instagram(@norcalroboticsgem)](https://www.instagram.com/norcalroboticsgem?igsh=NTc4MTIwNjQ2YQ==).
Overall, we did not really have high expectations for this workshop because it is arguably pretty boring and hard to teach.
We are pretty proud of how it went, so just a friendly reminder that the things you are worried about are never nearly as bad as they seem :)`
  },
  {
    id: 7,
    type: 'blog',
    title: 'Create it in 3D',
    slug: 'create-it-in-3d',
    url: '/blogs/create-it-in-3d',
    excerpt:
      'Our third GEM STEM workshop: TinkerCAD, a CAD lesson, emoji challenges, and a lot of relief when the laptops showed up.',
    summary:
      'Eesha debriefs the "Create it in 3D" tech workshop—teaching TinkerCAD, running emoji rounds, handling no email replies and laptop worries, and why planning ahead paid off.',
    date: '2026-04-16',
    icon: '\u{1F4BB}',
    color: '#0EA5E9',
    keywords: ['stem', 'workshop', 'tinkercad', 'cad', '3d', 'gem', 'teaching', 'girls in stem'],
    fullText: `Hi guys, you can probably guess—this week we had another STEM workshop! This was our third workshop, our tech workshop, aka "Create it in 3D" (very proud of this name, by the way).

If you would like to see them, the photos from our workshop are on our [instagram(@norcalroboticsgem)](https://www.instagram.com/norcalroboticsgem?igsh=NTc4MTIwNjQ2YQ==).

Let's start with what we did in class. When everyone first came in, we let them draw and play games on the whiteboard, but the place where we hold classes only has kinda lame Expo markers, so we bring our own. We also brought games—Guess Who and card games this time. After about five to ten minutes, we got started with the slides. Before that, though, we got everyone connected to Wi-Fi, since they had to bring their own laptops. We always start with an introduction to GEM, a couple of fun facts about ourselves, and of course an icebreaker. From there, we talked about what CAD is, where it is used in the real world, and why knowing CAD will be helpful for the future.

After that, we moved on to TinkerCAD. At first we let them tinker on their own (haha, get it?), so they could explore different features by themselves. Then we went over the basics, like changing dimensions, rotation, and position, and how to make new shapes by cutting or grouping. We finished with a short tutorial on how to make a simple emoji and helped them while they tried it. Once everyone seemed comfortable, we started the challenge. We showed emojis that got progressively harder and gave a time limit to recreate each one. Whoever had the closest-looking emoji won the round. We did three rounds with the 🫤 😍 🤑 emojis. It was really fun seeing how everyone built the shapes and seeing all the creations at the end—they honestly did better than we did. At the end of class we handed out gifts and a one-pager summarizing what we taught, with winners going first and getting an extra prize. This time we also handed out GEM 3D-printed keychains; everyone got to pick green, orange, blue, or yellow.

The workshop ended up going smoothly, but there were times when we wondered whether it would work out. We sent three emails: a one-week reminder, a one-day reminder, and one asking if we could take pictures. Usually we get replies—someone saying they cannot make it, someone asking us not to photograph their kid, or at least four people canceling an hour before. This time: nothing. Not one reply. The day of the workshop it was pouring. That was not even the worst part.

While we were setting up that morning, my cousin told me about a nightmare from the night before. Most of it seemed impossible, but the part about nobody bringing a laptop felt a little too plausible. We had said in the description and all three emails that attendees needed a laptop, but it hit us that people might have skipped that detail, especially for a free workshop. There was not much we could do but hope. The first five people who walked in did not have laptops, and we started to panic—game day, rescheduling an online teach session, bringing laptops from home, full spiral mode. Thank goodness we did not need any of that. As more girls arrived, many of them did have laptops. Around half or a bit more had one, and you should have seen my cousin and me—we were so relieved.

In hindsight, worrying was silly—not only because it worked out, but because those factors were out of our control.

Behind the scenes, prep was simpler and more organized. I had already taught a TinkerCAD summer camp and built content for it, so we reused that for guidance and ideas. Everything was digital, so there was nothing to physically prototype. My cousin and I also called at the start of the week to pick a slide template and handle logistics, so we could chip away during the week instead of cramming on the weekend. I usually worked on it in advisory or flex at school.

That system worked way better. It removed the blocks that used to stop us from working before the weekend, and the whole thing felt easier. Plan ahead—it makes a huge difference.

Before these workshops, my cousin and I taught online Python summer classes last year. They were not our strongest work. Attendance nearly halved every class, and rightfully so—we were not putting in the effort, we were weaker teachers, and we were not enthusiastic. Online did not help either. At this workshop we had one of the girls from those Python classes. She told us afterward these workshops were way better: better planned, more fun, and she said we had improved a lot. That made our day.

So take this as your reminder: worrying about what you cannot control will not change the outcome, but giving your best effort to what you can control will.`
  }
];

export const photography = [
  {
    id: 1,
    type: 'photography',
    section: 'flowers',
    title: 'Pink Flower',
    slug: 'pink-flower',
    url: '/photography/pink-flower',
    date: '2026-04-05',
    icon: '\u{1F338}',
    color: '#DB2777',
    image: '/IMG_0100.JPG',
    gallery: ['/IMG_0100.JPG', '/IMG_0101.JPG', '/IMG_0110.JPG', '/IMG_0116.JPG'],
    summary: 'The first photos from my new camera—the only bloom in the yard.',
    keywords: ['photography', 'flower', 'macro', 'nature', 'pink'],
    fullText: `When I first got my camera, our front and back yards were completely dead. Not a single flower in sight except this one. A stunning pink flower. These are the first pictures I ever took with my camera.`
  },
  {
    id: 7,
    type: 'photography',
    section: 'flowers',
    title: 'Red Rose',
    slug: 'red-rose',
    url: '/photography/red-rose',
    date: '2026-04-08',
    icon: '\u{1F339}',
    color: '#B91C1C',
    image: '/IMG_0270.JPG',
    gallery: [
      '/IMG_0292.JPG',
      '/IMG_0272.JPG',
      '/IMG_0274.JPG',
      '/IMG_0275.JPG',
      '/IMG_0290.JPG',
      '/IMG_0270.JPG'
    ],
    summary: 'Close-ups of a deep red rose in the yard—sunlight, petals, and buds.',
    keywords: ['photography', 'rose', 'flower', 'red', 'macro', 'nature']
  },
  {
    id: 8,
    type: 'photography',
    section: 'flowers',
    title: 'Pink Rose',
    slug: 'pink-rose',
    url: '/photography/pink-rose',
    date: '2026-04-08',
    icon: '\u{1F339}',
    color: '#EC4899',
    image: '/IMG_0286.JPG',
    gallery: ['/IMG_0278.JPG', '/IMG_0280.JPG', '/IMG_0286.JPG', '/IMG_0287.JPG'],
    summary: 'Pink roses in the yard—buds, blooms, and sunlight.',
    keywords: ['photography', 'rose', 'flower', 'pink', 'macro', 'nature']
  },
  {
    id: 2,
    type: 'photography',
    section: 'sunsets',
    title: '1/27/26 Sunset',
    slug: 'jan-27-2026-sunset',
    url: '/photography/jan-27-2026-sunset',
    date: '2026-01-27',
    icon: '\u{1F305}',
    color: '#EA580C',
    image: '/IMG_0141.JPG',
    gallery: [
      '/IMG_0141.JPG',
      '/IMG_0140.JPG',
      '/IMG_0142.JPG',
      '/IMG_0144.JPG',
      '/IMG_0158.JPG',
      '/IMG_0164.JPG'
    ],
    summary: 'Sunset over the neighborhood—silhouettes, streetlights, and a bright horizon.',
    keywords: ['photography', 'sunset', 'golden hour', 'sky', 'landscape']
  },
  {
    id: 6,
    type: 'photography',
    section: 'sunsets',
    title: '4/6/26 Sunset',
    slug: 'april-6th-sunset',
    url: '/photography/april-6th-sunset',
    date: '2026-04-06',
    icon: '\u{1F305}',
    color: '#C026D3',
    image: '/IMG_0303.JPG',
    gallery: [
      '/IMG_0310.JPG',
      '/IMG_0302.JPG',
      '/IMG_0303.JPG',
      '/IMG_0304.JPG'
    ],
    summary: 'Neighborhood sunset—pink clouds, silhouettes, and the sky after golden hour.',
    keywords: ['photography', 'sunset', 'sky', 'neighborhood', 'twilight']
  },
  {
    id: 3,
    type: 'photography',
    section: 'flowers',
    title: 'Our Apricot Tree',
    slug: 'our-apricot-tree',
    url: '/photography/our-apricot-tree',
    date: '2026-03-15',
    icon: '\u{1F333}',
    color: '#E8A598',
    image: '/IMG_0181.JPG',
    gallery: [
      '/IMG_0169.JPG',
      '/IMG_0171.JPG',
      '/IMG_0172.JPG',
      '/IMG_0181.JPG',
      '/IMG_0183.JPG',
      '/IMG_0185.JPG'
    ],
    summary: 'Spring blossoms on the apricot—soft petals against the branches.',
    keywords: ['photography', 'apricot', 'tree', 'blossoms', 'spring', 'nature'],
    fullText: `When we first moved into this house, the first thing I noticed was the play structure, but the first thing my parents noticed was the huge apricot tree. They didn't notice its beauty or think about all the amazing apricots we would get from it; instead, they noticed how close it was to the cell-phone tower wires—honestly, a valid concern.

Even though this tree has needed a lot of maintenance, it will always be my favorite tree in our backyard.`
  }
];

export const currentlyConsuming = [
  { id: 1, type: 'consuming', title: 'Books', author: '', cover: '\u{1F4DA}', keywords: ['books', 'reading'] },
  { id: 2, type: 'consuming', title: 'Podcasts', author: '', cover: '\u{1F399}\u{FE0F}', keywords: ['podcasts', 'audio'] },
  { id: 3, type: 'consuming', title: 'Courses', author: '', cover: '\u{1F393}', keywords: ['courses', 'learning'] },
  { id: 4, type: 'consuming', title: 'Documentaries', author: '', cover: '\u{1F3AC}', keywords: ['documentaries', 'films'] },
  { id: 5, type: 'consuming', title: 'TV Shows & Movies', author: '', cover: '\u{1F39E}\u{FE0F}', keywords: ['tv', 'movies', 'shows'] },
  { id: 6, type: 'consuming', title: 'Music', author: '', cover: '\u{1F3B5}', keywords: ['music', 'songs'] }
];

export const suggestedQuestions = [
  'What projects has Eesha built?',
  'What is Fair Lens?',
  'What is Study Goblin?',
  'What is People vs. Pavement about?',
  'What is Eesha interested in?',
  'Has Eesha worked on AI or machine learning?',
  'Why did Eesha make this website?',
  'What are Eesha\'s favorite things?'
];
