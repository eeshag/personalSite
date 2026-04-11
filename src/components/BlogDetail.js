import React, { useEffect, useRef, useState } from 'react';
import { paragraphWithOptionalLinks, stripInlineMarkdownLinks } from '../utils/paragraphWithOptionalLinks';
import './Projects.css';

const baseUrl = import.meta.env.BASE_URL;

const BlogDetail = ({ blog }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const speechOffsetRef = useRef(0);

  const getBlogContent = () => {
    if (!blog) return [];

    if (blog.id === 1 && blog.title === 'Cats') {
      return [
        {
          type: 'paragraph',
          content:
            'Cats are my favorite animal, which if I told my younger self that, she would have been shocked, because I didn’t like cats AT ALL back then. When I was younger, cats used to terrify me, even though I had never actually met a pet cat. There were strays that would come into our backyard or be on the street, and they never actually did anything bad but somehow I couldn’t shake the image that cats were evil, scary creatures out of my head.'
        },
        {
          type: 'paragraph',
          content:
            'I think I felt this way because I had met multiple dogs in the past, and I definitely was not a dog person, so I assumed I wouldn’t like cats either. In general, I hadn’t met any animal that I liked, or wasn’t scared of, so I just assumed I wasn’t an animal person, at all.'
        },
        {
          type: 'paragraph',
          content:
            'That all changed this thanksgiving break though, when my brother decided to foster a kitten for a month. Her name was Mushroom and I had seen her over face time. I couldn’t lie, she was adorable, but I was still terrified to go visit her, since we were going to see my brother in Philly over thanksgiving break.'
        },
        {
          type: 'paragraph',
          content:
            'Honestly, I shouldn’t have been scared, because Mushroom was adorable. The only thing you needed to be scared of was her claws, because you will get scratched. She grows on you so fast though, that you don’t even mind. Other than that, she was amazing. She loved playing with you and her toys, she loved jumping on you, and she was so curious. One time, my brother had a paper bag on the floor from when we had gone shopping the night before (haha rhyme) and she kept on trying to look in the bag before just submerging herself in the bag and staying there for a while. On top of this, it\'s so entertaining seeing her map out her path of how she\'s going to get around my brother\'s room, and then watch her execute it perfectly. She can jump up the couch, over my brother\'s backpack, onto the night stand and then onto my brother\'s bed. It\'s even cool seeing them squeeze into small spaces effortlessly, like in between my brother\'s couch or nightstand, under a chair or under the bed. I also find it funny how sensitive their ears are, if you make one noise they are automatically looking in that direction and I loved how she followed my brother around. If my brother was choosing clothes from his closet, she was next to him. If he was holding a box, she was trying to grab it. A couple of times, she actually got pretty close to grabbing it, she can jump so high.'
        },
        {
          type: 'paragraph',
          content:
            'In conclusion, Mushroom taught me to never judge a book by its cover. I use to be scared of cats because of assumptions I had made in my head, but now they are my favorite animal, and I want a cat myself 😺'
        }
      ];
    }

    if (blog.id === 2 && blog.title === 'My First Scratch Project') {
      return [
        {
          type: 'paragraph',
          content:
            'I was first introduced to scratch when I took class for it with a local nonprofit called NoCal Robotics. Honestly, I didn’t think I would find it fun, as I never thought coding was that appealing, but I was completely wrong. I got so hooked, I was constantly creating projects and posting about them on google classroom, since it was the online year. I have also had a passion for teaching since I was young. I have videos of me on my family’s old ipad, where I was filming tutorials of how to create random origamis I came up with, everything you need to know about beyblades, my “lego sorter”, the thought process behind it and how someone could film their own, and so on. So, it only seemed right I started a youtube channel, where I could share tutorials and projects.'
        },
        {
          type: 'paragraph',
          content:
            'If you want to check out my youtube channel, feel free to, it’s linked on this website haha, all of my videos are still up. I’ll definitely talk more about my youtube channel some day, but for today I want to talk about my first scratch project that I made on my own. If you want to see for yourself here’s the link to my scratch account: https://scratch.mit.edu/users/Incredgirl/.'
        },
        {
          type: 'paragraph',
          content:
            'As you can see, my first project here is a game called catching stars. The premise of the game is like the title suggests, catching stars. You are the dog character, and using the arrow keys, you have to catch the stars, touching the starFISH makes you lose 1 life and touching the sun results in an automatic death.'
        },
        {
          type: 'paragraph',
          content:
            'Even though this project looks simple, it took my little fourth grade stuff a lot of time to reach this. One of the problems I remember facing was that the dog could literally be out of view if the user went too down, too up, too left or too right. I discovered this when my brother used it to cheat the system and I got so mad, and knew I had to patch it. I patched it using the “If on edge, bounce” block, so if the dog ever touched the edge, it would just bounce back in.'
        },
        {
          type: 'paragraph',
          content:
            'Another thing I remember is spending so long placid with all the stars and obstacles to make this game as hard as possible. I wouldn’t say I did the best job at that, but I would give myself a pat on the back. Another thing I remember was that when the lives counter, I wanted it to go down 1 each time, but for the life of me, somehow, couldn’t figure out how to do that. My brother did come in clutch though by saying “why don’t you just make it change by -1”, and that worked, so I was really overthinking it.'
        },
        {
          type: 'paragraph',
          content:
            'Of course, now that I am older and have more experience, this project seems really easy to me and I can nit pick it and think about how many things could have been better. But when I think about my fourth grade self who finally found something she really enjoyed, thought of this idea and was so determined to make it a reality, and actually did, I can’t help but be proud. It’s a great reminder that things don’t have to be perfect to count for something, because as long as you start, it can totally change your life. If it wasn’t for my fourth grade self who decided to take what I learned from the Norcal Robotics classes and make something on my own, I probably wouldn’t have been where I am today, still being a coder and still loving it too. So if there’s something you want to do, but are worried you won’t be able to get it perfect on the first try, just go and do it anyway, you might be grateful you did one day 😃'
        }
      ];
    }

    if (blog.id === 4 && blog.title === 'The Power of a Cookie') {
      return [
        {
          type: 'paragraph',
          content:
            "Hi guys, todays blog is going to be short and sweet, hope you guys enjoy though."
        },
        {
          type: 'paragraph',
          content:
            "My mom always said that the best, funniest hangouts are the spontaneous ones. As someone who likes being organized and planning everything, I never really understand why. But like they say, moms are always right."
        },
        {
          type: 'paragraph',
          content:
            "One story I have to prove is one lunch during seventh grade. Lunch doesn't exactly count as a hangout, but you get what I mean. Before this story starts, keep in mind lunch is only 35 minutes, all of this happened in that time period. I remember my friend Riya and I were looking all over for our other friends and couldn't find anyone. While looking around, we constantly passed through an area where a Mecha club was selling these huge, Christmas themed sugar cookies. They were as huge as the price tag, four dollars for a cookie. Despite not liking sugar cookies, I really wanted these cookies but didn't think I had the money. Eventually we give up and decide to sit down, Lena and Mira find us. At this point we were honestly so hungry and just got to eating."
        },
        {
          type: 'paragraph',
          content:
            "A while later, Sara and Noor, who were friends with me and Lena, came to say hi to us. Lena and I introduced Sara and Noor to Riya and Mira and all of us started talking. I decided to bring up the cookies and how badly I wanted one, and would not stop talking about it. At first, NO ONE was on board with me about wanting a cookie. But the more I talked about it and described it, with my amazing persuasion skills, I was able to convince everyone that we NEEDED this cookie."
        },
        {
          type: 'paragraph',
          content:
            "Only one problem, we had no money, or so we thought."
        },
        {
          type: 'paragraph',
          content:
            "We all started SEARCHING, I mean searching our backpacks. We all did a quick search of our backpacks, not finding anything, thinking we would have to call it a day. But Sara said we all needed to just look harder, so we searched again. At this point, no one believed her, because we didn't think money was magically going to respond, but I am so happy she said that."
        },
        {
          type: 'paragraph',
          content:
            "Since no phones were allowed and no one had a watch, we had no clue what time it was so we were rushing as fast as possible. I discovered I had 2 dollars and a couple of random coins in my backpack, and Mira and Lena also had a couple of random coins in their backpack."
        },
        {
          type: 'paragraph',
          content:
            "I genuinely don't think you will believe this, but we had exactly four dollars. A combination of dollar bills, quarters, dimes and nickels came out exactly to four dollars. We counted and money and double checked and all genuinely started jumping in excitement. We literally sprinted to where the cookies were being selled and properly handed our money."
        },
        {
          type: 'paragraph',
          content:
            "Looking at all the cookies, they were all so cute, and the group made ME decide what to get because this was all my idea, until I made Riya decide. We all got the cookie and ran back to our lunch spot."
        },
        {
          type: 'paragraph',
          content:
            "Even though phones were not technically allowed, Sara still took hers out anyways to take a photo of us and the cookie, showing just hoe serious and funny this entire thing was."
        },
        {
          type: 'paragraph',
          content:
            "Mira was practically squealing, telling us to just open the cookie, until we realized we would somehow need to split this evenly in six. Mira snatched the cookie from us, somehow perfectly split it in 6 and told everyone to hurry up and take one."
        },
        {
          type: 'paragraph',
          content:
            "On the count of three we all took a bite and I kid you not, that was the WORST cookie ever. The disappointment on everyone's face and realization we wasted four dollars was there for a second, until we all genuinely burst out laughing."
        },
        {
          type: 'paragraph',
          content:
            "What had initially seemed to be a boring lunch where none of the friends were there had someone turned into a core middle school memory in 35 minutes over a cookie. To the day, this is one of my favorite school memories, and nothing about it was planned."
        },
        {
          type: 'paragraph',
          content:
            "So remember to have fun and go with the flow, chances are you might end up with a bad cookie and lots of memories 🍪"
        }
      ];
    }

    if (blog.id === 3 && blog.title === 'Why Everyone Should Have a Blog') {
      return [
        {
          type: 'paragraph',
          content:
            "In this blog post, as you can see, I am going to talk about why you should start a blog too. Honestly, the more I think about it, I realize how beneficial having a blog is, so I want to influence you to start one too."
        },
        {
          type: 'paragraph',
          content:
            "First off with the obvious, you get free writing practice and in fact you get to write about stuff that you actually care about, not being forced to write about something. You have some freedom, you can write short paragraphs or three essays worth of writing, and you can write as frequently as you want on something as random as you want. I know so many people that don’t like writing, but writing is such a crucial skill, so I think blogs would help people enjoy and become better at writing."
        },
        {
          type: 'paragraph',
          content:
            "Another benefit of blogs is you get to understand yourself better. In blogs, you can write about whatever you want, and a major part is actually finding things to write about. I’m sure for some people it's easier than others, like for me, I spend a lot of time brainstorming writing ideas, but some people probably have them off the top of their head. Having a blog forces you to think about what you believe in, what you feel so passionate about that you would actually want to write about and share your take on it with others. It forces you to explore your hobbies and skills, things that you enjoy or are confident in enough to write something about them. When I’m brainstorming, I’ve got a better clarity of the things I care about and essentially, the things that make me me."
        },
        {
          type: 'paragraph',
          content:
            "Of course, the most obvious benefit which I have already touched on is you get to write more, and in a world where so many people use ChatGPT to write things, this will definitely help with your writing skills."
        },
        {
          type: 'paragraph',
          content:
            "Another thing if you are a sentimental person, or someone that likes reflecting on the past, in the future you can go and look back on your past blogs, it is like an amazing time capsule. You can understand how your views, writing style, skills have changed and overall how you have changed as a person."
        },
        {
          type: 'paragraph',
          content:
            "So where to start. You don’t need to be a coder to design a website for a blog, you can find templates on websites like wix. For me, I love using my blog to share my thoughts on topics, things that I really feel passionately about. In addition, I love using these blogs to explore my random interests, things that I often push to the side because they aren’t school or extracurricular related. I also like using this blog to reflect on things I did in the past. You can use these blogs to share your skills, like maybe a baking recipe, a coding project, artwork. You can use them to share important stories in life, life lessons you have learned, your opinions on certain topics. You can use them to talk about your hobbies and extracurriculars and why you enjoy them. You can use it to talk about people in your life that you care about. The list goes on and on."
        },
        {
          type: 'paragraph',
          content:
            "This is all I am going to include in this blog post, maybe I will make a part 2 in the future if I feel there is more to add onto. These were my main points, but I think if you actually start one, you will find even more benefits too."
        },
        {
          type: 'paragraph',
          content: 'Have fun blogging everyone📝'
        }
      ];
    }

    if (blog.id === 5 && blog.title === 'Spaghetti Structures!') {
      return [
        {
          type: 'paragraph',
          content: 'Hi guys, this sunday my cousin and I hosted our first STEM Workshop.'
        },
        {
          type: 'paragraph',
          content:
            'For a bit of context, my cousin and I have been in STEM for a very long time. We have been doing robotics since second grade. During all our time in STEM, we have experienced and seen other girls being undermined, ignored, and discouraged, just because of our gender. We wanted to do something about this, which is why we created GEM (Girls in engineering and management). We wanted to create a space where girls were valued and respected, so that they could genuinely learn and enjoy STEM.'
        },
        {
          type: 'paragraph',
          content:
            'As part of GEM, we have organized 5 workshops each covering different aspects of STEM. We just had our engineering workshop where we talked about structural engineering. We taught them how structures remained stable, following it up with an activity. In the activity, they were tasked with creating the tallest tower possible with spaghetti, marshmallows and tape, but it also had to be stable, any tower that fell down wouldn\'t be counted. We gave them time beforehand to come up with and sketch a design on paper, and present their idea to us. At the end, we gave everyone prizes, let everyone eat the extra marshmallows (not the one they used for their project of course), and handed out a paper with the summary of the topics we covered in class. For the extra time before and after the class, we had brought () and () because they both relate to structural engineering, plus letting them improve their towers, build new towers, and draw or play games on the white board.'
        },
        {
          type: 'paragraph',
          content:
            'Not to brag, but I would say the workshop went pretty well. First off, nearly everyone who signed up showed up, everyone besides one person. In my experience, that never really happens with free classes and activities. Everything takes it for granted, because if their kid doesn\'t show up, they don\'t lose money. So, I\'m really grateful for everyone actually sticking to their word here, the more the merrier and all the girls were so nice and funny! :)'
        },
        {
          type: 'paragraph',
          content:
            'One thing me and my cousin were really stressed about beforehand was time. You can give estimates about how long each acidity will take, but as both of us have figured out through our years of teaching, that never really goes to plan. We were worried about having too much time or too little time left over, but luckily everything honestly went pretty perfectly in terms of time. We were right on schedule.'
        },
        {
          type: 'paragraph',
          content:
            'Most of the classes Anika and I have taught have been online. I have been part of Norcal Robotics since sixth grade, where I did python summer camps, tinkercad summer camps, thunkable summer camps, Canva summer camps, python classes, math classes, ACSL classes, and probably even more, but each of those were online. Planning in person comes with a whole new set of logistics. You have to think about where you are going to to do the classes, how you will arrange the chairs, how you will share your screen, how many materials do you need to get, etc.'
        },
        {
          type: 'paragraph',
          content:
            'For us, we definitely got way too many materials. The marshmallows practically finished because all the girls ate the extras, but the spaghetti on the other hand… My cousin and I will be eating spaghetti for weeks. We also had a lot of extra tape. Luckily, the materials for this workshop were pretty cheap, and it\'s always better to have more than less.'
        },
        {
          type: 'paragraph',
          content:
            'Planning out these workshops definitely takes a lot of time, my cousin and I spent a ridiculous amount of time and energy just brainstorming. Then you have to create the website page and do advertising. Then you have to come out with actual content for the classes, make the slides, make the one pager to give at the end of the class. You need to practice and memorize the content on the slides. You have to decide on materials, decide how much of each material to get, and actually try out the activity for yourself to make sure it works. You need to go a day before to rearrange the classroom, and make sure the projector and everything is working along with bringing all the materials. On the day of, you need to come early for final adjustments, and stay after to clean everything up. During the class you need to take pictures for instagram, and you have to go through them and make the instagram post. You need to be sending out reminder emails and responding to questions. You have to manage at least 20 girls. Honestly though, work it.'
        },
        {
          type: 'paragraph',
          content:
            'Doing all the work, although sometimes it can be a headache, is actually pretty fun and rewarding. It was fun learning about structural engineering, it was fun trying to make a tower on our own beforehand. It was fun taking pictures during the lesson and designing stuff on Canva. It was fun talking and teaching the girls. It was fun spending all this time thinking about ideas and actually seeing them come to life. Despite the time commitment of hosting in person workshops, it is worth it. The hands-on activities are so fun, and overall, in person is just funner for everyone compared to online.'
        },
        {
          type: 'paragraph',
          content:
            'I would like to personally thank my mom for the workshops running smoothly, not because she did anything directly, but because of the prior experience and knowledge I had after being a teacher assistant for her summer camps. During the summer my mom hosts robotics summer camps, from 9am - 3pm, with elementary schoolers. I am telling you if you can handle 12 elementary schoolers, you can handle anyone, besides parents. Luckily, since this was a free workshop, all the parents were super nice. I already have so much experience teaching and answering questions, being patient, being chill and nice but firm when you can see someone is trying to break the rules, or being nonchalant when you see a kid is trying to rage bait you. It also helped me think about the ways the workshops could go wrong, and made me think of things like bringing games or additional activities in case we had extra time. Also, as a person who likes things to go to plan, I have learned that life has other plans, and sometimes it\'s better to just go with the flow then force people to do things they really don\'t want to do. For example, we still had a couple of concluding slides at our workshop, but all the girls were out of it and just wanted to eat marshmallows, and I realized to just go with the flow and not finish the slides. The summer camps also helped me with talking to people younger than me, and getting people who don\'t know each other to come together and talk, which helps at the start of class when it\'s super awkward. It has also just improved my speaking and teaching skills in general, my voice is a lot more clear and confident, thanks to all the elementary schoolers, I can scream pretty loud.'
        },
        {
          type: 'paragraph',
          content:
            'Thats honestly my debrief from the first work. It was a lot of work but the 1.5 hours of the actual workshop flew by. My cousin and I are so lucky that all the girls were so nice, when we were giving the lesson they didn\'t really talk over us, and were laughing and having fun during the activity we organized. They were all super sweet too!'
        },
        {
          type: 'paragraph',
          content:
            'If you want to see photos from the workshop, [visit the Spaghetti Structures photography post](/photography/spaghetti-structures).'
        },
        {
          type: 'paragraph',
          content: 'See you at the next workshop! 👷‍♀️'
        }
      ];
    }

    if (blog.id === 6 && blog.title === 'Math Workshop') {
      return [
        {
          type: 'paragraph',
          content: 'Hey guys, this weekend we had our second workshop, our math workshop!'
        },
        {
          type: 'paragraph',
          content:
            'As you can probably figure out, you do not need to buy a lot of materials for a math workshop, so this workshop cost us no money. On the other hand, it is also the most boring and hardest class to teach, so making the curriculum took forever.'
        },
        {
          type: 'paragraph',
          content:
            'We decided to teach two-variable equations. In hindsight, maybe something geometry-related could have been more fun and hands-on. We planned out the lesson so that we first did a review of solving one-variable equations before jumping into substitution and elimination.'
        },
        {
          type: 'paragraph',
          content:
            'We had two games to wrap it up in the end: a scavenger hunt and a relay race. In the scavenger hunt, we had envelopes labeled clue 1, clue 2, and clue 3. In each envelope there was a system of two-variable equations, and at the end one equation where they had to plug in the values of x and y to find the answer.'
        },
        {
          type: 'paragraph',
          content:
            'Once they solved the final equation for all three clues, they got a code to the lock. If they tried the code and the lock opened, they won. Otherwise, they lost. The scavenger hunt part came into play because we hid the envelopes across two rooms in the building. In our opinion we did a good job, but they found them pretty easily.'
        },
        {
          type: 'paragraph',
          content:
            'We also had a relay race prepared with one-variable equations, where they would have to solve an equation, come to us with the answer, and get the next equation. The first group to finish all equations won.'
        },
        {
          type: 'paragraph',
          content:
            'When we came the day before to set up, we decided to practice our presentation. To our surprise, it took around 50 minutes. We knew no one wanted to listen to that, ourselves included. That is literally a whole normal school period. So we had to shorten our slides and practice problems a lot.'
        },
        {
          type: 'paragraph',
          content:
            "Another problem we faced was projecting our slideshow. We learned that projecting onto a whiteboard might not be as clear as projecting onto a wall. That was pretty interesting because my projector was equally clear on each surface, but my cousin's projector worked much better on a wall than a whiteboard."
        },
        {
          type: 'paragraph',
          content:
            'In the actual workshop, this time we also handed out Dum Dums for participation because this required a lot of participation and we needed something to convince them. It actually worked pretty well. We went through a lot of Dum Dums though.'
        },
        {
          type: 'paragraph',
          content:
            'The first part with one-variable equations went pretty well because they already knew how to solve them. Two-variable equations were a bit harder because some of them knew it and some of them did not. I went over substitution and my cousin went over elimination because substitution is my favorite and elimination is her favorite.'
        },
        {
          type: 'paragraph',
          content:
            'I will say it was kind of sad that no one got substitution. I would be like, okay guys, what do we do first? What do we do now? No one raised their hand lol. That was kind of sad, but I asked and they said there was not anything I could do better. At least they got how to eliminate, so that did not ruin the scavenger hunt because they could solve the equations.'
        },
        {
          type: 'paragraph',
          content:
            'For this workshop, we did not get nearly as many pictures. I think I only took 20, compared to the last workshop where I took around 80. The photos did come out good though, so I am not really mad. This time we also already had the drill down, so the Instagram post was up the next day. You can [see the Math Workshop photos here](/photography/math-workshop).'
        },
        {
          type: 'paragraph',
          content:
            'Overall, we did not really have high expectations for this workshop because it is arguably pretty boring and hard to teach. We are pretty proud of how it went, so just a friendly reminder that the things you are worried about are never nearly as bad as they seem :)'
        }
      ];
    }

    return [
      {
        type: 'paragraph',
        content: `This is a detailed view of "${blog.title}". Content will be added here soon.`
      }
    ];
  };

  const blogContent = getBlogContent();
  const blogImages =
    blog && blog.id === 1
      ? [
          `${baseUrl}cats-1.jpg`,
          `${baseUrl}cats-2.jpg`,
          `${baseUrl}cats-3.jpg`
        ]
      : [];

  const calculateWordCount = () => {
    let count = 0;
    blogContent.forEach((item) => {
      if (item.type === 'paragraph') {
        count += stripInlineMarkdownLinks(item.content).split(/\s+/).filter(Boolean).length;
      } else if (item.type === 'list') {
        item.items.forEach((itemText) => {
          count += stripInlineMarkdownLinks(itemText).split(/\s+/).filter(Boolean).length;
        });
      } else if (item.type === 'header') {
        count += stripInlineMarkdownLinks(item.content).split(/\s+/).filter(Boolean).length;
      }
    });
    return count;
  };

  const wordCount = calculateWordCount();
  const readingTime = Math.ceil(wordCount / 100);

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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    let date;
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]) - 1;
      const day = Number(isoMatch[3]);
      date = new Date(year, month, day);
    } else {
      date = new Date(dateString);
    }

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalTime = readingTime * 60;
  const activeProgress = isReadingAloud || isPaused ? speechProgress : scrollProgress;
  const currentTime = Math.floor((activeProgress / 100) * totalTime);
  const getReadableText = () =>
    blogContent
      .map((item) => {
        if (item.type === 'list') {
          return item.items.map((t) => stripInlineMarkdownLinks(t)).join('. ');
        }
        return stripInlineMarkdownLinks(item.content || '');
      })
      .join('\n\n');

  const pickPreferredVoice = () => {
    if (!('speechSynthesis' in window)) {
      return null;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      return null;
    }

    const preferredVoiceNameSnippets = ['david', 'guy', 'mark', 'ryan', 'google uk english male', 'male'];

    const preferred = voices.find((voice) =>
      preferredVoiceNameSnippets.some((snippet) => voice.name.toLowerCase().includes(snippet))
    );
    if (preferred) {
      return preferred;
    }

    const englishNonDefault = voices.find((voice) => voice.lang.toLowerCase().startsWith('en') && !voice.default);
    if (englishNonDefault) {
      return englishNonDefault;
    }

    const englishAny = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));
    return englishAny || voices[0] || null;
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

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!blog) {
    return null;
  }

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="projects-page blog-detail-page" ref={contentRef}>
      <div
        className="banner-section"
        style={{
          background: `linear-gradient(180deg, ${hexToRgba(blog.color, 0.4)} 0%, ${hexToRgba(blog.color, 0.6)} 100%)`
        }}
      >
        <div className="banner-content">
          <div className="cover-square" style={{ backgroundColor: blog.color }}>
            <span className="cover-icon">{blog.icon}</span>
          </div>

          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">{blog.title}</h1>
            <p className="banner-metadata">
              Author: Eesha Gupta, {wordCount} words, {readingTime} minute read
            </p>
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

      <div className="content-section">
        <div className="content-header">
          <div className="header-number">#</div>
          <div className="header-title">Title</div>
          <div className="header-date">Date added: {formatDate(blog.date)}</div>
        </div>
        <div className="header-divider"></div>

        <div className="writing-area">
          {blogContent.map((item, index) => {
            const prevItem = index > 0 ? blogContent[index - 1] : null;
            const nextItem = index < blogContent.length - 1 ? blogContent[index + 1] : null;
            const isHeader = item.type === 'header';
            const isFirstInSection = prevItem && prevItem.type === 'header';
            const isLastInSection = nextItem && nextItem.type === 'header';
            const nextNextItem = index < blogContent.length - 2 ? blogContent[index + 2] : null;
            const hasImagePairWrap =
              blog &&
              blog.id === 1 &&
              item.type === 'paragraph' &&
              index === 2 &&
              nextItem &&
              nextItem.type === 'paragraph' &&
              nextNextItem &&
              nextNextItem.type === 'paragraph';
            const rowPaddingTop = isHeader ? (index === 0 ? '0px' : '16px') : isFirstInSection ? '2px' : '1px';
            const rowPaddingBottom = isLastInSection ? '0px' : '0px';

            if (blog && blog.id === 1 && (index === 3 || index === 4) && prevItem && prevItem.type === 'paragraph') {
              return null;
            }

            if (item.type === 'header') {
              return (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <h2
                      className="content-paragraph"
                      style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '20px', marginTop: '0', marginBottom: '0' }}
                    >
                      {item.content}
                    </h2>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            }

            if (hasImagePairWrap) {
              return (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <div className="blog-intro-row">
                      <div className="blog-intro-images">
                        <img className="blog-intro-image" src={blogImages[0]} alt="Cats blog" />
                        <img className="blog-intro-image" src={blogImages[1]} alt="Cats blog" />
                      </div>
                      <div className="blog-intro-text">
                        <p className="content-paragraph" style={{ margin: '0 0 10px 0' }}>
                          {paragraphWithOptionalLinks(item.content, index)}
                        </p>
                        <p className="content-paragraph" style={{ margin: '0 0 10px 0' }}>
                          {paragraphWithOptionalLinks(nextItem.content, index + 1)}
                        </p>
                        <p className="content-paragraph" style={{ margin: '0' }}>
                          {paragraphWithOptionalLinks(nextNextItem.content, index + 2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            }

            if (item.type === 'list') {
              return (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <ul style={{ margin: '0', paddingLeft: '24px', color: '#b3b3b3' }}>
                      {item.items.map((listItem, listIndex) => (
                        <li
                          key={listIndex}
                          className="content-paragraph"
                          style={{ marginBottom: listIndex < item.items.length - 1 ? '2px' : '0' }}
                        >
                          {paragraphWithOptionalLinks(listItem, `${index}-${listIndex}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="writing-row"
                style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
              >
                <div className="row-number">{index + 1}</div>
                <div className="row-content">
                  <p className="content-paragraph" style={{ margin: '0' }}>
                    {paragraphWithOptionalLinks(item.content, index)}
                  </p>
                </div>
                <div className="row-date"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover" style={{ backgroundColor: blog.color }}>
            <span className="player-icon">{blog.icon}</span>
          </div>
          <div className="player-info">
            <div className="player-title">{blog.title}</div>
            <div className="player-artist">Eesha Gupta</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-progress-container">
            <div className="player-time player-time-left">{formatTime(currentTime)}</div>
            <div className="player-progress-bar" ref={progressBarRef} onClick={handleSeekSpeech}>
              <div className="player-progress-fill" style={{ width: `${activeProgress}%` }}></div>
            </div>
            <div className="player-time player-time-right">{formatTime(totalTime)}</div>
          </div>
        </div>

        <div className="player-right"></div>
      </div>
    </div>
  );
};

export default BlogDetail;
