from rest_framework import serializers

from plantpi.models import UserCities

class UserCitiesSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserCities
		fields = 'id', 'city_name', 'time_added'