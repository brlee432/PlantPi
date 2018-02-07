from rest_framework import serializers

from plantpi.models import PlantMoisture


class PlantMoistureSerializer(serializers.ModelSerializer):
	class Meta:
		model = PlantMoisture
		fields = 'id', 'plant_name', 'moisture_voltage', 'time_measured'