# Conway's Game Of Life

## How To Run The API
1. Run `npm install`
2. To start the API run `npm start`, it will start a server on port 3000. 
3. You can open the index.html file in your browser, or you can run it on a separate server via `http-server ./` in a new terminal window and it will start a server on port 8080.

## My First Iteration

In my first iteration I just did a brute force check of the entire board, after which I quickly realized that it would run 8 * M * N calculations for each iteration, most of which are duplicated and some of which are out of bounds. So I decided to find a better solution.

## Second Iteration

In my second iteration I tried boxing in the points on the board, and only checking those squares in between. However I noticed when I was running my first iteration that it's common that you get boards where the corners have living nodes and everything in the middle is dead. In those cases, I would be checking the entire board anyways. So I decided to move on to what ended up being my third and final implementation.

## What I Implemented

This is the code that's in `model/gameOfLife.js`. I ended up creating a dictionary of every point in my living cells, initialized to 0, and then adding the 8 points around them (only if they were in bounds, to avoid unncessary checks) to my dictionary with an initial value of 1. We only care to study the living points and the points around them that could potentially come alive, so this approach will make sure we study only the points of interest to us. If we re-encounter a space, increment it's value. Once we've went through all our living points, look through the dictionary for those points who's values would keep it alive, or turn it alive, and those points will be in our API response. 

## About The Front-End

I included jQuery to make the AJAX function work, and I used that to modify the UI as well. I quickly put this front-end together so you could get some random new points and see what the next generation of a set of points are. I'm trying to respect the two hour time limit, so these are quick functions that display the data. In putting together a production UI I'd avoid writing such long functions and attaching values to the window, but for a quick implementation I think such shortcuts are a-ok :-)