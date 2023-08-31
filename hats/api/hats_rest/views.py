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
        "image_url",
        "style_name",
        "color",
        "fabric",
        "location",
        "id",
        ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}



class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "image_url",
        "style_name",
        "color",
        "fabric",
        "location",
        "id",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_hat_list(request, location_vo_id=None):
    if request.method =="GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,

        )
    else:
        content = json.loads(request.body)

        try:
            location_id = content["location"]
            location = LocationVO.objects.get(id=location_id)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_hat_detail(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            {"hat": hat},
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
