#!/usr/bin/python
import RPi.GPIO as GPIO
import time

def water_plants():
	GPIO.setmode(GPIO.BCM)

	# init list with pin numbers
	pinList = [6, 13, 19, 26]

	# loop through pins and set mode and state to 'high'
	for i in pinList: 
	    GPIO.setup(i, GPIO.OUT) 
	    GPIO.output(i, GPIO.HIGH)

	# time to sleep between operations in the main loop
	SleepTimeL = 5


	# main loop
	try:
	  GPIO.output(6, GPIO.LOW)
	  time.sleep(SleepTimeL); 
	  GPIO.cleanup()
	 
	# End program cleanly with keyboard
	except KeyboardInterrupt:

	  # Reset GPIO settings
	  GPIO.cleanup()