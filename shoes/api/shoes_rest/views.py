from django.shortcuts import render
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href", "id"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name"]

    def get_extra_data(self, o):
        return {"bin": o.bin.closet_name}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin"
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder = ShoeListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            bin_id = content["bin"]
            bin = BinVO.objects.get(id=bin_id)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
