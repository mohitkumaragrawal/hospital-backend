# hospital-backend
Online Hospital Management

Objective and Results
•	This Project allows users to find list of doctors present near their location and book appointment with a doctor of particular specialisation by viewing and comparing their proximity, qualifications, cost and selecting a preferred day, time slot
•	This helps users to gather information and book appointments in any hospital at a single place from their homes
•	This allows the hospital admin staff to add and update its doctors’ timeslots and status of appointment bookings 
•	This allows multiple hospitals and users to collaborate in a single website, with ensuring safety that the admins can access data of their hospital only

Methodology
1)	Users
  a)	Users can create an account by entering their name, email id, password and profile pic
  b)	The password sent by the user is stored as a bcrypt hash along with other credentials in mysql database to provide security. Images are stored in the server using multer library. On successful signup, a verification mail is sent to the user
  c)	In login section, the credentials of the user is verified and on success, a json web token is sent to the frontend and stored in the localstorage of the client system.
  d)	In the mainpage, the user can view the appointments booked by him
  e)	All data fetched from api is passed through a user middleware which verifies the token of the client and checks whether the type of the token is user or not. If success, the next function of the middleware is called else the client is redirected back to the login page
  f)	The user can select a specialisation which will render the list of doctors of the selected speciality sorted by increasing distance from the user location
  g)	Once the user clicks a doctor, the profile of the doctor is displayed. Also his available timeslots during the week can be viewed from which the user can select a preferred timeslot of his choice
  h)	If the max limit of bookings for the particular timeslot is not exceeded, then the user’s booking would be confirmed

2)	Admin
  a)	The admin has the feature to signup and login implemented similar to user authentication
  b)	All data fetched via apis is redirected first to hospital middleware which verifies the token and confirms that it is of type hospital and then ahead
  c)	Admin can add a doctor by providing his name, qualifications, specialisations and profile picture
  d)	The backend feature implements substring matching and renders the name of doctors based on the input provided by the admin
  e)	Admin can also add the available timeslots of the doctor and the maximum number of patients that can book their appointment in the particular timeslot and the number of patients that have booked the particular timeslot till time

Technologies used
  a)	Next JS
  b)	Material UI
  c)	Leaflet
  d)	Node and Express JS
  e)	MySql
  f)	Json Web Token
  g)	Bcrypt
  h)	Multer
  i)	Zod
  
  
  ![image](https://user-images.githubusercontent.com/114980313/232226537-61918f20-0245-43f7-9a32-20ab1eb62aa2.png)
 ![image](https://user-images.githubusercontent.com/114980313/232226739-eeb911a8-c377-499a-9361-9b24c2e8610f.png)
 ![image](https://user-images.githubusercontent.com/114980313/232327216-86ea2b7e-9b0b-44d4-8871-07c17c568e08.png)
![4](https://user-images.githubusercontent.com/114980313/232327397-9781aa09-7e89-4f88-ab15-ee8691809507.jpg)
![5](https://user-images.githubusercontent.com/114980313/232327427-1ec157cb-7cd6-4c0d-bc1f-c6897eb4c9ce.jpg)
![6](https://user-images.githubusercontent.com/114980313/232327435-8b410a70-0e98-4659-b5e3-169ce3e1573e.jpg)






