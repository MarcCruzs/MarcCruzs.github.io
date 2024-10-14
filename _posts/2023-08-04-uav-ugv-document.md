---
title: CPP UAS REU Final Report | UAV-UGV Collaboration Paper
description: Weed Detection and Removal with Unmanned Aerial Vehicles and Unmanned Ground Vehicle in Precision Agriculture. Report goes into details of the implementation of UAV detection and UGV operations.
date: 2023-08-04
categories: [Projects, CPP UAS REU]
tags: [project]
authors: [<Marc_Cruz>, <Derek_Triska>, <Saketh_Nunna>, <Dennis_Uryeu>]
---

## Abstract

The goal of the UAV-UGV project is creating a system to identify strawberries and weeds in order to make a weed removal system. Having an UAV drone identify weeds, transfer location of said weeds, and UGV removing the located weeds. To do so, using a deep learning model (machine learning model) that is fed labeled images of a local strawberry field containing weeds. The deep learning model is then implemented to identify a weed and using stereo vision to determine location of the weed. The location is then transmitted to the Husky (UGV) where it would transit to the location, check if it is a weed, and then conduct removal of the weed.  


## 1. Introduction    

The UAV-UGV project is the detection of weeds and removal of identified weeds. The overview is using a UAV drone that does object detection of small weeds and large weeds then sends the location of the weed to a UGV. The UAV specifically locates 3 labels: strawberry, small_weed, and large_weed. After doing localization, or getting world coordinates from the drone, the longitude and latitude are sent to the UGV. The UGV uses the coordinates to move to the location, search for the weed, and remove the weed. Disclaimer: what has been done in 2023 Summer is only the labeling of data and creation of prototype YOLOv5 models. The models were experimental and refer to future work for more details on weed detection model for the UAV. Next, the method to conduct localization is through using stereo vision, which is the usage of 2 cameras. Then using the husky with an attached robotic arm to remove the weeds.

## 2. Literature Review    


### 2.1 Motivations

There are multiple factors that contribute to the importance and motivation behind doing the UAV-UGV project. With increasing population growth, urbanization, and other factors have led to larger demands in agricultural products [1]. While natural resources are becoming increasingly stressed, it is emphasized to produce more with less, while enhancing current small-scale farms [1]. With varying signs of climate change contributing to the stress of natural resources [1] [2]. Referenced in [1], agricultural chemicals has contributed to a large leap in crop production, but with negative impacts. This leads to a need of an innovation with less negative impact compared to traditional agriculture. Food production must increase by 70% in order to feed a world population that is expected to reach 9.6 billion by 2050 [9] [10]. Weed contributing to a higher potential production lost (32%) compared to animal pests (18%) and pathogens (15%) [11]. Note: Some of the citations are in the 2000s and may seem more outdated than other citations. For example FAO 2017 describes nato’s trends and challenges in food & agriculture, while another  another is production analysis published in 2003.

In a smaller scaled scope, the benefit of introducing Artificial Intelligence/Machine Learning (AI/ML) automation is increasing the effectiveness of crop monitoring in order to reduce insufficient labor, reduce over-ripe fruit waste, and reducing time-consuming and labor intensive work [3]. As strawberries can produce fruits in multiple iterations, it may vary in time when a ‘round’ of strawberries are ready and shortage of laborers affects the yield [3]. For weed detection, the motives behind it is corresponds with [1] with increased stress in natural resources as weeds deter 40% of global production loses to factors that include weeds and pest damages [8]. 

With the application of AI/ML object detection is a potential solution to increase yield of existing fields and reduce the labor intensity of monitoring and/or fruit collection. Several detection in weed and strawberries have already been conducted, such as [3], [4], [5]. Then for more information there are several reviews conducted including [6] to seek more information* on other fruit picking and detection research papers.

In general, there is variety of motives that differ in scale that can be used as motivators to conduct the UAV-UGV and can be summarized, but not fully listed as:

- Increasing food/agriculture goods demands
- Demand for increase efficiency to ‘doing more with less’ in existing farms 
- AI/ML is a potential solution that can be a significant paradigm that resolves current farming techniques of using agricultural chemicals. 
- AI/ML have large difficulties and different methods to undergo for differing crops (in a way providing a novelty of working on a developing farm methods)
- Weeds reducing the yield/production of crops

**Disclaimer**: This is based on papers that were find during June 2024 to August 2024, and it is still recommended to continue reviewing related papers to ensure new and potentially older papers that might give more useful insight.
* If wanting to read on more about motives, and several methodologies, then refer to [6] and [8] as they are paper reviews on the subject. I would note [6] has more strawberry detection, while [8] has more weed detection content. For the UAV-UGV project, [7] is a relevant paper that shares notably similar characteristics to the project. If need be, the “Relevant Content for Object Detection” section of this report has more links relating to strawberry detection.


## 3. Labeling Methodology


### 3.1 Software Used

The method we used to have multiple individuals labeling data is utilizing Roboflow. Roboflow is a website-based software that helps organize labeling and experiment with YOLOv5 models. We mainly used the free version and the labeling tools to make the dataset for the machine-learning models. The reason why we used Roboflow is for convenience and bypass issues with limited hardware. Specifically, some individuals helping us did not have the option to pip install on their hardware (school-owned computer/outdated hardware). There are other alternatives such as Label Studio (labelimg) and Supervised. There are more alternatives out there, but these are the other two options we looked into, but we chose Roboflow out of convenience. With Roboflow it allows for easier management of assigning the amount of labels split between multiple volunteers and UAV-UGV members. Then also being able to double-check labeled data without issues.

### 3.2 Label Identifications

Although we are identifying weeds in the strawberry field (Spedra farm), we labeled strawberries to reduce the odds of the strawberry plants being identified as a weed. If unlabeled we assumed that there would be a chance of misidentification and decided it was best to also label strawberries. Another reason was that the collected and annotated data can be potentially used in the future where strawberry identification may be required. Noted that roboflow allows exclusion of class labels, so in the future if strawberry labels are not necessary then it is possible to remove them. Image below is a sample of an annotated image.


#### 3.2.1 Strawberry

For the set of data we had collected already, we identified the strawberry through two patterns. Pattern one is that the strawberries are planted in a row. Pattern two is that the leaves of the strawberry plant are round. Refer to the images below.

 ![A close up of a plant
Description automatically generated](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdIkRiOJJUeVzcmolCWDD51z2TIbJqTAf6aefid1xr7neKpb68MaZdaHYD0Kihx_YVtOUoyZPU5mIOPD_6uNuG9DBnSGBZPOgBPuCnpQQ8DwYMhwfaNX4PcyNsB7imcqA3qnBm8-5A_Lr1C9FqzMHYjpH-1?key=pmbbpYBm_OlrzOOyhw60Dw) ![A close up of a plant
Description automatically generated](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdC18NbQC-F2exstvTlbkHF6aRqETSD1PxnOTLnRYRBsz4WtoYBOmvLPq_Ur0fbqHHavYdvgIPM1MBkwES9qlSqRRkJ1BAc-VQiV-XszvC0oFaQqPXq3Qil_Ae8zaol3WjnSs9F8oMXfEG-eOG5qd01jUg?key=pmbbpYBm_OlrzOOyhw60Dw)


#### 3.2.2 Little Weed / Big Weed

Little weeds and large weeds are practically any plant that isn’t strawberry, so it is a lot easier to identify the weeds. The only issue we ran into in this regard are the weeds being a medium size so we decided to allow the current labeler to make a judgment call. It was accepted that if the model misidentifies a little weed as a large weed it would still serve the same result based on the goal of the project. The reason we chose to do little weed and large weed instead of grouping all the labels under just “weed” was due to prior work before us (we’re SUM 2023 Cohort) chosen to do so. We simply continued the same idea as there was already data labeled with strawberry, big weed, and little weed.  

#### 3.2.3 One Weed Variation

During the course of our experimentation with different ML models, we encountered challenges in effectively distinguishing between big and small weeds. This issue arose due to a substantial disparity in the number of labeled instances for strawberries as compared to the big and small weed classes, respectively. As a means to address this concern, we proceeded to evaluate models with a single weed class, opting to forgo the differentiation between big and small weed categories. This strategic decision significantly altered the system's weed identification process, as it was now required to encompass the diverse characteristics exhibited by both small and large weeds. To ensure comprehensive weed identification capabilities, the system needed to accurately recognize all weed variations, considering the substantial variations in their attributes and appearances. By opting for a unified weed class, we aimed to enhance the model's overall performance, alleviating potential biases and inconsistencies arising from imbalanced training data. However, while this would offer a more generalized dataset, to attain accurate results, far more data would be needed to account for the increased generalization.

### 3.3 Labeled Data Organization

For the images taken as data, we created two categories: 10m images and 15m images. Each was categorized based on the altitude the drone used to take photos was at. For images before 2022, the parameters that were set are unknown except for F stop. For 2023, images were taken in F/18, with a shutter speed of 200, and the lowest ISO (auto). Choosing F/18, or a high aperture would allow more focus throughout the image. The shutter speed is set to 200 to ensure images aren’t blurry as the UAV drone moves in the air. Then ISO is asked to be the lowest, but auto ISO works fine. The drone that was used was the multispectral UAV drone with built-in cameras. Disclaimer for the images is to be wary of the possible inaccuracies as we chose these camera parameters as they would likely create high-quality images, but it isn’t certain if the images taken in real time would still be of same high quality. It is recommended to experiment to see what picked drone to use to test live predictions from the model and see what quality of the images are in. Then try to ensure the next collected batch of data fits the same quality. If it is still uncertain, then likely determine if F/18, 200 SS, and auto ISO is optimal camera parameters.

### 3.4 Labeled Data Resizing

In pursuit of enhancing the precision and efficacy of our model, we conducted additional experiments by training it on labeled datasets with dimensions of 64 x 64 and 32 x 32 pixels. The datasets employed in this particular test were derived from the strawberry and weed categories. While the model demonstrated proficient classification accuracy when processing images of comparable sizes, it exhibited a limitation when attempting to identify individual strawberries or weeds within the images. Instead, the model tended to classify the entire image as either a strawberry or weed, without pinpointing the specific objects present.


## 4. Camera Hardware/Set-up

The camera setup that is being used to see the field and take images of the field is using stereo vision. Stereo vision as in using two raspberry pi cameras and spacing them a meter stick away from each other. The idea of using stereo vision is that it would allow for two things: calculating distance and identifying objects from further things [15]. Then using a jetson nano with the code that manages the calculation of location, distance, networking, Mavlink and other configurations. The code is in the UAV Github. 

List of electronic hardware we used:

- 1 IF750 Drone:
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeoDwgITuwRYIHma_RUS63jTUyA91QWfYIScPZEHklDWS5ejxHKvRAMRLaUoVdV_U3jwSt8ok7dxcNMzKQECWURBL1sBtMQnBGbFDuOFc5rIdXclZHsv2OiIJ8xnCkRe5KaN3aPtbC9hc0BsKK7XDp0ubs?key=pmbbpYBm_OlrzOOyhw60Dw)

- 1 Jetson Nano:
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXejxvjt7yLmcFgyUa_9TuFboy1M4SbZVKq5y58xVuUVRJVhEdITuGQ-E1ZJv6AXwGcUbiJPjaXorIEpUApy5i3xGuAsQvZp3McPicbQ9YcKeq2w6H3xV6Ak5hmJFWAuAzCYhr0sZDky45-NxyVxW60-vXQ?key=pmbbpYBm_OlrzOOyhw60Dw)

- 2 Raspberry pi cameras:
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcV_y-QTqE147xCtCX0L0lFEP1wuWT-vPVwnr6KiMtw6i_otnVfK2Dp7inXuhHDPWTxynVhqfdSrYxWS0D2cvohp4iISdYkIO3SET_F12FoWmFaHuzprTh-eLeO7eYKw8bJMG9E9BV38joutyMMrNwR-0jv?key=pmbbpYBm_OlrzOOyhw60Dw)

- 1 Clearpath A200 Husky (UGV):
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd7yQYJJWKD32cqEI3KFAPieGKddqc3SRFkEJJpFLtY-h1gsb0HYDvB7GMJcSf5cGlkMNbATvI_517Ui6TDzlsLnDyULR0m7-sr_rXRc-vVa2_Ub8xK-G14wAPmlk3z3K068fPYTvAS9u6WmIhS2L8NKo7j?key=pmbbpYBm_OlrzOOyhw60Dw)

- 1 Linksys WiFi 5 Router (AC1900):
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdKjfSH44fIppp9RxpGMR2baf16qRRBrD06AIVeH_haHFw3l4l3MVLxgPrv2TJhIeL6KS9VN7n0vOA7H3zOmXb2NyZ21yh4HBIL_Ik5blRFSgtgQ9B64yCXlBdE_yYgYezgjgxGx8xDLPlmycVIYIddqDkp?key=pmbbpYBm_OlrzOOyhw60Dw)

- 1 Phantom v4 multi-spectral camera:
    

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXca8Vt_NjK0YxNFtzK9P6v6_lSF7cFQsLsJfoK6q2wJn-fltmwUj5knFpyEAybKTzRDTvRzEJXwcIK_Fcb7jfZ9grv_WOfpkT_fR9jeonMH71xhgP4D1yMIg9KzuqG7eaY8X-fzhIl1jv3zEOkzzwl0oOnF?key=pmbbpYBm_OlrzOOyhw60Dw)

**Note**: For data collection we used Phantom v4 multi-spectral drone and IF750 was supposed to be used for experimentation with live object detection.   


## 5. Machine Learning Model

To begin, we used YOLOv5 as our starting spot for our modeling. Refer to [12] to run the YOLOv5 model outside of Roboflow. We chose to start with YOLOv5 to quickly have a prebuilt model to see accuracy. The first iteration that used a dataset of 10m 367 images with a train/test split of: Train: 307 (84%), Validation: 28 (8%), Test: 32 (9%). Note that the images that are chosen at random and is simply hard to make a split as one image may have more labeling compared to another. Refer to [13] for more information on the 80/20 split. data The images were then filtered to ensure annotations/labels in each image for preprocessing. Then for augmentations we added Flip of the images horizontally and vertically. When first implemented with a YOLOv5 model, it simply failed to detect small and large weeds. The assumption that was made that caused this flaw was due to major imbalance of class labels where there is significant more strawberries where only strawberries were the only predicted class label. Also want to note that a new class label was automatically added, background, where the assumption is that its the rest of the image that was not given a bounding box then a classification of that bounding box. As soon as we noticed the small weed and large weed not being predicted, we decided to merge small and large weed into simply weed. 

  

Second iteration that used the new change (combination of weed class labels) and after adding additional labels to the train/set ratio. This iteration used a dataset with same preprocessing and augmentations except the modifications of the classes to merge small and large weed to be classed as weed. The dataset of 10m 453 images with a train/test split of: Train: 376 (83%), Validation: 28 (6%), Test: 49 (11%). Using this dataset, the YOLOv5 class labels were more balanced compared to first iteration. The general information on the dataset before preprocessing and augmentation. 247 (1600x1300) images. 3 class labels: Strawberry, small_weed, large_weed (note that small_weed and large_weed was merged for second iteration). There were 5,732 strawberry labels/bounding boxes, 3,094 small_weed labels, and 2,077 large_weed labels. Results of the 10 epoch, batch 4, YOLOv5 model:

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdT6d4W_MBHak_N98U91No_l-UMs4u2yUeV33bj0utdhZsNGihVW2ZykFcWSV8K9EK7PumdwdnZqXpa_y8Hhi920CvjElh0Y7rhLxNgH79LiGzzrsm1jrrt4Pe7Os_cUc6M8TCmNh3geA3kcadxQFPgOSA?key=pmbbpYBm_OlrzOOyhw60Dw)

For interpretation of these model, refer to [14].

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcDOK0I2BnIzGAPi_xeIQqN6Uycdr_--HYx8WxA3uetS93opoB_KGzYNnyvqBvGFazkgX0ySd_5iwqZ5VrpA-imvMnNOhEdK-H9NMMTKhyA_QpCkJVP0XoJNz3jGfVYPLbQc9JfGBx2sHKAmNk2HJF0CL98?key=pmbbpYBm_OlrzOOyhw60Dw)

_Confusion Matrix of second Iteration YOLOv5 Model_

When running the experiments, we did not want to alter the image size and did not specify that parameter. As there was no parameter stated, YOLOv5 likely went to its default size which is 640x640. Again, this needs to be tested further in YOLOv5 image resizing parameter. Do note that it only allows the length of one dimension.

For the next iterations, we chose to combine the weed labels into one as ‘weed’ to compensate for the imbalance class labels. There are significantly more strawberries compared to the other 2 labels, so combining them makes the new class label ‘weed’ have slightly more labels than strawberries. Moving forward we decided that this would be best for the sake of class balance, but should still attempt to label `small_weed` and `big_weed` in order to have the options of these labels. It is possible to later on combine them in Roboflow. After doing this and several new augmentation, tiles where images are split into 4 to attempt for the model be capable of seeing smaller objects better. The results slightly changed compared to previous iterations. Refer to [12] for more information on how to run YOLOv5 and clearml was used for the logger. 


## 6. Strawberry Field Status    

West side (the two columns closest to the trees) of the spedra farm are not being supplied water and majority of strawberry plants have died in that region. The strawberry fields were planted In June (assumption is early June). 

8. ## UR5 Integration (UGV)
    


### 8.1 MOVEIT Software

The UGV we use is the Husky Robot from Clearpath Robotics. It is equipped with a LIDAR, GPS Modules, and a UR5e arm from Universal Robots for manipulation. To interface with the robot, we use ROS (Robot Operating System). The UR5e arm provides 6 degrees of motion and has the capability to operate with payloads up to 5kg. It is equipped with a RobotIq gripper as a end effector. To operate both the Husky and the UR5e arm, a unifying software is utilized to communicate with both robots. Both the Husky and UR5e arm is compatible with the Robotic Operating System (ROS) which is an open source robotic software that features abstraction allowing users to utilize existing implementations as packages for their robotic applications. In particular for utilizing the UR5e arm, we used a package called MoveIt to interface with simulation and manipulation. 

There are several modules that work together in order to operate the Robotic Arm. 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdjdbgnYfKNDFABfPj5VCZkNWZhRegLOF78kqHejQMm_60Wy_mzv1mTu0Y1vcX5WSkcqASwmN5vXsc_Q7s7MtXXyTRU-gA95ydUn86USEmSnPZ2M1Zn0mUceStVtdMUmmFTo84-rCc8Ep0k65IEXwUp_GFa?key=pmbbpYBm_OlrzOOyhw60Dw)

  

It starts with Environment Perception which utilizes external cameras and sensors to pick out points of interests in the environment. This data is sent to the Motion Planning module which sets up waypoints for the arm to traverse to. In order to ensure the robot arm can go through said waypoints, it goes through a collision checking module to make sure it doesn’t collide with its components and can realistically approach the desired waypoints safely. Trajectory Processing accounts for the physics of the robot arm where it manages the timing, velocity, and acceleration of the robot joints to move to the certain waypoints. Motion Execution is the last module which essentially executes the motion to the physical arm. 

### 8.2 Practice

I suggest doing a few tutorials on ROS to learn how to interface with ROS. In order to use ROS, you will need to us Ubuntu so you can either install it natively on a laptop are utilize a virtual machine. 

When learning ROS, you should be able to get a grasp of how ROS works, how Gazebo works, and how RVIZ works as you will be using these to control the Husky. Before you continue with the steps below it is recommended to follow these tutorials to get you acquainted with the software. 

1. [ROS 1 Crash Course](https://www.youtube.com/watch?v=Qk4vLFhvfbI&list=PLLSegLrePWgIbIrA4iehUQ-impvIXdd9Q)
2. [ROS EDX Course](https://learning.edx.org/course/course-v1:DelftX+ROS1x+1T2023/home) 
	1. I suggest mainly focusing on week 1, 2, and 4.
<<<<<<< Updated upstream
3. [MOVEIT Tutorials](http://docs.ros.org/en/melodic/api/moveit_tutorials/html/index.html)
=======
3. [MOVEIT Tutorials](https://docs.ros.org/en/melodic/api/moveit_tutorials/html/index.html)
>>>>>>> Stashed changes
  
For these tutorials, use ROS Noetic on Ubuntu 20. You can install Ubuntu natively or on a virtual machine. The steps below showcase how to install and setup a virtual machine and install ubuntu. 

### 8.3 Virtual Machine Setup:

<<<<<<< Updated upstream
Use the following steps to install Ubuntu 20 (when following the tutorials above) and Ubuntu 18 when you are ready to work with the Husky. When using Ubuntu 20, install [ROS Noetic](http://wiki.ros.org/noetic/Installation/Ubuntu). 
=======
Use the following steps to install Ubuntu 20 (when following the tutorials above) and Ubuntu 18 when you are ready to work with the Husky. When using Ubuntu 20, install [ROS Noetic](https://wiki.ros.org/noetic/Installation/Ubuntu). 
>>>>>>> Stashed changes

It is recommended to use [VMware Workstation Player](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html) if you choose to opt the virtual machine route. For our project we are currently using ROS Melodic which will be installed in [Ubuntu 18.04.6 LTS (Bionic Beaver)](https://releases.ubuntu.com/18.04/). Install the desktop image ISO file. After downloading the ISO file and  installing VMWare Workstation make a new virtual machine. You should get a prompt like this. Under Installer disc image file (iso) click on browse and choose the ISO file for Ubuntu 18.04.6. In the image below shows 20.04.6 but make sure you are installing 18.04.6 on your end as we will be using that version of Linux to interface with the Husky Robot. 
  

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcPwCq70FrUVk61oT3Y_pkIf5gmSKR-KOChXPoD3awCOrs4vwOoFaMepUfyELSqVmoebSJOJidutOUJJJX_WlYzxz0WVRvTK8LCk5LH3X9wYT0R4kjz1hfTBd5FP_wS71ftOHrfkLu3vYixHhCfhM98p9dn?key=pmbbpYBm_OlrzOOyhw60Dw)


Continue with the next steps by putting a username and password and you should eventually be led to this prompt.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcRAXW3q43hFmD0jp116qW6yY1cjoFRhdj7_VpRwoO37l4HOSZsGiJzhBiRvueWclrt-W_nsEyBhrv8txDXawMWCzFQDv6gb0QknCxcJfQ9oFg6X2owJIq3-Hdm_TI7cX6GlsIUQ5jzrtv8pLShYNZcNVA?key=pmbbpYBm_OlrzOOyhw60Dw)

  

Click on customize hardware. Select 16gb of ram and change the number of cores to 6. 

<<<<<<< Updated upstream
Once the virtual machine is setup with Ubuntu 18 installed, you are now ready to install ROS. As mentioned before you will be installing [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu). Follow the steps for ROS installation and make sure you select full desktop installation. In section 1.5 for environment setup, proceed with the first prompt that includes .bashrc. 
=======
Once the virtual machine is setup with Ubuntu 18 installed, you are now ready to install ROS. As mentioned before you will be installing [ROS melodic](https://wiki.ros.org/melodic/Installation/Ubuntu). Follow the steps for ROS installation and make sure you select full desktop installation. In section 1.5 for environment setup, proceed with the first prompt that includes .bashrc. 
>>>>>>> Stashed changes

### 8.4 Husky Setup

For reference: [https://www.clearpathrobotics.com/assets/guides/melodic/ur/ur_e_setup/ros.html](https://www.clearpathrobotics.com/assets/guides/melodic/ur/ur_e_setup/ros.html)

Once you are ready to work with the Husky and you have Ubuntu 18 and ROS Melodic installed, we can proceed with setting up the Husky.

Step 1: Create your catkin workspace (catkin_ws)

```bash
source /opt/ros/melodic/setup.bash

mkdir -p $HOME/catkin_ws/src

cd $HOME/catkin_ws

catkin_init_workspace src
```

Step 2: Install the driver and husky description files
```bash
cd $HOME/catkin_ws/src

git clone https://github.com/UniversalRobots/Universal_Robots_ROS_Driver.git src/Universal_Robots_ROS_Driver.git

git clone -b calibration_devel https://github.com/fmauch/universal_robot.git src/fmauch_universal_robot.git

git clone -b melodic-devel https://github.com/husky/husky_manipulation.git
```

Step 3:
```bash
cd $HOME/catkin_ws

rosdep install --from-paths src --ignore-src -r -y

sudo apt install ros-melodic-ur-description

catkin_make
```

Step 4: Export the UR5 on the Husky
```bash
source ~/catkin_ws/devel/setup.bash

export HUSKY_URDF_EXTRAS=$(catkin_find husky_ur_description urdf/husky_ur5_description.urdf.xacro --first-only)
```
**Note:** whenever you open a new terminal window, you run these 2 commands. 

Step 5: Check if the Husky is loaded up on RVIZ with the ur5 arm

```bash
roslaunch husky_viz view_model.launch
```

You should get something like the image below

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcjprMdBQWNizO3vb3ye_WKgtlEGZN9Nn_VEIMaZX3_Mv-UKDWF6AVLvaTbdVP_4_tX4JGlJHjYDIQqkUO2UeUhkkg240l9XiHsucZ7mKWM_5XEk2-rhB2pR0Mf-doGLg6yKaQAaHqNpeCOdWwUBsewXy0?key=pmbbpYBm_OlrzOOyhw60Dw)

For now every time you want to run (roslaunch husky_viz view_model.launch) make sure you run the EXPORT command to attach the arm to the Husky Robot.

Step 6: Create a Motion Planning Package

Using the Moveit Setup Assistant, we can load up our Husky/Arm Configuration and be able to create predefined positions to call upon. In order to this start a new terminal. In your catkin workspace, cd into the src folder in the terminal. Then run this command:

  
```
rosrun husky_ur_moveit_config customize_moveit.sh <new_package_name>
```

Replace <new_package_name> with a name of your choice. Then run this command:

  

```
roslaunch  <new_package_name>  setup_assistant.launch
```

Click on edit existing moveit configuration package and then click load files. In self collisions put sampling density all the way to high. 


The next tab is Robot Poses. This is where you can give predefined poses. There should be an existing pose called stow which is the starting/rest position of the arm on the actual Husky Robot in the lab. In passive joints, make sure anything that isn’t the actual arm is selected. These passive joints are what Moveit will not worry about. 

After that click on Configuration Files. A warning like this might appear. 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeYbPg7D4bwWWPmwhm2qFWemBZX-saf3dc5V279ETN00YBtSPw2jk_fYw3Owayci5KMzX00RYBQI03Ml_r5MzeELC08_yQqP53qnFsQ587KNqj0e7SqQEGMHVIfJaqyqOLNXCHnF85dfSj2OjeTTyMdCEZr?key=pmbbpYBm_OlrzOOyhw60Dw)


This is safe to ignore and click okay. Afterwards make sure the following is checked only.

- Config/
    
- Launch/
    
- config/Husky.srdf
    

  

Click on Generate package and close the wizard. 

  

Step 7: Enable Motion Planning 

Open a new terminal and run the following command. 

```
roslaunch <new workspace name>  husky_ur_moveit_planning_execution.launch
```

  

Step 8: Enable 

Right click on the RVIZ menu and enable motion planning

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfep47uB4ECeHuaesjnKBcnLDnUUbc4jRSEEa0g0ktHO9e7i5gmEewJvSFRDf_7heiNygSaZKH3on0tzpw30orn-MLURycCDCFkaU3w9FYazJMRMdHMvMw16m05SDx-Mcl8pz2U194_YeVGG3-2m6wC85eR?key=pmbbpYBm_OlrzOOyhw60Dw)

Click on Motion Planning

## 9. Future Work

Data collection is a large contribution that still needs to be made. Based on discussion, we believe its optimal to data collect as soon as the strawberries are apparent. Currently the current data collected is not enough to be confident to make a highly-accurate model as we do not have over 1000 images annotated. With this in mind, a lot of thought and focus needs to be put into creating a dataset that would allow for the project to move forward. It is suggested to make a dataset that is high quality, consistent camera parameters (F/18, 200 SS, Auto ISO), and high resolution. Having the high resolution would be best for future use as it allows for experimentation with larger resolutions that newer models maybe able to process efficiently than what is currently possible. The dataset should be good for this project and allow other future projects that might be built off the dataset. Due note other environmental factors, such as time and field conditions. Collecting images in the morning and afternoon is optimal and noting any noticeable things on field conditions. 15m images that were annotated were not experimented with as the data did not seem substantial enough to start doing modeling on.

  


##  References

- [1] FAO. 2017. The future of food and agriculture – Trends and challenges. Rome.
    
- [2] Tebaldi, C., and Lobell, D. B. (2008), Towards probabilistic projections of climate change impacts on global crop yields, Geophys. Res. Lett., 35, L08705, doi:[10.1029/2008GL033423](https://doi.org/10.1029/2008GL033423).
    
- [3] Chen Y, Lee WS, Gan H, Peres N, Fraisse C, Zhang Y, He Y. Strawberry Yield Prediction Based on a Deep Neural Network Using High-Resolution Aerial Orthoimages. Remote Sensing. 2019; 11(13):1584. [https://doi.org/10.3390/rs11131584](https://doi.org/10.3390/rs11131584)
    
- [4] Yang Yu, Kailiang Zhang, Li Yang, Dongxing Zhang, Fruit detection for strawberry harvesting robot in non-structural environment based on Mask-RCNN, Computers and Electronics in Agriculture, Volume 163, 2019, 104846, ISSN 0168-1699, [https://doi.org/10.1016/j.compag.2019.06.001](https://doi.org/10.1016/j.compag.2019.06.001).
    
- [5]Kirk R, Cielniak G, Mangan M. L*a*b*Fruits: A Rapid and Robust Outdoor Fruit Detection System Combining Bio-Inspired Features with One-Stage Deep Learning Networks. Sensors. 2020; 20(1):275. [https://doi.org/10.3390/s20010275](https://doi.org/10.3390/s20010275)
    
- [6] Tang Y, Chen M, Wang C, Luo L, Li J, Lian G and Zou X (2020) Recognition and Localization Methods for Vision-Based Fruit Picking Robots: A Review. Front. Plant Sci. 11:510. doi: 10.3389/fpls.2020.00510
    
- [7] Pauline Ong, Kiat Soon Teo, Chee Kiong Sia, UAV-based weed detection in Chinese cabbage using deep learning, Smart Agricultural Technology, Volume 4, 2023, 100181, ISSN 2772-3755, [https://doi.org/10.1016/j.atech.2023.100181](https://doi.org/10.1016/j.atech.2023.100181).
    
- [8] Yangkai Zhang, Mengke Wang, Danlei Zhao, Chunye Liu, Zhengguang Liu, Early weed identification based on deep learning: A review, Smart Agricultural Technology, Volume 3, 2023, 100123, ISSN 2772-3755, [https://doi.org/10.1016/j.atech.2022.100123](https://doi.org/10.1016/j.atech.2022.100123).
    
- [9] Foley JA. Can we feed the world & sustain the planet? Sci Am. 2011 Nov;305(5):60-5. doi: 10.1038/scientificamerican1111-60. PMID: 22125864.
    
- [10] Foley, Jonathan & Ramankutty, Navin & Brauman, Kate & Cassidy, Emily & Gerber, James & Johnston, Matt & Mueller, Nathaniel & O'Connell, Christine & Ray, Deepak & West, Paul & Balzer, Christian & Bennett, Elena & Carpenter, Stephen & Hill, Jason & Monfreda, Chad & Polasky, Stephen & Rockström, Johan & Sheehan, John & Siebert, Stefan & Zaks, David. (2011). Solutions for a Cultivated Planet. Nature. 478. 337-342. 10.1038/nature10452. 
    
- [11] Oerke, E.-C & Dehne, H.-W. (2004). Safeguarding production—losses in major crops and the role of crop protection. Crop Protection. 23. 275-285. 10.1016/j.cropro.2003.10.001. 
    
- [12] [https://colab.research.google.com/github/ultralytics/yolov5/blob/master/tutorial.ipynb](https://colab.research.google.com/github/ultralytics/yolov5/blob/master/tutorial.ipynb)
    
- [13] [https://towardsdatascience.com/finally-why-we-use-an-80-20-split-for-training-and-test-data-plus-an-alternative-method-oh-yes-edc77e96295d](https://towardsdatascience.com/finally-why-we-use-an-80-20-split-for-training-and-test-data-plus-an-alternative-method-oh-yes-edc77e96295d)
    

- https://blog.roboflow.com/train-test-split/
    

- [14] [https://towardsdatascience.com/confusion-matrix-for-your-multi-class-machine-learning-model-ff9aa3bf7826](https://towardsdatascience.com/confusion-matrix-for-your-multi-class-machine-learning-model-ff9aa3bf7826)
    
- [15] https://www.mathworks.com/discovery/stereo-vision.html
