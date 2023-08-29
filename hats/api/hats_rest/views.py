from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat


# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "shelf_number",
        "section_number",
]



class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "hat"
    ]
