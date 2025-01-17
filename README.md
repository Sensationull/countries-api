# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [How to run](How-to-run)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage (Done)
- Search for a country using an `input` field (Done)
- Filter countries by region (Done)
- Click on a country to see more detailed information on a separate page (Done)
- Click through to the border countries on the detail page (Done)
- Toggle the color scheme between light and dark mode *(optional)* (Done)

### Screenshot

![Light mode](/assets/images/Light%20Mode.png)
![Dark mode](/assets/images/Dark%20Mode.png)

### Links

- [Github](https://github.com/Sensationull/countries-api)
- [Live Site URL](https://sensationull.github.io/countries-api/)

## My process

I started out by removing the starter code for a React + Vite project and putting in some CSS resets and variables that would control the scaffolding of the layout for the homepage. After scaffolding the layout for the home page and the country cards on both mobile and desktop, I started the JS/TS side of state management. I wrote the initial code for fetching from the [Rest Countries](https://restcountries.com/) API and setting it locally in state.

I had to detour for a bit to setup Prettier and ESlint because coding without it was less than ideal. Format on Save is a god-send for my ability to read the code I write. 

After that, I added some simple error states and implemented dark mode. I decided it would be easier to implement dark mode earlier on rather than later. 

I then turned my attention to the CountryPage component which is when a user selects an individual country for more information. So same deal as the homepage, CSS scaffolding, data retreival, and then final CSS touches

I went back DRYed up some function defs, moved some code around to avoid prop drilling, and changed some data accessing styles to ensure that content didn't overflow on the country cards. 

I came back to refactor the code so that client-side routing could be implemented with React router. 

I was originally unable to figure out how to pull the border country names for a specfic country from the API. As far as I can tell, you can't right now. So to overcome that issue,  I'm doing a comparison of the country alphaCode3 (ie. VEN = Venezuela) given by the API to represent the border countries and the data.json file where all the country objects exist. When a match is found, I place the resulting name into the button. I wrapped the button in a Link component to enable navigation to that country's page. 

Lastly before deploying, I figured out how to do a simple implementation of a page transition via Framer motion. As it currently stands, it's a fade-out/fade-in of the old and new components, but I'd like to play around with it a bit more.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Typescript
- [React Router](https://reactrouter.com/home) 
- [Framer motion](https://motion.dev/)

###  What I learned

1. [Styling a select option](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#:~:text=The%20%3Cselect%3E%20element%20is,WAI%2DARIA%20to%20provide%20semantics.) is actually pretty difficult, and I didn't know that until the end of this project, because I stepped away from styling to finish the core functionality. I ended up deciding to not style the dropdown menu from the select Filter due to time constraints. I may change it to be a ul element later, but not at this moment. I'm trying to not let perfect be the enemy of good.

2. How to setup Prettier & Eslint for a project

3. A way to avoid prop drilling, which I ended up encountering with the Filter component. Rather than use useContext, I lifted up the child component to the CountryContainer component. I think if I'd gone the useContext route, I'd have tied that component to a specific context and it ultimately would've hindered component composition/reusability and that's not a habit I want to get into.

4. First side project with React Router, which was easier to implement than I'd thought. 

###  Continued development

0. The error and loading states for the project could use more love. Ideally a skeleton loader and some well designed "Error here" states. I'm thinking something like a small waving flag animation next to the item either initiating the loading or in place of it...

1. Pagination would be nice for the homepage.

2. I'd really like to have the cards fade in when loading rather than pop in and page transitions when the user selects a specific country. (Done! YAY). Maybe I'll play around with how you transition between the pages in a more interesting way later...

3. I kinda hate the way data accessing looks in this iteration of this project looks. ie:

```tsx

{countryData.data  &&

!countryData.isLoading  &&

!countryData.error  &&

countryData.data.map((country)  => {

const { flags, name, population, region, capital } =  country

return (

<CountryCard

flags={flags}

name={name.common}

population={population}

region={region}

capital={capital}

key={name.common}

showSpecificCountry={showSpecificCountry}

/>

)

})}

```

I'd rather have a consistent way to extract the data so that I only pull off the name of the relevant field and not the object associated with it.

4. I could rethink how state management will work for navigating back to the homepage. Currently, if you've filtered by region and you want to select another country from that region, you'll have to reselect the region or re-enter the search term. Which is toil for the user and not ideal. 

###  Useful resources

- [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect) - This helped me understand a bit more about useEffect.

- [Avoid prop drilling](https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/) - This gave me the idea for lifting up the children into the parent.

##  Author

- Frontend Mentor - [@Sensationull](https://www.frontendmentor.io/profile/Sensationull)

- Github - [@Sensationull](https://github.com/Sensationull)

## How-to-run

1. Clone this repository locally
2. npm install to intall packages
3. npm run dev at the top level of the directory
4. Navigate to localhost:5173 or localhost:5173/countries-api
  *Vite may redirect you automatically, but it might not.