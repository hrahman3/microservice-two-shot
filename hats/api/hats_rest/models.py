from django.db import models
# from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)
    shelf_number = models.PositiveIntegerField(blank=True, null=True)
    section_number = models.PositiveIntegerField(blank=True, null=True)





class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    image_url = models.URLField()

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )
