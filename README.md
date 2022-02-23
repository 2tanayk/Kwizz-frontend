# Udemy Coding Challenge 
This repo contains the frontend of [Udemy's Web App Coding Challenge](https://github.com/udemy/coding-challenge) **as well as** the required **documentation** for the overall task.
The API(backend code) has been pushed to this repo : https://github.com/2tanayk/Kwizz-backend

## Problem Statement
The problem statement was to develop a full-stack quiz taking web app which: presents the user with a quiz consisting of fixed no. of MCQs(Multiple Choice Questions) and displays the results after he/she submits it.

## Solution

### Demonstration
https://user-images.githubusercontent.com/60653277/155210559-8cfdc386-3872-47c5-9b64-c26defd0ad6a.mp4

My solution to the challenge is a full stack one.
### Front-End 
- I have split my website into components(function based) as, this is considered to be a good practice in React due to reusability of components (all my components lie in **src/components**).
- My webpages are a function based React component which lie in **src/pages** folder and named the files after the webpage they represent. 
- The folder structure as you can make out from the above points makes it easier to find a particular webpage/component using smart editors like VS Code.
- We can clearly see that we have divided our **website into pages** and **pages into components** rather than nesting everything into a component.Which makes our website more efficient as, a state change means only our affected component re-renders rather than the whole webpage.
- I have used [React styled components](https://www.styled-components.com/), a popular npm package to style many of my components. I have used it because it gives a simple and convenient way creating components with a style, right inside of our Javascript code (CSS-in-JS) with the full power of CSS and we can re-use it wherever we want! 
- Coming to state management I have done it entirely with react hooks like **useState** and **useEffect**. I have also used the **userRef** hook in cases where I wan't a variable values to survive the component re-render like in case of the variable that holds the user answers.One of the significant uses of the **useEffect** was: when passed with no dependencies(**[]**) it serves as **componentWillMount()** callback and here I did the quiz data fetching.
- I have also added custom validation to the quiz which is actually a **Form**, hence a user has to attempt all the questions in order to submit the quiz
- Finally I have also used the Javascript object in places where I needed to access data in **O(1)** (constant) time at the cost of some space(like I have done after I fetched the answers from the server to show the correct and incorrect choices to the user).**This is important as we want to load the answers quickly and not depend on the no. of questions in the quiz**.

### Back-End
- On the backend I have used Django which follows the **MVT** design pattern(I really haven't used any templates as our aim was to build an API for our frontend and not to serve files/data from the django app).
- All the tables in my [SQLite](https://www.sqlite.org/index.html) are represented by a model which resides in the django app's **models.py** file.The API endpoints are exposed via django views, which reside in the **views.py** file (inside the django app) and the api routes are set by the **urls.py** also inside the Django app. Most of the methods inside the views.py file are decorated by a **@api_view()** from the DRF(Djano Rest Framework) because we intend to serialize the output to JSON, which is consumed by our front end.Our serializers are stored in **serializers.py** in the django app.
- The API only allows calls from our frontend and all other origins will be blacklisted because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues. My frontend is white listed because I have explicitly specified so using the [django-cors-headers](https://pypi.org/project/django-cors-headers/) package.Hence our backend is secure.
- A quiz question is represented by a **Question** model which holds a One-to-One relation with **Answer** and **Options** models which represent answers and options respectively. We also have a **SubmittedAnswer** model which represents the answer submitted by the user.
- At 00:09 in the attached video, we can see that I have defined endpoints to fetch all quiz questions, submit answers, see user's submissions, view quiz answers and view the user's scores.
- While serializing the data for the front-end, I have ensured that answers don't end up on the client before the user submits the quiz, by defining different serializers.
- I have also used the concept of nested serializers while sending the quiz questions to the front-end and also while getting answers from it. 




### Tech Stack
As one was allowed to use frameworks, I decided to go with the Udemy's techstack of [Django](https://www.djangoproject.com/) and [React](https://reactjs.org/) (I did not use any state management libraries like Redux,MobX etc. because it seemed to be unnecessary for a small task). <br/>
I also decided to use [DRF(Django Rest Framework)](https://www.django-rest-framework.org/) to build an API out of my backend since it seemed to be really popular and had a lot of backing from the dev. community!


