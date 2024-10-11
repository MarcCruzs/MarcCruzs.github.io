---
title: SUAS Technical Design Document
description: Outlines the approach and strategies for the SUAS (Student Unmanned Aerial Systems) Competition Software Team.
date: 2023-09-04
categories: [SUAS, Documentation]
tags: [technical]
---

## 1. Introduction
This technical design document outlines the approach and strategies for the SUAS (Student Unmanned Aerial Systems) Competition Software Team. Our primary focus is to integrate machine learning and computer vision technologies into the team's objectives while ensuring that team members gain valuable experience through the competition.

## 2. Learning Objectives
- Machine Learning Implementation
- Introduce team members to machine learning concepts and applications.
- Highlight the importance of machine learning in the SUAS competition.
- Effective Communication & Teamwork
- Emphasize efficient communication and collaboration within the team.
- Foster a team-based approach to solving complex technical challenges.
- Understanding the Software Development Lifecycle
- Illustrate how machine learning fits into the software development lifecycle.
- Ensure team members grasp the holistic software development process.

## 3. Goals
- Object Detection with Machine Learning
    - One of the main goals is to use machine learning for object detection as required by SUAS competition rules.
- Dataset Creation
    - Create a dataset specifically designed for training machine learning models.
    - Include objects relevant to SUAS competition targets in the dataset.
- Model Selection & Experimentation
    - Experiment with pre-built machine learning models.
    - Testing different machine inference to find best result
    - Explore the possibility of designing a custom Convolutional Neural Network (CNN) model if time permits.
- LiDAR Integration:
    - Implement the Lidar system to enable collision avoidance during UAV (Unmanned Aerial Vehicle) operation.
    - Develop expertise in embedded systems, Python, or C++ as required.
    

## 4. Methodology
### 4.1 ODLC 
#### 4.1.1 Detection & Classification
![Figure1](https://lh7-us.googleusercontent.com/MPL4Ewqiwa3qTspR_q3nyJm7jKx8z2qo5CVRB__Y4bXJ62UtTWu50gaukCjAmM4KPWVc1UwHz-tnj2Se9pMxcg9lCg4kUgYpKbsiNu3YIfGMATlN5hSsl_kKRVciZbsxVQ0uo1VIfEkgdezFvPOW398)
Figure 1. Illustration of connections between each essential component.
For the detection, 5 models are going to be developed:

- Identify 4 shape objects (STANDARDIZED OBJECT)
    - Detecting Shapes:
        - circle, semicircle, quarter circle, triangle, rectangle, pentagon, star, and cross    
    - Identifying Shape Color
        - Detecting Colors:
            - white, black, red, blue, green, purple, brown, and orange
    - Identifying Text
        - Identifying Text Color
- Identify 1 Humanoid (EMERGENT OBJECT)

For more details for each model, please refer to this link for more details on the models themselves: [SUAS Competition - Machine Learning Models](https://docs.google.com/document/u/1/d/1NGDLi6Uy2DGIpv6iiO3tHvGlaYqndotmU1LXMRD1Z78/edit). How the models would be used is connecting them, or ‘stacking’ them together to collect the necessary information on a true positive standardized target, or a true positive emergent target. Refer to Figure 2, where it illustrates how the models relate to each other.

Machine Inferencing Methedology:

![Figure2](https://lh7-us.googleusercontent.com/DVNPSCjDjdmOL_YaWlip2pMwD455sOpz9SsfOCo5DJjFhv_1Qt7PlRcPNW9KHom8BuMJuwwnOEEbf_Swx2Tgh6Vgav67EmhbR2eh6mq2Yl6OHREx0dlvA033j53HFxsHwV0sIPPu-mcW_bpMnSDAnws)

Figure 2. Describing the order of models would process and what the procedure to confirming a target location for payload team to use

  

The machine learning system, is identifying each characteristic of a standard target, with each model they all act as mitigations of false positives. In order for a target to be considered a true positive, needs to properly identify all 4 characteristics (shape, text, shape color, and text color). While the humanoid model is an exception as it focuses on emergent target that has its own set of problems to solve.

##### 4.1.2 Datasets

In order to use machine learning models, would need a considerable amount of data that would ensure that the accuracy of each model is high. For Shape ML Model, would be creating a synthetic data that consists of taking existing aerial images and attaching standardized target’s onto the aerial images. The standardized target’s would be recreated using a script. Creating all combinations of the list of colors and shapes from the rulebook. Then the aerial images for the synthetic dataset are derived from:

- https://sites.google.com/view/grli-uavdt/%E9%A6%96%E9%A1%B5
    
- https://vision.ee.ccu.edu.tw/aerialimage/
    
- https://cemse.kaust.edu.sa/ivul/uav123
    
- [https://www.proquest.com/docview/2530133784/fulltextPDF/8A0658D0D93F45C0PQ/1?accountid=10357](https://www.proquest.com/docview/2530133784/fulltextPDF/8A0658D0D93F45C0PQ/1?accountid=10357)
    

The aerial images all do not have the ideal altitude and angle, but uav123 dataset has 15gb (100k+ aerial images) worth of images that allow us to overcome the lack of ideal data with abundance of images that would likely cover the ideal. 

  

For models identifying color, would be using a created dataset of various RGB values with a label giving the related color. The color labels would be simplified into simplified term (ex. Navy blue, baby blue would be labeled as blue). 

  

For the model identifying the alphanumeric, would be using openCV OCR to identify the text. If OCR proves to be ineffective, then may consider taking existing text datasets. 

  

For Humanoid Model, would need to look for datasets with aerial images of individuals. Currently, there are datasets that do human detection, but datasets seem to be using mainly images taking horizontally and not vertically. With that in mind, another synthetic dataset might be considered, or physical data collection might be required.

#### 4.1.3 ODLC Localization

For localization, the camera mounted onto the gimbal would be always facing directly downward. This allows us to conduct GSD (ground sample distance) where taking the distance between the camera and the ground and dividing by the focal length of the camera. 

### 4.2 Obstacle Avoidance

Using LiDAR system that is capable of 360°. Using the LiDAR, creating a 3D map that would consistently check for any objects that are getting close by the distance of 8 meters. Would be scanning an area and for each scan comparing if there is a detected object. Based on the next scans, if the object is getting closer to the UAV, then determining the 2 options:

- Avoiding the obstacle, but staying as close to the existing waypoint path
    
- The furthest direction from the obstacle to ensure higher chance of avoidance.
    

- Priority to move left, right, descend, or ascend. Considerations for diagonal movement may happen.
    

As the UAV would be 85 ft in altitude, the Obstacle avoidance needs to implement full coverage from all angles as the rulebook limitations states 75 ft is the minimum altitude. There are odds of other drones being below if we are in the 85-90 ft altitude range.

## 5. Potential Risks & Mitigations

### 5.1 ODLC Risks

- Competition weather was not covered by the dataset
    

- Mitigation: Using abundance of data to cover as many potential environments that the targets may be in
    

- False Positives for standardized targets
    

- Mitigation: Having multiple models that each check a particular characteristic of the standardized target. If one of the target characteristics can not be found, then is considered a false positive. 
    

- False negatives for standardized targets
    

- Mitigation: Can add parameters if a found standardized target does not have the characteristics of any of the payload bottles, but has 2 matching characteristics, then its possible for the model to re-evaluate the model.
    

- This Mitigation option means we need to change the data structure algorithm from queue to potentially priority queue or an algorithm that can allow for it circumvent the list of other targets found to be rechecked again by the machine learning system.
    

- Humanoid Target identifies an actual person outside the boundary.
    

- Mitigation: A way to determine if a location of a supposed emergent targe is within the dropzone boundary. If the location is found 
    

### 5.2 Obstacle Risks

- Not covering the lower area of the UAV, due to one single LiDAR mounted onto the top not seeing
    

- Mitigation: Integrating a secondary LiDAR that covers the area at the bottom, or angled in a way to allow to see deep angles towards the bottom of the UAV that narrows the blind spot
    

- Determining the proper direction if another UAV moves the same direction when trying to avoid each other:
    

- Mitigation: Creating the algorithm deciding the UAV dodging maneuever to be as optimized as possible. When optimized, allows for better reaction, if the dodging maneuver has failed. The algorithm may consider the next best maneuver that:
    

- Avoid obstacle
    
- Not stray too far away from original waypoint
    
- Not go out of bounds, if possible.
    

  

## 6. Timeline

### 6.1 Learning Phase (August - October)

- Introduce machine learning basics.
    
- Cover different types of machine learning models.
    
- Ensure all team members have a solid understanding before progressing.
    

### 6.2 Data Collection and Dataset Phase (October - December)

- Highlight the importance of data collection and preparation.
    
- Create a dataset tailored to SUAS competition objectives.
    

### 6.3 Modeling Phase (October - February)

- Explain the process of model selection and experimentation.
    
- Encourage team members to explore pre-built models and consider custom CNN development.
    

### 6.4 Real-time Testing Phase (February - August)

- Describe the implementation process for the selected model on the UAV.
    
- Emphasize real-time testing and fine-tuning.
    

## 7. Development Management

Our development approach is based on sprint-based development and structured team management:

### 7.1 Sprint-Based Development

- Implement a sprint-based development approach.
    
- Adapt sprint durations and activities based on the phase of machine learning implementation.
    
- Each sprint should encompass planning, analysis, design, implementation, testing, and code review.
    

### 7.2 Scrum/Sprint Structure

- Follow a scrum/sprint structured approach to gain experience in project management.
    
- Conduct weekly developer sync meetings.
    
- Ensure regular updates and collaboration among team members.
    

## 8. Document Revisions

  

|   |   |
|---|---|
|Version|Changes|
|1.2 (November 2023)|Updated images of the Machine Inferencing and hardware flowchart. Added Current Work Document link. Added Standardized target possible characteristics of shape and colors.|
|1.1 (October 2023)|Updated, Learning objectives and goals. Added Methodology and Risk mitigation.|
|1.0 (September 2023)|Initial Release|
