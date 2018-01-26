from django.db import models

class UserCities(models.Model):
	city_name = models.CharField(max_length=100)
	time_added = models.DateTimeField(auto_now_add=True)
