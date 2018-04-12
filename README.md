# PlantPi
<p>This is a project that I'm currently working on as of 4.11.2018 and it's really shaping up to be my favorite and best project of my time
as a developer so far. PlantPi is an IOT (internet of things) project I came up with as an idea for my Clemson University Agribusiness
Creative Inquiry this semester. All they wanted for this class was a paper but I thought this would be more fun :)</p>

<p>In short, the idea of this project is to have a Raspberry Pi 3 based touch screen computer that hosts a web application that provides me
with:</p>

  * general weather information relevant to indoor houseplants //COMPLETED as of 4.11.2018
  * the moisture status of each plant in the array of monitored plants (whether each plant is wet or dry) //COMPLETED as of 4.11.2018
  * an email about plant moisture status any time an input change is detected from a particular moisture sensor //COMPLETED as of 4.11.2018
  * the ability to trigger a watering event at the touch of a button in the application //IN PROGRESS as of 4.11.2018
  
<h4>THE HARDWARE</h4>

<p>To elaborate a little more on the machinations of all this, let's start with the hardware. The system I've built currently consists of a
Raspberry Pi 3 with a 16GB microSD card on which the lot of the software resides, alongside the Raspbian OS at the core of it. The Pi is 
hooked up to a 7 inch touch screen display with a resolution of 800x480. I've also got one of those wireless handheld keyboard/mouse 
devices for the sake of input convenience, as I've yet to look deeply into touch integrated keyboard solutions because keyboard input 
is very seldom needed to actually use the application so far. This Pi Touch rig is currently wired into 2 digital moisture sensors which
complete circuits after passing a moisture threshold that I set on each sensor's potentiometer to give an output that the Pi reads as
either HIGH or LOW (more on this later). These sensors are actually fed power from the side rails of a breadboard so as to facilitate the
possible future adaptation of the system on a larger scale.</p>

<h4>THE SOFTWARE</h4>

<p>Now onto the fun part. This project is a fusion of a number of technologies, namely React/Redux/Django(& the REST framework)/MySQL/Apache2.
The way the project works is as follows:</p>

  HOSTING

  The application is currently hosted on an Apache server installed on the Pi itself, and is only accessible from my local network (for the moment).
  
  MOISTURE STATUS

  * A change is detected on a GPIO pin on the Pi that is assigned to a specific moisture sensor and that pin is then read as HIGH or LOW
  * That HIGH or LOW status is then analyzed by the moisture.py script I wrote (found at src/plantpi/plantpi/moisture.py) via the RPiGPIO
    library. 
      * This moisture.py script is actually run as a daemon on startup by crontab so it doesn't actually interfere with commands or other
       requisite processes in the project. The script is quite easy on the Pi's CPU.
  * If input reads HIGH, the same moisture.py script then inserts a 'true' boolean into the 'has_water' column of the data table where the
   plant moisture info is held, and the time this boolean was written to the database in the 'time_last_watered' column of the same table.
  * If it reads LOW, it does the same query, only with a 'false' boolean. This column of the data table does have the ability to take in
   NULL values, thanks to the model configuration I chose in the models.py/serializers.py Django files.
  * The same mechanism that decides which of the above queries to execute within the script then sends an email to a specified address.
   This email contains information about whether the plant is wet or dry.
  * The data in the database is then serialized into a RESTful API via the Django REST framework.
  * This API is then consumed and rendered by the React/Redux frontend of the application, and displayed in aesthetically pleasing fashion.
  * An API request is made by the frontend every 10 seconds, and the payload data is rerendered via the dispatching of a new set of props.
    (This method is a tad extra and could use some streamlining. I'm looking into this.)
  * The code behind the react rendering of the api data for moisture status exists primarily in src/plantpi/reactjs/actions/index.js,
    src/plantpi/reactjs/containers/moisture_graphs.js, src/plantpi/reactjs/components/current_chart.js and a few others that are fairly
    straightforward to find to anyone who has used React/Redux before.

 RELEVANT WEATHER INFORMATION

 * A panel of this application uses the Open Weather Map API to provide me with data on the weather that has implications for my watering
 decisions, as well as for my own general decisions about what to do about the weather for the day
 * The state of the panel is set to where I currently reside via code, but I can click on the search bar and easily search for data in any
 city without writing code.
 * The panel also integrates the google maps API set to the area for which the weather data is being pulled, so as to avoid discrepancies.
For instance, I might think I'm getting data for London, UK when I'm actually getting data for London, Kentucky. The google map eliminates
this ambiguity entirely.
* I've also written code, largely based in src/plantpi/reactjs/weather_list.js that sorts through the API's data payload and shows me a glimpse
of what key elements of weather are going to be like in 3 hours, and what temperature and cloudiness look like over the next five days. If it's
very cloudy for the next 5 days for instance, the plant will need less water than it would if it was going to be clear for the next five days.


WATER NOW (UNDER CONSTRUCTION)

* This feature is under construction.
* The button is already constructed, but the actual hardware and backend code have yet to be laid down.


THE FRONTEND 

So how does all of this look? Is it responsive and pretty? Does it feature sensible UI/UX design? Does it respond to gestures on the right display?
Yes, yes, and yes!

* Pictures coming soon to prove this claim :)
