# Distributed Router Sim

This Web App simulates a distributed router network to easily demonstrate routing algorithms. Say goodbye to unweildy chalkboard presentations.

Check out the current version: https://thawing-crag-42208.herokuapp.com/

![Alt text](readmeFiles/overview.png?raw=true "Title")

## Features

The app consists of a menu and router sandbox. 

### Sandbox 
In the router sandbox, move nodes and routing tables to simulate any network.

* __Move Nodes:__ Nodes can be moved around by clicking and dragging. Nodes can overlap but can't be dragged offscreen.

<p align="center"><img src="readmeFiles/moveDemo.gif?raw=true" /></p>
<p align="center">click and drag to move nodes</p>

* __Routing tables:__ Each node has its own routing table toggled by clicking on the node without dragging.

<p align="center"><img src="readmeFiles/tableDemo.gif?raw=true" /></p>
<p align="center">click without dragging to open and close routing tables
</p>

* __Link Delays:__ Each link has its own delay value. Delays can be changed by clicking and are capped at three characters. These changes instantly appear in routing tables of neighboring nodes.

<p align="center"><img src="readmeFiles/linkDemo.gif?raw=true" /></p>
<p align="center">click on the link delay value to edit</p>


### Menu 

The menu contains a number of buttons to interact with the routers and a table showing the order in which routers will send messages. 

### Node Functionality

__Image of top part of menu__

* __Add Node:__ a new node appears in the top left corner. This nodes value is the lowest number not currently taken. this node is added to the end of the messaging order. the number of nodes is capped at 10.

* __Remove Node:__ 

* __Add Link:__

* __Remove Link:__

* __Kill Node:__

* __Revive Node:__

* __Kill Link:__

* __Revive Link:__ Links can only be revived in both nodes are alive

* __Show All/Hide All:__ Shows all routing tables unless all tables are visible, then hides all.

### Messaging

* __Messaging Order:__ This List allows users to edit the order in which nodes send updates can be rearranged. the current index will always stay the same, but different nodes can be chosen to send at that index.

* __Messaging Buttons:__ These buttons under the messaging order simulates the sending of a various number of packets. 

  * __Send One:__ sends a single packet, moving down the messaging order. 

  * __Send All:__ Send all goes through one whole loop of the messageing order. 

  * __Steady:__ Steady loops through the messaging order sufficently for all nodes to see all other nodes.


## Usage

run on simple default example

## Going Forward

This prototype contains all planned functionality. While all features have been tested, feature interactions and corner cases may still cause bugs.

the final product will be similar to the current product, future improvements will be based on user feedback and bug fixes. Functionality and user interfacing will continually be better calibrated to user needs based on feedback.

