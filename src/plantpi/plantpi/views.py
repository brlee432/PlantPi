from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from plantpi.serializers import UserCitiesSerializer
from plantpi.models import UserCities

def index(request):
	return render(request, 'plantpi/home.html')

class PlantpiView(APIView):
	def get(self, request):
		cities = UserCities.objects.all()
		serializer = UserCitiesSerializer(cities, many=True)
		return Response(serializer.data)