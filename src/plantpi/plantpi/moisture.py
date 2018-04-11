#!/usr/bin/python

# Start by importing the libraries we want to use


import RPi.GPIO as GPIO # This is the GPIO library we need to use the GPIO pins on the Raspberry Pi
import smtplib # This is the SMTP library we need to send the email notification
import time # This is the time library, we need this so we can use the sleep function
import pymysql

conn = pymysql.connect() # your database keys here

# Define some variables to be used later on in our script

# You might not need the username and password variable, depends if you are using a provider or if you have your raspberry pi setup to send emails
# If you have setup your raspberry pi to send emails, then you will probably want to use 'localhost' for your smtp_host

smtp_username =  # This is the username used to login to your SMTP provider
smtp_password =  # This is the password used to login to your SMTP provider
smtp_host = # This is the host of the SMTP provider
smtp_port =  # This is the port that your SMTP provider uses

smtp_sender =  # This is the FROM email address
smtp_receivers = [] # This is the TO email address

# The next two variables use triple quotes, these allow us to preserve the line breaks in the string. 

# This is the message that will be sent when NO moisture is detected

message_dead = """From: PlantPi <>
Subject: Moisture Sensor Notification

Warning, no moisture detected! Your plant could die soon!
"""

# This is the message that will be sent when moisture IS detected again

message_alive = """From: PlantPi <>
Subject: Moisture Sensor Notification

Panic over! Plant has water again :)
"""

# This defines SQL depending on value read by GPIO channel


# This is our sendEmail function

def sendEmail(smtp_message):
	try:
		smtpObj = smtplib.SMTP(smtp_host, smtp_port)
		smtpObj.ehlo()
		smtpObj.starttls()
		smtpObj.login(smtp_username, smtp_password) # If you don't need to login to your smtp provider, simply remove this line
		smtpObj.sendmail(smtp_sender, smtp_receivers, smtp_message)
		smtpObj.close()      
		print("Successfully sent email")
	except smtplib.SMTPResponseException:
		print("Error: unable to send email")

# This is our callback function, this function will be called every time there is a change on the specified GPIO channel, in this example we are using 17

def callback(channel):
	if channel == 17:
		plant_name = "thyme"
	elif channel == 18:
		plant_name = "peppermint"
	a = conn.cursor()
	wetSQL = 'INSERT INTO `plantpi_plantdata` (`id`, `plant_name`, `has_water`, `time_last_watered`) VALUES (NULL, %s, "1", NOW());'
	drySQL = 'INSERT INTO `plantpi_plantdata` (`id`, `plant_name`, `has_water`, `time_last_watered`) VALUES (NULL, %s, "0", NOW());'
		
	if GPIO.input(channel):
		print("LED off")
		a.execute(drySQL, plant_name)
		conn.commit()
		sendEmail(message_dead)
		
	else:
		print("LED on")
		a.execute(wetSQL, plant_name)
		conn.commit()
		sendEmail(message_alive)

# Set our GPIO numbering to BCM
GPIO.setmode(GPIO.BCM)

# Define the GPIO pin that we have our digital output from our sensor connected to
channel_1 = 17
channel_2 = 18
# Set the GPIO pin to an input
GPIO.setup(channel_1, GPIO.IN)
GPIO.setup(channel_2, GPIO.IN)
# This line tells our script to keep an eye on our gpio pin and let us know when the pin goes HIGH or LOW
GPIO.add_event_detect(channel_1, GPIO.BOTH, bouncetime=1000)
GPIO.add_event_detect(channel_2, GPIO.BOTH, bouncetime=1000)
# This line asigns a function to the GPIO pin so that when the above line tells us there is a change on the pin, run this function
GPIO.add_event_callback(channel_1, callback)
GPIO.add_event_callback(channel_2, callback)

# This is an infinte loop to keep our script running
while True:
	# This line simply tells our script to wait 0.1 of a second, this is so the script doesnt hog all of the CPU
	time.sleep(0.1)