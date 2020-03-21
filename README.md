# Distributed Router Sim

This Web App simulates a distributed router network to easily demonstrate routing algorithms. Say goodbye to unweildy chalkboard presentations.

Check out the current version: https://thawing-crag-42208.herokuapp.com/

![Alt text](readmeFiles/overview.png?raw=true "Title")

## Features

The app consists of a menu and router sandbox. 

### Sandbox 
In the router sandbox, create any network to simulate.

click and drag to move nodes

<div style="text-align:center"><img src="readmeFiles/moveDemo.gif?raw=true" /></div>

click without dragging to open and close routing tables

![Alt text](readmeFiles/tableDemo.gif?raw=true "Title")

click on the link delay to edit. These changes instantly appear in routing tables of neighboring nodes.

![Alt text](readmeFiles/linkDemo.gif?raw=true "Title")


### Menu 

The menu contains a number of buttons to interact with the routers and a table showing the order in which routers will send messages. 



add Node and remove node

add link remove link

kill node revive node

kill link revive link

show all/ hide all

The messaging order list allows users to edit the order in which nodes send updates can be rearranged. the current index will always stay the same, but different nodes can be chosen to send at that index.

the buttons under hte messaging order send different number of packets. send One sends a single packet, moving down the messaging order. Send all goes through one whole loop of the messageing order. Steady loops through the messaging order sufficently for all nodes to see all other nodes.

## Usage

run on simple default example

## Going Forward

This prototype contains all projected functionality with improvements to be made based on user feedback.

While all features have been tested, interaction between features may still cause bugs.



the final deliverable will be similar to the current product, with functionality and user interfacing better calibrated to user needs

Going forward, the web app will be improved based on user feedback and bug fixes
