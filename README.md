# Decentralized Wave Portal 👋🏽

Today was a great day!! I finally finished my first fully functional decentralized app, thanks to [Buildspace](https://buildspace.so)! I'm super proud of this project. I think this is my favorite thing I've ever built ever 😁🤩

As usual, I ran into a few snags, but with some help from [the Buildspace community](https://discord.com/invite/vPmqZqgpsS) on Discord (thank you!) I was able to finish in under 1 week.

Here's the final result. I've really been digging gradients lately, they seem to be all the rage 💅🏽

![Wave Portal (Landing Page)](/readme/wave-portal-01.png)  

![Wave Portal (Message Board)](/readme/wave-portal-02.png)  

# Tech Stack

* HTML, CSS, JavaScript, JSX, Solidity
* ReactJS (using my new [React Starter](https://github.com/chiarawilden/react-starter) 😏)
* Hardhat
* EthersJS
* Alchemy
* Nginx

# How to Navigate this Dapp

This project is organized into two folders. ```client``` which contains the React frontend and ```contract``` which contains a Hardhat project, initialized with ```npx hardhat```.

The ```client``` is very simple. The root contains all the usual suspects – ```webpack.config.js``` (I learned a thing or two about Babel from this project...) ```package.json```, ```src``` and ```public```. 

```index.html``` lives inside of ```public```. ```src``` contains three JSX components, organized into their own subfolders with accompanying CSS.

```utils``` is where the magic happens ✨ This folder contains a file called ```WavePortal.json``` which houses the ABI for our smart contract, located in ```contract```.

Our ```contract``` folder is surprisingly bare. At the root we have a ```package.json``` and ```hardhat.config.js``` in addition to two folders – one for our ```scripts``` and one for our ```contracts```. The ```contracts``` folder contains the sole smart contract used to configure this app, ```WavePortal.sol```. The ```scripts``` folder contains one ```run.js``` and one ```deploy.js``` script.

It's actually not as complex as I thought it would be to deploy a decentralized app! The frontend hooks right into our smart contract with just a few lines of EthersJS and our ABI.

# Challenges

My biggest challenge was solving a MAJOR performance issue I had on the frontend, once I'd finally finished the UI. (I was so excited to deploy...5 hours later...) After learning a bit about how to use the React Profiler in Google Chrome, I was able to determine that the issue had to do with one of my ```useEffect``` hooks.

My hook was causing an infinite render loop 🙈 Thanks to [this article](https://devtrium.com/posts/async-functions-useeffect) from Devtrium, I learned how to implement ```useCallback``` with an async function to stop the incessant rerendering 😅

# Room for Improvement

I'd love to add reply functionality. That would be fun!

# Live Demo

[View a live demo here](https://portfolio.chiarawilden.com/wave-portal). (And don't forget to leave me a message ☺️)



