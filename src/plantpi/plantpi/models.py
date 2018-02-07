from django.db import models

class PlantMoisture(models.Model):
	plant_name = models.CharField(max_length=50)
	moisture_voltage = models.IntegerField()
	time_measured = models.DateTimeField(auto_now_add=True)