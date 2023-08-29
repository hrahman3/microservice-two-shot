from django.urls import path
from .views import api_shoes, api_shoe


urlpatterns= [
    path('shoes/', api_shoes, name="api_shoes"),
    path('shoes/<int:pk>/', api_shoe, name="api_shoe"),
    ]
