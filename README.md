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
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![Light mode](/assets/images/Light%20Mode.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

I started out by removing the starter code for a React + Vite project and putting in some CSS resets and variables that would control the scaffolding of the layout for the homepage. After scaffolding the layout for the home page and the country cards on both mobile and desktop, I started the JS/TS side of state management. I wrote the initial code for fetching from the [Rest Countries](https://restcountries.com/) API and setting it locally in state.

I had to detour for a bit to setup Prettier and ESlint because coding without it was less than ideal. Format on Save is a god-send for readability. 

After that, I added some simple error states and implemented dark mode. I decided it would be easier to implement dark mode earlier on rather than later. 

I then turned my attention to the <CountryPage/> component which is when a user selects an individual country for more information. So same deal as the homepage, CSS scaffolding, data retreival, and then final CSS touches

Lastly, I went back DRYed up some function defs, moved some code around to avoid prop drilling, and changed some data accessing styles to ensure that content didn't overflow on the country cards. 

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Typescript

### What I learned

1. [Styling a select option](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#:~:text=The%20%3Cselect%3E%20element%20is,WAI%2DARIA%20to%20provide%20semantics.) is actually pretty difficult, and I didn't know that until the end of this project, because I stepped away from styling to finish the core functionality. I ended up deciding to not style the dropdown menu from the <select> Filter due to time constraints. I may change it to be a <ul> element later, but not at this moment. I'm trying to not let perfect be the enemy of good.

2. How to setup Prettier & Eslint for a project

3. A way to avoid prop drilling, which I ended up encountering with the Filter component. Rather than use useContext, I lifted up the child component to the CountryContainer component. I think if I'd gone the useContext route, I'd have tied that component to a specific context and it ultimately would've hindered component composition/reusability and that's not a habit I want to get into. 


### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

1. I didn't use routing to display the pages. That's something that could be useful here, but I haven't gotten around to it yet.

2. Pagination would be nice for the homepage.

3. I'd really like to have the cards fade in when loading rather than pop in and page transitions when the user selects a specific country.

4. I kinda hate the way data accessing looks in this iteration of this project looks. ie:

```tsx
{countryData.data &&
  !countryData.isLoading &&
  !countryData.error &&
  countryData.data.map((country) => {
    const { flags, name, population, region, capital } = country
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

### Useful resources

- [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect) - This helped me understand a bit more about useEffect. 

- [Avoid prop drilling](https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/) - This gave me the idea for lifting up the children into the parent. 

## Author


- Frontend Mentor - [@Sensationull](https://www.frontendmentor.io/profile/Sensationull)
- Github - [@Sensationull](https://github.com/Sensationull)
