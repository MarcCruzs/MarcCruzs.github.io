---
title: Behavior Questions
description: On-going list of behavior questions
date: 2023-08-15
categories: []
tags: [behavior]
pin: true
---

Decided to write page for several reasons: 
- Creating a better understanding of myself.
- Creating an easier method to expose my behaviors without on the spot pressure.
Although would note, to get rid of the notion that my answers are artificial (ChatGPT et al.). I decided it would be best when applicable to explain more technical topics. I apologize in advance if the technicality gets in the way of understanding my answer to any of the listed questions below. To make it easier, I *italicized* the technical terms and please feel free to skim. I answered each question with more depth due to not having a time limit.
# Behavioral Questions
1. **Tell me about a time you faced a significant challenge at work. How did you handle it?**
2. **Describe a situation where you had to work with a difficult colleague. How did you manage the relationship?**
3. **Give an example of a goal you set and how you achieved it.**
4. **Tell me about a time when you had to learn something new quickly. How did you do it?**
5. **Describe a situation where you had to make a tough decision. What was the outcome?**

## 1. Tell me about a time you faced a significant challenge at work. How did you handle it?
During my internship at NASA, I ran into a problem with converting one of the MATLAB scripts into Python. Specifically the problem halted the progress in making the current codebase capable of being scalable for potential operational usage. 

In order to handle, first I attempted my own hypothesis that might turn into a solution to the problem. For several rounds of testing different solutions in a different coding environment, I documented each test done. 


*An example of one of the tests (with context):*
Determining the most optimal Python library is being used. Some context to this problem:
	The MATLAB *nctoolbox* is what is causing issues to read necessary files. The toolbox (other synonymous words: library, toolkit) has a bigger abstraction to how it provides access to data variables. Whereas Python has several libraries, in which *xarray* with *cfgrib* provided the most similarity to *nctoolbox* and was generally straightforward when accessing the same data file. With these two tools in mind, a series of tests on questioning if *xarray* with *cfgrib* is most optimal (long story short it somewhat was. Somewhat due to dependency management as mainly functional when *conda installed* instead of *pip installed*). 
To determine if it was the most optimal Python library:
	Tested several other engines that can be used with *xarray* or individually including *netCDF4*, *pygrib*, *pydap* (tried with as I was experimenting to see if OPeNDAP data access to make the whole process faster (*ETL*: extract, transform, and load)). Considerations for other tools outside of Python were quickly scrapped as it brings potential issues of using different languages down the future if the codebase is determined to become production ready (currently in the research phase, but to vaguely put it, the work is meant to be a service in the next several years). 


When some of my hypothesis failed, then I took my documentation to my mentor to discuss other possible methods to try or if any of my hypothesis (or if you will, test cases) might have missed a point. After getting critiques and some suggestions, then I redid some of the test cases done or make new ones. 


Going back to the same example used, the main critique was proper understanding of the data. The rational at the time of accessed data was considered to be of the same unit overall based on MATLAB's metadata for each desired variable. With that in mind, the mishap occurred that when Python (xarray with cfgrib) provided the option to choose two various units of Pascal. Only accessed the unit that MATLAB metadata specified, but after redoing several tests based on my mentors suggestion, found that Python has split the necessary data into two categories whereas MATLAB kept it as one. The assumption that the data variable accessed in MATLAB *nctoolbox* made a misunderstanding and solutions to the problem were quickly made with the underlying problem now more obvious. 


After determining a solution to remedy the problem, discussed the solution with my mentor to reaffirm and then finally confirmed the problem being resolved.
## 2. Describe a situation where you had to work with a difficult colleague. How did you manage the relationship?
One situation I had was during my time on a interdisciplinary competition team. The name of the competition being Student Unmanned Aerial Systems, or SUAS (/suu-Us/). The team comprised of a blend of several engineering/STEM majors including computer, electrical, aerospace, electromechanical systems, computer science, and mechanical. With this in mind, the dilemma as a computer science student explaining the details of programming to a non-programmer colleague arise. The relationship was handled in a way where it does not become overbearing on either persons side of work. Setting boundaries of where, when, and how to go over programming code. Although I have an issue of being hopeful when the problem turns out to be more complex, reaffirmation of the boundaries helps maintain effective collaboration. Then also being open minded to my colleagues situation. I understood their goal of the project which is wanting to design the autonomous features of the UAV (Unmanned Aerial Systems), but then needing to be able to code. With my own tasks set for myself and needing to also assist with my colleagues, I keep in mind their intention is good and usually mean no harm even if it gets frustrating with issues taking several weeks to figure out. 
## 3. Give an example of a goal you set and how you achieved it?
For the club that I contributed to leading, I set a goal to setting up 3 projects for the Academic year that provide Experience. How I went about achieving the goal:
1. Listed the required standards and must-have considerations that each project proposal has to have. Of the considerations, the essential points being:
	1. **Scalability**. From past and current attempts of fellow clubs of allowing their members to determine their own projects to do. Which have several merits, but lacks the foresight that I want the project ideas or general concepts to have. The project idea needs to have its requirements to solve/create to evolve towards the reasoning behind the project purpose. To clarify, the project idea has to be tough enough for it to exist for several semesters with potentially different teams. Different teams allow a new, but relevant experience of how to adapt to an on-going codebase and importance of thorough documentation.
		1. For example, a project that was conceived was a basic static website that was being made to facilitate practical information for other students to work off. The idea was to resolve the general issue of unknown unknowns, where the potentially hard-working student determining what concepts they need to familiarize themselves with or be aware of. For example, the mentioning of object oriented programming, can prove useful for students learning the basics of programming of their selected language.
	2. **Experience**. The project needs to inherently ambitious enough that it requires a team to handle the project in the time frame of a semester (3-4 months). Although extensions are not frowned upon, the attempt is to make the most out of the time as an undergraduate student.
	3. **Community**. I truly believe my universities community could be more than what it is now. I was fortunate to have a supportive community in highschool where it allows me to want to support my fellow student. To keep this spirit, the projects should have its own angle that supports the students in any possible method.
		1. For example, another project that I designed was mimicking a research small project that was tasked as a student researcher under Dr. Tingting Chen. The project was my very first experience with machine learning and thought it would be a great idea to bring to the club as a starting point for beginners with machine learning (but with the difficulty cranked up to push a student to not just go through the steps but be wary of those said steps. Although the original small project purpose was to make a LSTM and GRU models out of a kaggle dataset, the project idea was scaled to create LSTM, GRU, SVM, random forest, and other models and then compare the models accuracy between each other. Although the project became more complex due to the adjustment, but this ensures that even if the project never finishes, the members would still benefit from a bigger exposer to machine learning. 
2. Brainstormed the list of projects ideas that can be ran. Taking inspiration from dilemmas I ran into or past experiences to determine what to start the project initiative. Thinned the list based on the made standards and then determining what had the most potential to evolve into new experiences that original or new teams can take on with the same project idea still being the goal.
3. Determined project leaders for the projects. Consideration of the club projects would take dedication towards their respective project. Meaning consideration for logistics and leadership experience.
4. Consistent weekly reports. Weekly to ensure that progress is still being met and be recorded by club e-board.

In my role as a co-leader of the club, I set a goal to establish three projects for the academic year that would provide valuable experience to members. Here’s how I achieved that:

1. **Defined Project Standards:** I created a set of criteria that each project proposal had to meet. The most important considerations were:
   - **Scalability:** I wanted projects that could continue over multiple semesters, potentially with different teams. This fosters adaptability and emphasizes the importance of thorough documentation.
     - For example, we initiated a project to create a static website that provides practical information for students. The goal was to help students identify what key programming concepts (like object-oriented programming) they needed to focus on early in their learning process.
   - **Experience:** Projects needed to be ambitious enough to require teamwork and be completed within a semester. Extensions were fine, but the aim was to maximize learning during the time students had.
   - **Community Impact:** I believed in enhancing the sense of community within the university, similar to the support I had in high school. Each project needed to contribute to students' development in meaningful ways.
     - One project I introduced was based on my own experience as a student researcher. It involved machine learning, where we scaled the task from a basic LSTM and GRU model comparison to include more models like SVM and random forest. This increased the complexity but ensured greater exposure to machine learning concepts, even if the project wasn’t fully completed.
2. **Brainstormed Project Ideas:** I generated a list of potential projects based on past challenges I faced and thinned it down using the standards I established. I focused on ideas that had the most potential to evolve and benefit future teams.
3. **Selected Project Leaders:** I appointed leaders for each project, taking into account their dedication, logistical skills, and leadership experience.
4. **Maintained Weekly Reports:** We held weekly check-ins to track progress and ensure that club leadership remained informed.
## 4. Tell me about a time when you had to learn something new quickly. How did you do it?**
A scenario like this would be a project I joined called NGCP, or Northrop Gruuman Collaboration Project. In this project, the project scales to over 100 individuals and for my portion of the work I had to understand the implementations used for vehicle integration as a new member GCS (ground control station) vehicle integration team. To note, the message broker that was being used (RabbitMQ) had to be understood quickly on basic usage and then applying RabbitMQ in various different languages. So in order to learn it efficiently:
1.  I first took the learning material provided by the team and looked into the article resources.
2. After getting familiar with the resources, I go into RabbitMQ (https://www.rabbitmq.com/) documentation and look into implementations in Python to understand the implementation and match the same coding language used in implementation.
	1. Going through the basics and changing the results to see if I understood. For example, testing docker container to run the RabbitMQ server and trying to test results of multiple clients publishing info and a server able to catch the information from the various sources on same local machine.
3. Moved onto actual codebase and started running the code as it was supposed to be intended. 
4. After successfully running the code, created my own test cases to understand RabbitMQ usage and then also tie in the codebase to also learn the intended functionality. In other words, understanding the message broker's basics and then tie to test cases to also understand the codebase I will be working in.
Doing all this within 3 weeks, and now able to run the codebase.
## 5. Describe a situation where you had to make a tough decision. What was the outcome?
One situation that occurred in in my club (Software Engineering Association, SEA) while part of my co-presidency was a new recruited board member not meeting expectations for several months. This led to a difficult decision regarding whether to firing the board member. After gathering the opinions of the other board members, we discussed the issue. We provided the board member with multiple chances to improve by assigning tasks with ample amount of time to complete the task. For example, one task involved reaching out to other club advisors about potential collaborations, with a deadline of 7 days.  To note, assistance or questions were welcomed. However, the task was only completed after a reminder after the set deadline, and even then, the quality of work did not meet expectations..

After another round of discussions among the board and offering one final chance to meet expectations, we held a formal meeting with the entire board to consider dismissal. Ultimately, the board decided to remove the underperforming member.

Although the situation was not ideal, as no previous procedures for handling such cases existed, it helped us refine the board member evaluation process. This experience allowed me to make more structured and informed decisions about future board recruitment and performance evaluation.
