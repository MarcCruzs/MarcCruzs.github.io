---
title: SUAS Team Overview
description: Overview of the software subteam of Cal Poly Pomona's Student Unmanned Aerial Systems (SUAS) team.
date: 2023-08-15
categories: [SUAS, Documentation]
tags: [overview]
---

## Learning Objectives
While pursuing to win the [SUAS competition](https://suas-competition.org/competitions), ensuring that the team members learn and gain useful experience through the competition.
- Become familiar in machine learning through implementation
- Learn how to communicate efficiently and work as a team
- Understand the software development lifecycle and its process
## Project Goals
As part of the software team, we have two goals for SUAS 2024 competition:
- ODLC: Object Detection, Localization, and Classification    
- Obstacle Avoidance

Based on the given rulebook for SUAS 2024 competition, would develop the necessary software and hardware to detect the given targets. When targets are detected, then a payload is dropped based on the payload’s target specification. The Obstacle Avoidance is developing a mechanism to ensure that any obstacles in the air can be avoided. For more details, refer to [SUAS Competition - Technical Design Document](https://docs.google.com/document/u/0/d/1Hv8CBEygzn6d_D0jYTPEPe0Zx2BSj3nUGLTv69tdatc/edit).
## ODLC Goals
In order to properly make software that is capable of detection, classification, then localization would be accomplishing these overarching goals:
- Data Collection
- Machine Learning/Inferencing
- Preprocessing datasets

Creating a dataset capable of making a decent machine learning (ML) out of it. With how the targets/objects to be detected are announced, the dataset has to be made from scratch. With that it leads to creation of physical copies of the targets or creating synthetic versions of the targets. 

After the dataset, experimenting with pre-built models and if enough time then attempt to create a ML CNN model from scratch. The preprocessing may be needed to increase the clarity of images to help a deep learning model increase accuracy
### Obstacle Avoidance Goals
Setting up the LiDar system on the UAV. The LiDar is supposed to assist in collision avoidance while it is in the air. This entails work on embedding systems, Python, or C++. 
## Management
In terms of leadership, the software lead would delegating portions of the work weekly. Having developers syncs weekly at the same time when sprints are coming to an end and gather everyone’s updates. Designed in a way to gain experience in a scrum/sprint structured team.
## Timeline
The time frame would be approximately the end of spring semester until SUAS competition deliverables would be due. With the large time frame, it is broken down to general phases the team would go through:
1. Learning Phase (August - October)
	- There is no expectation of all the members already knowing how to exactly solve the objectives. Would go over:
		- ML basics
		- Types of ML models  
		- Data Collection
2. Dataset Phase (October - December)
	- Begin to transition from learning into creating the necessary dataset for the ML model
3. Modeling Phase (November - February)
	- When the dataset is sufficient, experimentation of what model to be used
4. Real-time Testing Phase (February - August)
	- Once the model has been tested, begin implementing it onto the UAV and experiment with live tests    

These are the general phases and the team’s pace determines the length of each phase.

<br  />
We manage our development through sprints. Usually, each sprint will be bi-weekly and includes planning, analysis, design, implementation, testing, and code review. With the project having some research and a learning curve with machine learning, the sprints would be modified accordingly based on the phase the team is currently at. 

A week before beginning the sprints, we will have a given period to get everyone on the team set up for their environment.