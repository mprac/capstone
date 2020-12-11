# FrontPage | Capstone CS50W

FrontPage, CS50W capstone project is developed using Django, a python framework, reactjs a javascript front-end library and bootstrap 4, a mobile responsive CSS framework. FrontPage is a dynamic website used to discuss current events or topics of interest found in one of the articles retrieved via the NewsAPI, an API that is fetched to retrieve headlines based on a selected category, e.g. Business, entertainment, science, etc. Additionally, FrontPage allows users to scrape data from other news sources by pasting the url of the article of interest into the app, the app attempts to extract the website content from the url and parse the content into the required fields. Once a user finds an interesting article, they can save it and start private or public discussions. In a private discussion, the owner of the discussion can accept, deny, or remove member access to the discussion. Discussions commenting system allows users to post, delete and reply to other comments. 

## Sections of website: Overview of each page and react components directory for each page

### Profile page:
The websites profile page gathers all the logged in users activity on FrontPage. Users will be able to find their saved articles, discussions, private discussions they have joined, and see a list of pending requests to join other private discussions. Each section of the profile page offers users functionality such as cancelling pending requests, starting, deleting or leaving discussions. The sections are `<div>’s` with lists where data is mapped to each list item. List items show specific details of the presented item, e.g. a list item for a private discussion will indicate to the user this is a private discussion, show how many members are in the discussion, and show how many comments are in the discussion. For a list item in saved articles section, the user will see how many discussions this article is found in. 

- `./main/src/components/profile`:
  - `CancelRequest.js` - Cancel button to handle cancelling pending request		
  - `ProfileHead.js` - Header of the page where user can edit name
  - `Card.js`	- Where all data is populated into the list item			
  - `CardList.js` - Where data is mapped and passed to `Card.js`		
  - `SavedArticlesButtons.js` - Buttons for saved article section
  - `JoinedDiscussionButtons.js` - Buttons for joined discussion section
  - `UpdateProfile.js` - Handles updating user name when clicking on edit in the profile head
  - `Profile.js` - Main file for profile page to handle requests to and from server	
  - `YourDiscussionsButtons.js` - Buttons for your discussion sections 
  - `ProfileCardHolder.js` - Card holder that separates each section, has `{props.children}` to pass `CardList.js` to from `Profile.js`

### Discover Page (Discussions): 
Discover is a space where users can discover discussions created by other FrontPage users. Users can click on a category and asynchronously retrieve data from the database. Users have the ability to filter down the retrieved discussions by toggling private or public modes and searching discussion titles using the search bar which instantly updates the DOM without reloading the page. 

- `./main/src/components/discussions`:
  - `Discussions.js` - Main file that communicates with server		
  - `DiscussionsSidebarList.js` - Lists the categories to click when retrieving discussions
  - `DiscussionsList.js` - Maps discussions retrieved to `DisccussionsListItem.js`		
  - `FilterDiscussions.js` - The search bar and toggle items to filter discussions
  - `DiscussionsListItem.js` - The retrieved news article show in bootstrap card		
  - `JoinDiscussionButton.js` - Button user can click on to join discussion
  - `DiscussionsSidebar.js` - Maps the categories to `DiscussionSidebarList.js`

### News Page (for all categories):
News dropdown link gives the user a list of categories they can click on, once a user selects a category they will be redirected to see the latest headlines of news retrieved via newsAPI. The retrieved JSON data is then filtered using python to avoid passing empty stings or null values to the app. The data is organized into cards where users can search articles and save them to their profiles to start new private and public discussions.  

- `./main/src/components/news`:
  - `App.js` - Main file which communicates with server	
  - `Card.js` - The card which populates the news 	
  - `CardList.js` - Maps the retrieved news to `Card.js`	
  - `SearchBar.js` - The search bar used to filter news results, user input is passed via state and props to filter() in `CardList.js` 

### Discussion Page:
There are several views for discussion pages, a public discussion offers the same view for all users and a private discussion has two views. Views are rendered according to the state of the react app and a condition identifying whether the logged in user started the discussion. Users can comment, reply to comments, and delete their own comments. Each comment shows a timestamp indicating how long ago the comment was published, e.g. just now, a few seconds ago, 3 days ago. The comments are updated using a time interval which asynchronously fetches new comments to keep the conversation going and give users the feeling of a live feed. In private discussions, the discussion owner can approve or deny pending requests, and delete members.  

- `./main/src/components/discussion`:
  - `AcceptButton.js` - Button to accept user to join, shows in private views in `JoinRequestListItem.js`		
  - `DeleteComment.js` - Delete comment shows on comments for logged in user only	
  - `JoinRequestListItem.js` - Populates user requesting to join and shows accept/reject button
  - `CommentBox.js` - Input field where users can comment		
  - `Discussion.js` - The main file for discussion which communicates with server		
  - `MemberListItem.js` - Populates the list of members and option to delete member 
  - `CommentList.js` - Maps retieved comments to show in `CommentListItem.js`		
  - `DiscussionBody.js` - Body of discussion where comments, members and request lists are found
  - `MembersList.js` - Maps a list of members to `MembersListItem.js`
  - `CommentListItem.js` - The comment item and replies plus functionality to reply
  - `DiscussionHeader.js` - Header of discussion showing title and image plus name of owner member count if private
  - `RejectButton.js` - Button found in `JoinRequestListItem.js` shown in private views
  - `CommentReplyItem.js` - The reply item populated under each comment
  - `JoinRequestList.js` - Maps join requests to `JoinRequestListItem.js` and populates in private views for discussion owner. 

### Create Page: 
Create is one of the more complex features of this website. Users can fetch arbitrary html and the app will attempt to parse this html by looking for metadata which contains the content needed to save an article to the database. I approached this by using open graphs property, which turns out to be common across published articles. I used BeautifulSoup and html.parser to parse the html from the url. Once I had the parsed html I retrieved the content from the required og:tags and saved it into fields which was then converted into a python dictionary and passed back to the user via JSON. The app front-end allows users to edit the title, description and select a category before saving the article. Once an article is saved the user can find it in his/her profile to start private and public discussions.

- `./main/src/components/create`:
  - `Create.js` - Main app which communicates with server	
  - `SetupArticle.js` - Fetched parsed html is populated here 

### Files in main app:

- `./static/css`:
  - `styles.css` - Compiled SCSS is here

- `./static/main`:
  - `main.js` - React app compiled to here

- `./templates`:
  - `base.html` - Template that’s extended to all other html files

- `./templates/main`:
  - `create.html` - React loads Create page to scrape articles url		
  - `discussions.html` - React loads Discover page	
  - `news.html` - React loads retrieved news from newsAPI
  - `discussion.html` - React loads private and public discussions		
  - `index.html` - React loads home page when user is logged out		
  - `profile.html` - React loads user profile page


## Complexity:
### Sourcing and scraping news via metadata:
Sourcing data from around the web and organizing it into one place was one of the challenges I faced while developing FrontPage. Retrieving data from multiple sources did not come with what I had in mind for FrontPage, there were extra attributes the app did not need and it would crash when data was a None type. Using conditional statements I was able to filter through data and select only what would work for FrontPage. The app uses two functions to filter data. One function for NewsAPI (`def prepare_news()` found in `util.py` which is called via `def getNews()` in `views.py`) and one for Scraping articles via urls (`def scrape()` found in `views.py`). The second complex part was how I would combine all of the users data into the profile page and assign each section its own custom functionality within a reactjs app. 

### Organizing user data in profile view:
Since the data was multi dimensional and I needed to assign it to different sections of the same component I approached the backend by creating separate empty lists for each section and combined them all into a final list. In `views.py` using  `def getProfileData()` I would retrieve the data for the specific user using helper methods found in `util.py`, assign the data to separate dictionaries using the convenient Django built in function `dict(zip())` and append the data to the specific list, which is part of a dictionary that combines all lists. Finally the function converts the data to JSON. With the data in JSON as a tree structure I was able to retrieve the first node of each section and assign the JSON to state in react. Once my react state was populated with the data I was able to pass the data to different sections of the profile using state and props. 

### REACT Components usage overview:
FrontPage functionality utilizes REACTs props and state to pass data through the app and manipulate the apps view based on user interaction. Component reusability was a major factor and applied as often as possible to not repeat myself. The buttons folder stores buttons which were reused across the app. The app uses fetch to communicate with python on the server-side to update the database. 

#### The following are a few complex approaches to manipulating views. 

As my component tree became deeper I came across the problem of passing data back up the tree to the main javascript file, the following solution gave me the possibility of reusing components, and reusing functions where possible. 

#### Problem I was facing: How do I send data back up the tree. 
The reason I had to send data back, was to retrieve updated data from the user to the main javascript file in the specified folder to avoid rewriting similar functions. For example, in `src/create` there are 2 files, `Create.js` is the main file and is called in `index.js` to compile. This file communicates directly to server-side. Once an article is scraped and successfully retrieved the `Create.js` scraped state changes from false to true which loads `SetupArticle.js` and populates the retrieved data to react hooks, which act similar to state. A user can then manipulate the retrieved text in the input field, the state is updated for each edited field, for example title input field is updated using `onChange={(e) => setTitle(e.target.value)}`. Once the user is satisfied with changes and clicks the Save Article button I used an onClick event function to pass the current state for the available fields back to `Create.js` using `onClick={() => props.saveArticle(title, description, category)}`. In Create.js I can now retrieve the new data using `saveArticle={(title, description, category) => this.saveArticle(title, description, category)}` and call the `saveArticle()` function which then submits a fetch request to the server and adds the article to the users profile. This approach can be found across the application. 

## Models in main app 

There are 9 models for the apps database. 

1. `Profile` - Used to create a relationship with the User model to assign personal data to a users profile page, this approach allows to grow user functionality with no limits. 
2. `Category` - Holds a list of all categories available to the app. 
3. `Article` - Stores the article content. 
4. `ArticleRelationship` - Is where a relationship is created between user and article to save to their profile. 
5. `Comment` - Stores a comment and creates a relationship with the `Discussion` commented on by the user. 
6. `Reply` - Creates a relationship with the `Comment` which was replied to by the user. 
7. `Discussion` - Creates a new discussion and has a members through relationship with `DiscussionMember`. 
8. `DiscussionMember` - Stores members information and assigns the `Discussion` the member is a member of
9. `DiscussionRequest` - Stores requests to private discussions. 

## Views and util py files
`Views.py` works with `util.py` where `util.py` has reusable functions used along with the `views.py` functions. Since the app is using reactjs. Much of the functions found in views are used with fetch requests from the front-end, this approach allowed me to use fetch which is asynchronous and allowed me to manipulate the front-end to avoid page reloads when updating the view. 

- `./main`:
  - `util.py`
  - `views.py`

## Registration Django app folder:
The folder contains 2 subfolders, `templates` and `tmp`. `Templates` has all the necessary custom views to override Djangos built in registration views. For FrontPage, users can sign up for a new account, request a password reset and login/logout. The password reset request is setup using Djangos testing approach where reset emails are stored in `tmp/reset_emails`. 

- `./registration/templates/registration`:
  - `login.html` - Login page			
  - `password_reset_done.html` - Confirms email to reset password was sent
  - `password_reset_complete.html` - Confirms password was reset successfully 	
  - `password_reset_form.html` - User enters email to retrieve email with password reset link
  - `password_reset_confirm.html` - User enters new password

- `./registration/templates/signup`:
  - `signup.html` - User sign up to FrontPage

- `./registration/tmp/reset_emails`: - Folder that stores email examples sent to user with password reset link


#### Installation
1. Install project dependencies by running `pip install -r requirements.txt` 
2. Make and apply migrations by running `python manage.py makemigrations` and `python manage.py migrate`
3. Create a superuser by running `python manage.py createsuperuser`
4. Visit http://127.0.0.1:8000/admin and assign super user a profile if you want to use app with superuser account
5. Visit http://127.0.0.1:8000/admin click on Categorys and save all categories in app to database for app to work

