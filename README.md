# R3_UI_Module
### R3 UI/Web Design Training Package

###Screenshots of the program

#### Listening to Port:
![alt text](https://github.com/VincentP05/R3_UI_Module/blob/master/screenshots/screenshot1.png "Listening to Port")

#### First Message Page:
![alt text](https://github.com/VincentP05/R3_UI_Module/blob/master/screenshots/screenshot2.png "First Message Page")

#### History/Log Page:
![alt text](https://github.com/VincentP05/R3_UI_Module/blob/master/screenshots/screenshot3.png "First half")
![alt text](https://github.com/VincentP05/R3_UI_Module/blob/master/screenshots/screenshot4.png "Second half")

####Overview:
For this assignment, the goal was to create a simple web application that sends messages from a backend server to the client side.
Using Node with Express for the backend, and socket.io for real time communication between the server and client. 

####Progession:
For the most part it was a straightforward assignment. First off I began with creating the html pages, and setting up the routes in express for the backend.
Afterwards I set up the sockets with socket.io, with the client side listening to localhost:5050. The backend server sends 50 messages of coordinates, starting at (0,0). 
Each message afterwards is a randomized movement of 1 unique from the previous location. To implement this I created a function that randomizes a few values to determine
whether to move up, down, left, or right. 

####Issues:
I came across a few issues, mainly dealing with states. As I worked on this project using pure JavaScript. One of the issues was that once the first message page was entered,
and the user goes to the history page they are unable to go back. I had implemented a back button, however due to the nature of the first message page taking the time of the
first socket message. This value could not be achieved again, since due to the routing of routes, going back to the first message page no longer displays the time of the first 
message of "hello!". Hence, I removed the back button as I found it redundant. 

####Final Thoughts:
If I were to do this again, I would do it using React with states and hooks to help transition between the pages as well as updating them correctly as new information gets sent
using sockets. 
