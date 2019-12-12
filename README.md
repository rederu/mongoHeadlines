
## What is Mongo Headlines?
<center><img src="https://i.imgur.com/sqUtK35.png"</center>

Mongo Headlines (Siliconera Scraper version) is a web app that lets users view and leave comments on the latest news. It is powered by the following dependencies:
<ul>
  <li>Morgan</li>
  <li>Mongoose</li>
  <li>Express</li>
  <li>Express-Handlebars</li>
  <li>Axios</li>
  <li>Cheerio</li>
 </ul>

## How does Mongo Headlines works?

Mongo Headlines works with Cheerio in order to scrap the information from a site in order to add it to the database, powered by mongoDB/Mongoose,  and to display it on the site. 

The site allows the user to scrape new news from the news site in question (in this case is Siliconera, a video games' news portal) by clicking the <b>Scrape New Articles</b> button located in the navigation bar. After that, the news scraped are displayed on the site. Every article displays the title of the news, the summary and, also, it allows the user to go directly to the news by clicking on the title. Also, it allows the user to save the news they are interested in by just clicking on the <b>Save Article</b> button.

All the saved articles can be viewed on the <b> Saved Articles </b> link, located on the navigation bar at the top. From here, the user can delete the saved articles or can add commentaries on them by clicking on the respective buttons. 

When the user wants to add a comment, a modal window will appear that will allow to add a subject and a comment to the selected article. If there is an old comment on the selected article, it also will be displayed on  this modal window.

### Live Demo
[Siliconera Scraper](https://intense-scrubland-30733.herokuapp.com/)
