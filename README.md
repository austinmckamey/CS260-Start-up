# Classic Snake

## Design

Have you ever had the craving to play a game but don't want to boot up something complicated and stressful like Fortnite or League of Legends? Instead, you're in the mood for a classic, old-school game that challenges you, but also brings waves of nostalgia and enjoyment. This class game of snake is for you. With a secure login, you can store your personal high score as well as see how you compare with everyone else around the world. Compete against your friends or yourself to get a personal record, ot just play a casual game to relax.

<img width="300" height="300" alt="" src="https://user-images.githubusercontent.com/2433219/94984424-044e0a80-0509-11eb-903a-c114d5b6f061.png">

Key features

- Secure login over HTTPS
- Ability to play game
- Display of high scores according to username
- Ability to restart game after losing
- High scores are persistently stored

IP Address of Server: 3.143.255.215

Command to ssh: ssh -i [key_pair_file] ubuntu@3.143.255.215

Domain: https://snake-eats-apple.click/

I want to add music and sound effects, need this!!
<audio controls loop src="https://github.com/webprogramming260/.github/blob/main/profile/html/media/htmlAudio.mp3?raw=true"></audio>

Optionally add a howto video just for fun.
<video controls width="300"> <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /></video>

CSS stuff

- animations!!

Flex is the best, everything will be responsive to mobile view. Mobile view is not implemented yet.

Look into bootstrap for everything, replace buttons and input stuff.

CSS is already mostly implemented, but look into color schemes more.

Focus on storytelling through design.

Do not forget to implement a light mode in settings. Hotdog stand is an option...

JavaScript stuff
- handle errors correctly
- see if there's anywhere a rest or spread can work

```
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```
  
^ Remove method, body, and headers for simple fetch call.

Steps to change to service:
- move everything into public folder aside from README, deployFiles, & gitignore
- npm init and npm install express
- create index.js file
- add code for endpoints
- add functions to other js files

Database:
- ssh into prod server
- change environment variables
- restart pm2

Authentication:
- add credentials to database
- hash password!!
- store cookie for authenticated user
- secure, httpOnly, sameSite
- endpoints design

WebSocket:
- create "new WebSocket('IP');
- socket.send();
- socket.onmessage = () => {}
- don't forget to import WebSocket

React:
- child and parent components are reactive to each other

Conver to React steps:
- Reorganize files
- Create template React application. Run npx create-react-app template-react. This creates a new directory named template-react that contains the basic - - configuration and template React application code.
- Clean up template code
- Uninstall and NPM packages you won't use (e.g. stats, test)
- Delete the unnecessary create-react-app files (e.g. images)
- Rename js JSX files have jsx extension
- Update manifest.json to represent Startup
- Move template files to Startup
- Populate App.jsx
- Create view components
- Create the router
- Convert to React components
- Convert to React Bootstrap
- Set up to debug
- Refactor play.jsx into snakeGame.jsx, snakeButton.jsx, and players.jsx
- Refactor components to take advantage of React specific functionality and to create sub-components
- Move webSocket code from play.jsx to gameNotifier.js

Sound Voices:
- Christoper Lee
- Patrick Star
- SpongeBob SquarePants
- Papa Smurf
- Morgan Freeman
- Mario
