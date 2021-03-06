# Distributed Router Sim

This Web App simulates a distributed router network to easily demonstrate routing algorithms. Say goodbye to unwieldy chalkboard presentations. 

Created by Michael Hudachek

[Check out the current version](https://thawing-crag-42208.herokuapp.com/)

<p align="center"><img src="readmeFiles/screen.png?raw=true" /></p>

## Features

The app consists of a menu on the left and router sandbox on the right. 

### Sandbox 
In the router sandbox, arrange nodes and links to simulate any network.

* __Move Nodes:__ Nodes can be moved around by clicking and dragging. Nodes can overlap but can't be dragged offscreen.

<p align="center"><img src="readmeFiles/moveNodeDemo.gif?raw=true" /></p>
<p align="center">click and drag to move nodes</p>

* __Routing tables:__ Each node has its own routing table toggled by clicking on the node without dragging. Routing tables show a destination node, the next hop or path to get to that node from this node, and the cost of getting to that node. Displaying next hop or paths can be set in the menu. Routing tables are initialized  with neighboring nodes and update as a node receives packets.

<p align="center"><img src="readmeFiles/openTableDemo.gif?raw=true" /></p>
<p align="center">click without dragging to open and close routing tables
</p>

<p align="center"><img src="readmeFiles/linkPathDemo.gif?raw=true" /></p>
<p align="center">switch between viewing the next hop or entire path
</p>

* __Link Delays:__ Each link has its own delay value. Delays can be changed by clicking and are capped at three characters. These changes instantly appear in connecting nodes' routing tables.

<p align="center"><img src="readmeFiles/editLinkDemo.gif?raw=true" /></p>
<p align="center">click on the link delay value to edit</p>

### Menu 

The menu contains a number of buttons to interact with routers and a table showing the order routers will send messages. 

__Node Interaction:__ The top of the menu interacts with the router sandbox.

<p align="center"><img src="readmeFiles/menuUpper.png?raw=true" /></p>

* __Add Node:__ a new node appears in the top left corner with the lowest value not currently taken. The new node is added to the end of the messaging order. Node count is capped at 8 to keep paths displayable.

* __Remove Node:__ Deletes the next selected node, highlighting nodes on hover when active. The node will disappear from all routing tables and the messaging order list.

* __Add Link:__ Creates a new link with a delay of 10 between the next two selected nodes. Clicking outside of nodes will cancel the process. Creating a link between two already-linked nodes will cause no link to be created. The two newly connected nodes will add their new neighbor to their routing tables.

* __Remove Link:__ Removes the next selected link, highlighting links on hover when active. When deleted, the two newly separated nodes will remove each other from their routing tables. Links may be covered by their delay value, move over the link until it highlights.

* __Kill Node:__ Kills the next selected node, causing it to stop sending messages and loose its routing table. Killed nodes take on a faded color. When a node is killed, all connecting links are killed as well.

* __Revive Node:__ Revives the next selected node if it is dead. This button is only available if any nodes are dead. Reviving a node revives all neighboring links and initializes the routing table with neighbors.

* __Kill Link:__ Kills the next selected link, preventing messages from traveling. Killed links take on a faded color. Delays of dead links can still be edited.

* __Revive Link:__ Revives the next selected link if it is dead. This button is only available if any links are dead. Links can only be revived in both connected nodes are alive.

* __Split Horizon:__ Toggles the split horizon rule. Initially activated. Forces routers to ignore an entry if they are the next hop.

* __Forced Update:__ Toggles the forced update rule. Initially activated. Forces routers to update an entry received from the next hop.

* __Path Vector:__ Toggles the path vector rule. Initially deactivated. Forces routers to ignore an entry if they are a node in the path.

* __Show All/Hide All:__ Shows all routing tables unless all tables are visible, then hides all.

* __Next Hop:__ Toggles showing the next hop to a destination node.

* __Paths:__ Toggles showing the path to a destination node.

__Messaging:__ The bottom of the menu contains messaging simulation functionality.

<p align="center"><img src="readmeFiles/menuLower.png?raw=true" /></p>

* __Messaging Order:__ This list shows the order in which nodes will send packets, with the next node to send a packet highlighted. Nodes can be dragged to edit the messaging order. The highlighted index will always stay the same, but different nodes can be placed in that index.

* __Messaging Buttons:__ These buttons under the messaging order simulate sending a various number of packets. 

  * __Send One:__ Sends a single packet, moving one node down the messaging order. 

  * __Send All:__ Loops through the messaging order once, causing all nodes to send a packet.

  * __Steady:__ Loops through the messaging order enough times to achieve steady state routing tables.

* __More Info:__ Links users to this github. 

## Usage

<p align="center"><b>Add/Remove Node:</b></p>

<p align="center"><img src="readmeFiles/removeNodeDemo.gif?raw=true" /></p>
<p align="center">After selecting Remove Node, click on a node to remove it. Add Node and Add Link can be used to replace the removed node.</p>

<p align="center"><b>Add/Remove Link:</b></p>
<p align="center"><img src="readmeFiles/removeLinkDemo.gif?raw=true" /></p>
<p align="center">After selecting Remove Link, click on a link to remove it. Add Link can be used to replace the removed link.</p>

<p align="center"><b>Kill/Revive Node:</b></p>
<p align="center"><img src="readmeFiles/killNodeDemo.gif?raw=true" /></p>
<p align="center">After selecting Kill Node, click on a node to kill it. Revive Node can be used to revived the killed node.</p>

<p align="center"><b>Kill/Revive Link:</b></p>
<p align="center"><img src="readmeFiles/killLinkDemo.gif?raw=true" /></p>
<p align="center">After selecting Kill Link, click on a link to kill it. Revive Link can be used to revived the killed link.</p>

## Demo
On open, the app is initialized to a small, four node example network. Initially, no packets have been sent and each node's routing table only contains their neighbors. 

<p align="center"><img src="readmeFiles/sendPacketDemo.gif?raw=true" /></p>

Pressing 'Send One' without changing the messaging order, node 0 will send an update to its neighbors. Since node 0 has entries not in its neighbors' tables, they will update their tables with the new routes.

Pressing 'Send One' again, node 1 sends an update to its neighbors. The neighbors again update any new or shorter paths in their routing table. At this point, all nodes have determined the shortest route to all other nodes and any subsequent packets will not cause updates.

## User Survey

After the first prototype, a user survey was conducted (responses can be found in the corresponding folder). Feedback focused on usability and better explaining how the app works to new users. Some changes were implemented based on feedback:
 * A link to the project github was added so users can access documentation
 * Messaging order entries were made narrower to increase usability

<p align="center">
  <img src="readmeFiles/menuBottom.png?raw=true" />
  <img src="readmeFiles/menuLower.png?raw=true" />
</p>
<p align="center">Before (left) and after (right) feedback was implemented</p>

## Host it Yourself

If you don't want to rely on my hosting, host this web app yourself. This project has no database so hosting is relativley easy:
* download the project from github
* run npm install to ensure all modules are functional
* push project to hosting service of your choice (This one uses Heroku)