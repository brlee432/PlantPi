from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import subprocess
import os
import importlib

from plantpi.serializers import PlantDataSerializer
from plantpi.models import PlantData
from water_now import water_plants


def index(request):
	return render(request, 'plantpi/home.html')

class PlantpiView(APIView):
	def get(self, request):
		moistureData = PlantData.objects.all()
		serializer = PlantDataSerializer(moistureData, many=True)
		return Response(serializer.data)

def water_now(request):
	if request.method == 'GET':
		water_plants()
		return JsonResponse({'watering': 'true'})