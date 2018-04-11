from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


from plantpi.serializers import PlantDataSerializer

from plantpi.models import PlantData

def index(request):
	return render(request, 'plantpi/home.html')

class PlantpiView(APIView):
	def get(self, request):
		moistureData = PlantData.objects.all()
		serializer = PlantDataSerializer(moistureData, many=True)
		return Response(serializer.data)