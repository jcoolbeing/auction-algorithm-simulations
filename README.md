# auction-algorithm-simulations
This repository is for my 4th year assignment.

Name: Jonathan Board
Supervisor: Ian McLoughlin

My 4th year project is a research based project rather than a traditional one.  I chose to dive deep into the world of auctions and the algorithms that lay underneath them. 
The body of my research is in my dissertation which is located in pdf format in this repo.  Going along with my dissertation I have a auction simulator created using Javascript.  Initialy my plan was to use Javascript for the frontend and Python(Flask) for the backend which I did but due to massive errors and time restraints I took opted to scrapping this.  Never the less I learned alot working with python as well as flask.  Considering that the logic is the primary part to these algorithms Javascript was just fine.

  I started out with simple logic that has a set amount of bidders bid for a set amount of time and the highest bidder ends up being victorious.  I wanted to get as close to replicating real life scenarios so therefore I implemented a value system.  This value system is assigned to the bidder as well as the item and the closer the two values are to one another the higher the bidders desire is to bid.  I also added bidder strategy and styles to the algorithm in order to have the bidders decide on how aggresive they bid how and likely they are to exceed their desired max-bid. The goal was to get as close to real life as I could considering that people are not always rational.

  How to run:
  1. cd into the directory
  2. enter npm start to run the program
  3. set parameters - # of bidders, Starting bid,Bid increments
  4. click start auction (sometimes you need to click start auction twice to set and reset)

Analysis:
While the auction is simulating you are presented with the bidders information (max-bid, bidding style),
bidding status, and the live bidding history.
