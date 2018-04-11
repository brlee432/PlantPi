from django.db import models

class PlantData(models.Model):
	plant_name = models.CharField(max_length=50)
	has_water = models.NullBooleanField()
	time_last_watered = models.DateTimeField(auto_now_add=True)
