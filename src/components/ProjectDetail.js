import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const ProjectDetail = ({ project, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const speechOffsetRef = useRef(0);
  
  // Get project-specific content
  const getProjectContent = () => {
    if (!project) return [];
    
    if (project.id === 1 && project.name === 'IHS Imposter') {
      return [
        {
          type: 'paragraph',
          content: (
            <>
              Play the game: <a href="https://ihs-imposter.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>https://ihs-imposter.vercel.app/</a>
            </>
          ),
          wordCount: 3
        },
        {
          type: 'paragraph',
          content: 'IHS Imposter is a web-based multiplayer party game inspired by a popular game in my school right now, Imposter, but with my own twists.'
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'paragraph',
          content: 'I made this game for a few main reasons:'
        },
        {
          type: 'list',
          items: [
            'I wanted a fun project that people at my school could actually play',
            'I was interested in how multiplayer games work behind the scenes',
            'I wanted hands-on coding experience, especially with frontend + backend logic',
            'Imposter is mostly only a game that can be played in person, because you need to pass around one device for most existing apps, I wanted to create a version that could be played online',
            'I wanted to create something more personal, which is why I added the twist of making it school themed',
            'Making a game felt way more motivating than doing random practice problems.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>Frontend:</strong> React (web-based, works on desktop & mobile)
            </>
          ),
          wordCount: 10
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>Backend:</strong> Render (designed to support real-time updates)
            </>
          ),
          wordCount: 8
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>UI Focus:</strong> Clean, school colors (#000096 + white)
            </>
          ),
          wordCount: 7
        },
        {
          type: 'paragraph',
          content: 'Key things I implemented:'
        },
        {
          type: 'list',
          items: [
            'Blue Among Us Character wearing viking hat on home screen (computer version), info page, and favicon (Blue fit the colors of the website, and my schools mascot is vikings, so it was another nice and cute touch)',
            'Game code system (unique code per game)',
            'Create Game & Join Game flows',
            'Player limits and validation',
            'Imposter role assignment',
            'Word + hint system',
            'Random turn order selection',
            'Voting System'
          ]
        },
        {
          type: 'header',
          content: 'How the Game Works'
        },
        {
          type: 'paragraph',
          content: 'A host creates a game and chooses:'
        },
        {
          type: 'list',
          items: [
            'Number of players (3–12)',
            'Number of imposters'
          ]
        },
        {
          type: 'paragraph',
          content: 'Players join using a game code'
        },
        {
          type: 'paragraph',
          content: 'Once the lobby is full:'
        },
        {
          type: 'list',
          items: [
            'The host can start the game'
          ]
        },
        {
          type: 'paragraph',
          content: 'During gameplay:'
        },
        {
          type: 'list',
          items: [
            'Imposters see "Imposter" + a hint',
            'Other players see the secret word',
            'Everyone presses OK to continue',
            'Players are randomly chosen by the website to say words that describe the word (importers have to blend in and try to figure out the word)',
            'Once everyone has gone, people can vote on who the imposters are, and at the end the imposters are reveled'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'paragraph',
          content: 'This project helped me learn:'
        },
        {
          type: 'list',
          items: [
            'Creating backend for an app',
            'Managing game state across multiple users',
            'Thinking through edge cases (invalid codes, full games, etc.)',
            'Designing UI that works on both phones and computers'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'paragraph',
          content: 'Things I want to add next:'
        },
        {
          type: 'list',
          items: [
            'Timers for turns',
            'More words and categories',
            'Support for even more players',
            'Options for fellow vikings to send word and hint suggestions (could go sideways if it gets in the wrong hands haha)'
          ]
        }
      ];
    }
    
    if (project.id === 2 && project.name === 'Poly Market Project') {
      return [
        {
          type: 'paragraph',
          content: (
            <>
              View project: <a href="https://pmindexr.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>https://pmindexr.vercel.app/</a>
            </>
          ),
          wordCount: 4
        },
        {
          type: 'header',
          content: 'What is Indexr'
        },
        {
          type: 'paragraph',
          content: "Tool used daily by Polymarket's news team to build their newsletter."
        },
        {
          type: 'list',
          items: [
            'Helps track relevant markets, price movements, and notable activity',
            'Newsletter reaches 250,000+ readers'
          ]
        },
        {
          type: 'header',
          content: 'How I Got to Work on This Project'
        },
        {
          type: 'list',
          items: [
            'Introduced to a member of the Polymarket team through a mentor from my robotics background',
            'Brought on to design and build the frontend for Indexr',
            "Project became a production tool used in the team's daily editorial process"
          ]
        },
        {
          type: 'header',
          content: 'My Work on This Project'
        },
        {
          type: 'list',
          items: [
            'Designed the full frontend UI and interaction flows',
            'Translated loosely defined internal needs into a clear, usable interface',
            'Structured information architecture for fast market discovery and selection',
            'Built reusable UI components focused on speed, clarity, and low cognitive load',
            'Optimized the interface for editors working under time pressure'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned from This Project'
        },
        {
          type: 'list',
          items: [
            'How to design for real operational use rather than demos',
            'The importance of reliability and speed in data-dense tools',
            'How to work quickly based on user feedback and evolving requirements',
            'How thoughtful UI design can materially improve workflow efficiency'
          ]
        }
      ];
    }
    
    if (project.id === 3 && project.name === 'People vs. Pavement') {
      return [
        {
          type: 'paragraph',
          content: (
            <>
              People vs. Pavement: <a href="https://www.people-vs-pavement.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>https://www.people-vs-pavement.com/</a>
            </>
          ),
          wordCount: 5
        },
        {
          type: 'list',
          items: [
            "People vs. Pavement is an interactive web project that demonstrates how car-dependent suburban design restricts people's daily routines, independence, and opportunities.",
            "Instead of relying on dense statistics or lectures, the site uses simulations, choices, and light humor to make the consequences of car-centric planning experiential.",
            "The project is designed to resonate with users by showing how urban design decisions quietly shape everyday life—often in ways people don't notice until alternatives are made visible."
          ]
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'list',
          items: [
            'I grew up in a suburban environment and initially assumed that needing a car for nearly everything was normal.',
            "After learning more about car-dependent suburbia from a video by NotJustBikes, I realized this design is not inevitable and has real consequences for accessibility, equity, and quality of life.",
            'I wanted to use my web development skills to raise awareness in a way that people would actually engage and resonate with.',
            'I chose an interactive and slightly humorous approach so users could feel the constraints rather than just read about them.',
            'This project was my way of applying technical skills to a real societal issue I feel passionately about.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'list',
          items: [
            'Frontend: React (single-page web application)',
            'Platform: Fully web-based, responsive on desktop and mobile',
            {
              text: 'Design focus: Clean, roads, slight danger',
              subItems: [
                'Background: Off-white / light gray #F5F5F5',
                'Primary text: Charcoal #1F1F1F',
                'Accent: Construction orange #FF8C42',
                'Secondary accent: Crosswalk yellow #FFD23F',
                'Muted lines/borders: Concrete gray #CFCFCF'
              ]
            }
          ]
        },
        {
          type: 'header',
          content: 'How the Website Works'
        },
        {
          type: 'list',
          items: [
            'The entire experience lives on one page, organized into tab-based sections.',
            'The bingo is a funny way to start off and the user can realize design choices that are made for cars are all around them.',
            "The questions with the chatbot further emphasize how these design choices aren't made for people, they are made for cars and the responses add on to the illogical design.",
            'The simulator shows just how impactful these design choices can be on people, especially those without cars, and possibly has the user resonating more with it if they can see parallels in what happens with the simulation and in their real life.',
            "The simulation also brings in more empathy as even if car dependent suburbia isn't affecting you like the simulation, you understand just how limiting car centric cities are for groups of people.",
            "Once the user understands just how big of a problem this is, the excuses section shows the silly and nonsense reasons as to why there hasn't been any change.",
            "Finally, the why section is my personal touch and my thoughts on the section, I hope to resonate with the user and for the user to understand how big of an issue this truly is."
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'list',
          items: [
            'How to translate an issue into an interactive, user-driven experience.',
            'How interface design and structure can guide understanding without heavy text or explicit persuasion.',
            'Improved React skills, especially around component structure, state handling, and responsive layouts.',
            'How software can be used as a tool for public education and real world causes, not just productivity or entertainment.',
            'The importance of balancing humor and clarity when communicating serious topics to a broad audience.'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'list',
          items: [
            'Add simulations for additional groups, such as low-income and disabled people.',
            'Create a section for users to share personal stories about how suburban design has affected their lives.',
            'Add before-and-after visualizations showing how car-oriented stroads can be redesigned into people-centered streets with clear explanations for each design change to connect urban design decisions with real human outcomes.',
            'Add an action plan at the end to take this from not only a website that informs the user of the issue, but also helps take action towards working on the problem.',
            'Add in ways to collect data.'
          ]
        }
      ];
    }
    
    if (project.id === 4 && project.name === 'Study Goblin') {
      return [
        {
          type: 'header',
          content: 'Study Goblin'
        },
        {
          type: 'list',
          items: [
            <>View Project: <a href="https://study-goblin.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>https://study-goblin.vercel.app/</a></>,
            'Study Goblin is a fast, distraction-free study website designed to help students review UC Scout courses efficiently.',
            'It provides condensed unit summaries, realistic practice exams, and detailed feedback to help students improve in a short amount of time.'
          ]
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'list',
          items: [
            'I noticed many of my friends were extremely stressed about UC Scout exams, especially when they were short on time.',
            'They had to jump between notes, Google searches, and random practice problems to study.',
            'I wanted to create one clean, centralized platform with everything they need to review quickly and confidently.',
            'The goal was to make studying simpler, faster, and less overwhelming.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'list',
          items: [
            'I designed Study Goblin as a single-page web application to keep navigation fast and seamless.',
            'All content is structured to mirror how UC Scout teaches and tests material.',
            'I focused on keeping the site lightweight and responsive so it works well on both desktop and mobile.'
          ]
        },
        {
          type: 'header',
          content: 'Technical Details'
        },
        {
          type: 'list',
          items: [
            'Frontend: Built using React',
            {
              text: 'Platform: Fully web-based',
              subItems: [
                'Responsive on both desktop and mobile devices',
                'No accounts or backend required, keeping the experience simple and fast'
              ]
            },
            {
              text: 'Design Focus',
              subItems: [
                'Minimal and sleek interface to reduce distractions',
                'Dark mode enabled by default to reduce eye strain',
                'Optional light mode toggle for user preference',
                'Designed so users can immediately start studying with no friction'
              ]
            }
          ]
        },
        {
          type: 'header',
          content: 'How the Website Works'
        },
        {
          type: 'list',
          items: [
            'Users select their course and view condensed summaries for every unit.',
            'Each unit includes optional read-aloud buttons for students who learn better by listening.',
            'The site includes practice midterms and finals modeled after real UC Scout exams.',
            'Practice tests match: Question format, Number of questions, Time for test',
            'Users can choose whether to enable a timer, and can pause, resume, or cancel it.',
            {
              text: 'After submitting a test, users receive:',
              subItems: [
                'Their score using the UC Scout grading system',
                'Percentage score',
                'Time used or remaining',
                'Personalized feedback on concepts they should review'
              ]
            },
            'For every missed question, the correct answer is shown along with an explanation.'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'list',
          items: [
            'How to design an interface that prioritizes speed and usability over extra features.',
            'How to structure educational content so it\'s easy to skim but still effective.',
            'How to build a full web application that solves a real problem people actually have.'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'list',
          items: [
            'Expand Study Goblin to support more AP courses',
            'Add a flashcard system for quick memorization and review.',
            'Experiment with a more Kahoot-style, game-based practice mode to make studying more engaging.',
            'Continue refining feedback to make recommendations even more personalized.'
          ]
        }
      ];
    }

    if (project.id === 5 && project.name === 'Personal Website') {
      return [
        {
          type: 'paragraph',
          content: (
            <>
              Personal Website: <a href="https://eeshag.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9E17AB', textDecoration: 'underline' }}>eeshag.com</a> (this website haha)
            </>
          ),
          wordCount: 8
        },
        {
          type: 'paragraph',
          content: 'A personal, Spotify-inspired website that acts as a central hub for my projects, blogs, socials, and contact information.'
        },
        {
          type: 'paragraph',
          content: 'Blends creative writing, technical work, and personal interests into a single, cohesive interface that feels like browsing playlists and albums.'
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'list',
          items: [
            'I wanted one place where people could learn about me, explore my projects, read my thoughts, and easily reach out.',
            'I love both music and web design, and modeling the site after Spotify made the process more fun and personally meaningful.',
            'This combines building something I would actually enjoy using and creating something functional.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'list',
          items: [
            'Designed the entire site around the mental model of playlists, albums, and tracks to keep navigation intuitive.',
            'Structured content so blogs, projects, and personal sections all feel consistent while serving different purposes.',
            'Iterated continuously, adding new blogs, projects, and UI refinements over time.'
          ]
        },
        {
          type: 'list',
          items: [
            'Frontend: React, built as a single-page application for smooth navigation and fast transitions.',
            'Platform: Fully web-based and responsive, designed to work cleanly on both desktop and mobile.',
            'Design Focus: Spotify-inspired layout, dark-mode aesthetic, and familiar visual hierarchy.',
            'Each page mimics a music experience: projects as songs, pages as playlists, blogs as albums.',
            'Emphasis on clarity, personality, and a playful but polished feel.',
            'Each "post" (blog, project page, all about me) has its own icon and background color, that serves as the cover of playlist/song/album, and at the bottom there is a song player, and as you scroll down more of the song/post finishes based on how much you have read (a favorite feature that I have added).'
          ]
        },
        {
          type: 'header',
          content: 'How the Website Works'
        },
        {
          type: 'list',
          items: [
            'Sidebar and quick links provide instant access to socials, contact methods, blogs, and projects.',
            'Project pages function like playlists, with a banner at the top and each project listed like a track.',
            'Blog pages resemble Spotify\'s search/browse view, with each post presented as its own album.',
            'Includes a "currently consuming" section where I share media I\'m engaging with, along with ratings and thoughts.',
            'Includes all about me page which shares quick facts about me and my journey of how I reached to where I am today.',
            'Includes a photography page where I share my photography in album and playlist style, mainly focused on nature photos.',
            'Text-to-speech support includes a bottom slider that lets users move forward or backward while listening.'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'list',
          items: [
            'Balancing creative expression with clean engineering and responsive design.',
            'The value of continuously shipping and iterating, rather than treating a website as "finished."'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'list',
          items: [
            'Add more interactive elements to blogs and project pages.',
            'Continue expanding content, especially long-form writing and more technical projects.',
            'Further refine performance, animations, and personalization while keeping the Spotify-style identity intact.'
          ]
        }
      ];
    }

    if (project.id === 6 && project.name === 'Fair Lens') {
      return [
        {
          type: 'paragraph',
          content: 'Status: In progress, writing + publishing research paper'
        },
        {
          type: 'paragraph',
          content: 'FairLens is an AI-powered educational tool that helps teachers and educators identify subtle bias and stereotypes in learning materials before they are used in the classroom.'
        },
        {
          type: 'paragraph',
          content: 'It analyzes text, images, and PDFs and generates clear reports explaining what types of bias—if any—are present.'
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'list',
          items: [
            'Educational content plays a major role in shaping how students perceive gender, race, and culture, often in subtle ways that go unnoticed.',
            'I wanted to help break the cycle of reinforcing harmful stereotypes by giving educators an easy way to review materials ahead of time.',
            'The goal was to use AI not just for efficiency, but for awareness, fairness, and social good in education.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'list',
          items: [
            'Designed the system around large language models to analyze tone, context, and patterns rather than relying on simple keyword matching.',
            'Integrated text, image, and PDF analysis so a wide range of educational materials could be evaluated in one place.',
            'Iteratively refined prompts and tested results to improve accuracy, especially for subtle, context-dependent bias.',
            'Built a unified dataset for testing model accuracy.',
            'Tested and compared several different models.',
            {
              text: 'Frontend',
              subItems: [
                'Built with Streamlit, focusing on simplicity and ease of use for teachers with varying technical backgrounds.'
              ]
            },
            {
              text: 'Platform',
              subItems: [
                'Fully web-based application with Google authentication to ensure secure and verified access.'
              ]
            },
            {
              text: 'Design Focus',
              subItems: [
                'Clear, intuitive interface that prioritizes trust, transparency, and ease of interpretation.',
                'Concise AI-generated reports that explicitly state when no bias is found or when content is unrelated to education.'
              ]
            }
          ]
        },
        {
          type: 'header',
          content: 'How the Website Works'
        },
        {
          type: 'list',
          items: [
            'User logs in with Google authentication.',
            'Users upload text, images, or PDFs, or paste content directly into the app.',
            'FairLens processes the content using AI models and returns a structured report describing detected biases.',
            'If no bias is detected, the system clearly communicates that result, giving users confidence in the analysis.'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'list',
          items: [
            'How to build and integrate an AI-powered web application from end to end, including authentication, file handling, and model evaluation.',
            'The importance of prompt engineering and dataset validation, using confusion matrices to identify weaknesses and improve performance.',
            'Building impactful AI requires ethical awareness and careful attention to context, not just technical skill.'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'list',
          items: [
            'Add video analysis to support modern classroom materials.',
            'Expand FairLens to support multiple languages.',
            'Work toward real-world adoption by partnering with schools and educators to integrate FairLens into lesson planning workflows.'
          ]
        }
      ];
    }
    
    // Default placeholder content for other projects
    return [
      {
        type: 'paragraph',
        content: `This is a detailed view of ${project.name}. Here you'll find comprehensive information about this project, including its purpose, technologies used, challenges overcome, and key achievements.`
      },
      {
        type: 'paragraph',
        content: `${project.name} represents a significant milestone in my development journey. Through this project, I've learned valuable lessons about building robust applications and solving complex problems.`
      },
      {
        type: 'paragraph',
        content: 'The project showcases various aspects of modern development practices and demonstrates my ability to work with different technologies and frameworks.'
      }
    ];
  };

  const projectContent = getProjectContent();
  
  // Calculate approximate word count and reading time
  const calculateWordCount = () => {
    let count = 0;
    projectContent.forEach(item => {
      if (item.type === 'paragraph') {
        if (typeof item.content === 'string') {
          count += item.content.split(/\s+/).length;
        } else if (item.wordCount !== undefined) {
          // Use explicit word count for React elements
          count += item.wordCount;
        } else {
          // Estimate word count for React elements by extracting text
          // This is a fallback - ideally each React element should have wordCount
          count += 10; // Default estimate
        }
      } else if (item.type === 'list') {
        item.items.forEach(entry => {
          if (typeof entry === 'object' && entry !== null && 'text' in entry) {
            count += entry.text.split(/\s+/).length;
            if (entry.subItems) entry.subItems.forEach(s => { count += s.split(/\s+/).length; });
          } else {
            count += String(entry).split(/\s+/).length;
          }
        });
      } else if (item.type === 'header') {
        count += item.content.split(/\s+/).length;
      }
    });
    return count;
  };
  
  const wordCount = calculateWordCount();
  const readingTime = Math.ceil(wordCount / 100); // Assuming 100 words per minute

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format time for progress display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = readingTime * 60;
  const activeProgress = isReadingAloud || isPaused ? speechProgress : scrollProgress;
  const currentTime = Math.floor((activeProgress / 100) * totalTime);

  const extractText = (node) => {
    if (node === null || node === undefined || typeof node === 'boolean') {
      return '';
    }
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map((child) => extractText(child)).join(' ');
    }
    if (React.isValidElement(node)) {
      return extractText(node.props?.children);
    }
    return '';
  };

  const getReadableText = () =>
    projectContent
      .map((item) => {
        if (item.type === 'list') {
          return item.items
            .map((entry) => {
              if (typeof entry === 'object' && entry !== null && 'text' in entry) {
                const subText = entry.subItems ? `. ${entry.subItems.map((s) => extractText(s)).join('. ')}` : '';
                return `${extractText(entry.text)}${subText}`;
              }
              return extractText(entry);
            })
            .join('. ');
        }
        return extractText(item.content);
      })
      .join('\n\n');

  const pickPreferredVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const preferredVoiceNameSnippets = ['david', 'guy', 'mark', 'ryan', 'google uk english male', 'male'];
    const preferred = voices.find((voice) =>
      preferredVoiceNameSnippets.some((snippet) => voice.name.toLowerCase().includes(snippet))
    );
    if (preferred) return preferred;

    const englishNonDefault = voices.find((voice) => voice.lang.toLowerCase().startsWith('en') && !voice.default);
    if (englishNonDefault) return englishNonDefault;
    return voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) || voices[0] || null;
  };

  const startSpeechFrom = (textToRead, startChar = 0) => {
    const clampedStartChar = Math.max(0, Math.min(startChar, Math.max(0, textToRead.length - 1)));
    const speechText = textToRead.slice(clampedStartChar);
    if (!speechText.trim()) {
      setIsReadingAloud(false);
      setIsPaused(false);
      setSpeechProgress(100);
      return;
    }

    speechOffsetRef.current = clampedStartChar;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1;
    utterance.pitch = 0.9;
    utterance.lang = 'en-US';
    const preferredVoice = pickPreferredVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || utterance.lang;
    }

    if (textToRead.length > 0) {
      const startProgress = (clampedStartChar / textToRead.length) * 100;
      setSpeechProgress(Math.min(100, Math.max(0, startProgress)));
    }

    utterance.onstart = () => {
      setIsReadingAloud(true);
      setIsPaused(false);
    };
    utterance.onboundary = (event) => {
      if (typeof event.charIndex === 'number' && textToRead.length > 0) {
        const absoluteCharIndex = speechOffsetRef.current + event.charIndex;
        const progress = (absoluteCharIndex / textToRead.length) * 100;
        setSpeechProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    utterance.onend = () => {
      setIsReadingAloud(false);
      setIsPaused(false);
      setSpeechProgress(100);
    };
    utterance.onerror = () => {
      setIsReadingAloud(false);
      setIsPaused(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isReadingAloud) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = getReadableText();
    if (!textToRead.trim()) {
      return;
    }
    startSpeechFrom(textToRead, 0);
  };

  const handleSeekSpeech = (event) => {
    if (!('speechSynthesis' in window) || !progressBarRef.current) {
      return;
    }
    const textToRead = getReadableText();
    if (!textToRead.trim()) {
      return;
    }
    const rect = progressBarRef.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, relativeX / rect.width));
    const nextCharIndex = Math.floor(ratio * textToRead.length);
    window.speechSynthesis.cancel();
    startSpeechFrom(textToRead, nextCharIndex);
  };

  if (!project) {
    return null;
  }

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Convert hex color to rgba for gradient
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bannerBackground = project.id === 3
    ? 'linear-gradient(180deg, rgba(217, 195, 240, 0.45) 0%, rgba(160, 132, 214, 0.7) 100%)'
    : `linear-gradient(180deg, ${hexToRgba(project.color, 0.4)} 0%, ${hexToRgba(project.color, 0.6)} 100%)`;

  return (
    <div className="projects-page" ref={contentRef}>
      {/* Top Banner Section */}
      <div className="banner-section" style={{ background: bannerBackground }}>
        <div className="banner-content">
          {/* Left Square Cover */}
          <div className="cover-square" style={{ backgroundColor: project.color }}>
            <span className="cover-icon">{project.icon}</span>
          </div>
          
          {/* Right-Side Banner Text */}
          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">{project.name}</h1>
            <p className="banner-metadata">Author: Eesha Gupta, {wordCount} words, {readingTime} minute read</p>
          </div>
        </div>
      </div>

      <div className="blog-reload-button-row">
        <button
          type="button"
          className={`blog-reload-button ${isReadingAloud ? 'is-reading' : ''}`}
          onClick={handleReadAloud}
          aria-label={!isReadingAloud ? 'Read aloud' : isPaused ? 'Resume reading' : 'Pause reading'}
          title={!isReadingAloud ? 'Read aloud' : isPaused ? 'Resume reading' : 'Pause reading'}
        >
          {isReadingAloud && !isPaused ? (
            <span className="blog-reload-pause-icon" aria-hidden="true"></span>
          ) : (
            <span className="blog-reload-play-icon" aria-hidden="true"></span>
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Header Row */}
        <div className="content-header">
          <div className="header-number">#</div>
          <div className="header-title">Title</div>
          <div className="header-date">Date added: {project.dateAdded ?? 'Feb 18, 2026'}</div>
        </div>
        <div className="header-divider"></div>
        
        {/* Writing Area */}
        <div className="writing-area">
          {projectContent.map((item, index) => {
            // Determine if this is between sections or within a section
            const prevItem = index > 0 ? projectContent[index - 1] : null;
            const nextItem = index < projectContent.length - 1 ? projectContent[index + 1] : null;
            const isHeader = item.type === 'header';
            const isFirstInSection = prevItem && prevItem.type === 'header';
            const isLastInSection = nextItem && nextItem.type === 'header';
            
            // Spacing: more space before headers (between sections), minimal space within sections
            // First header has no extra top padding, subsequent headers have spacing
            const rowPaddingTop = isHeader 
              ? (index === 0 ? '0px' : '16px') 
              : (isFirstInSection ? '2px' : '1px');
            const rowPaddingBottom = isLastInSection ? '0px' : '0px';
            
            if (item.type === 'header') {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <h2 className="content-paragraph" style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '20px', marginTop: '0', marginBottom: '0' }}>
                      {item.content}
                    </h2>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            } else if (item.type === 'list') {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <ul style={{ margin: '0', paddingLeft: '24px', color: '#b3b3b3' }}>
                      {item.items.map((listItem, listIndex) => {
                        const isNested = typeof listItem === 'object' && listItem !== null && 'text' in listItem;
                        const text = isNested ? listItem.text : listItem;
                        const subItems = isNested && listItem.subItems ? listItem.subItems : null;
                        return (
                          <li key={listIndex} className="content-paragraph" style={{ marginBottom: listIndex < item.items.length - 1 ? '2px' : '0' }}>
                            {text}
                            {subItems && subItems.length > 0 && (
                              <ul style={{ margin: '4px 0 0', paddingLeft: '24px' }}>
                                {subItems.map((sub, subIndex) => (
                                  <li key={subIndex} className="content-paragraph" style={{ marginBottom: subIndex < subItems.length - 1 ? '2px' : '0' }}>
                                    {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            } else {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <p className="content-paragraph" style={{ margin: '0' }}>{item.content}</p>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Player Bar */}
      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover" style={{ backgroundColor: project.color }}>
            <span className="player-icon">{project.icon}</span>
          </div>
          <div className="player-info">
            <div className="player-title">{project.name}</div>
            <div className="player-artist">Eesha Gupta</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-progress-container">
            <div className="player-time player-time-left">{formatTime(currentTime)}</div>
            <div className="player-progress-bar" ref={progressBarRef} onClick={handleSeekSpeech}>
              <div 
                className="player-progress-fill" 
                style={{ width: `${activeProgress}%` }}
              ></div>
            </div>
            <div className="player-time player-time-right">{formatTime(totalTime)}</div>
          </div>
        </div>

        <div className="player-right">
          {/* Empty for now, can add controls later */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
