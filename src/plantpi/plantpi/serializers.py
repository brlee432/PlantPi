from rest_framework import serializers

from plantpi.models import PlantData


class PlantDataSerializer(serializers.ModelSerializer):
	class Meta:
		model = PlantData
		fields = 'id', 'plant_name', 'has_water', 'time_last_watered'