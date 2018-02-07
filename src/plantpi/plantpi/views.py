from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


from plantpi.serializers import PlantMoistureSerializer

from plantpi.models import PlantMoisture

def index(request):
	return render(request, 'plantpi/home.html')

class PlantpiView(APIView):
	def get(self, request):
		moistureData = PlantMoisture.objects.all()
		serializer = PlantMoistureSerializer(moistureData, many=True)
		return Response(serializer.data)