# Consensus

[![Netlify Status](https://api.netlify.com/api/v1/badges/02c7c6bd-d99f-47ee-9758-26a8b738283a/deploy-status)]([https://app.netlify.com/sites/georgeussherportfolio/deploys](https://consensusgpt.netlify.app/))


# What is Consensus?
Do you and your friends ever struggle to decide on what to do on a night out? Have you ever had difficulty organising the perfect activity for your work colleagues? Well, our app 'Consensus' aims to address that.
'Consensus' is a web-app that enables a group of people to vote on their desired criteria for an activity and then let the app pick the final result.

It is a real-time voting app that applies filters based on the outcome of several rounds of voting. The end-result is a single suggestion made by the app. 

🌐Visit: 
https://consensusgpt.netlify.app/

[Video Demonstration](https://www.youtube.com/watch?v=PBnj64zxD_E)

💻Tech-stack:
- React.js
- CSS
- Jest unit tests
- Supabase database
- Netlify: deployment and serverless functions

'Consensus' was created by a team of 6 students from the School of Code as part of the full-stack, 5 week, final project. 

👥The team (github profiles):
- [George Ussher](https://github.com/georgeussher)
 - [Paul Garton](https://github.com/paulg44)
 - [Tahmina Begum](https://github.com/Arghmybeans)
 - [David Huckfield](https://github.com/davidhuckfield)
 - [Mia Downe](https://github.com/Miadowne)
 - [Roberto De Spirito](https://github.com/Roboto-Automo)

❗WIP❗
There are a few key features that I aim to address in this forked repo that we didn't get time to resolve in the 5 weeks we spent creating 'Consensus'.
* Currently the group real-time functionality is handled with http requests and so the aim is to use websockets instead.
* I'd like to convert the voting to a Dot-voting system, with a 1st, 2nd and 3rd choice system to create more balanced outcomes.
* I also aim to use real data instead of the dummy data currently in the database. With this in place the Location filter could then be linked to a geo-location system.

Bug fixes 
* Making sure a user is deleted from the database if they exit the application or the voting session.
* Preventing one device from creating multiple users in a session by deleting the user from the database if they go back to the 'Join Group' page by clicking back in the browser.
* Creating a dynamic bubble chart results page after each round that displays more than just the top 3 results.



