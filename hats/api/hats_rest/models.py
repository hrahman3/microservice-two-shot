from django.db import models
from django.urls import reverse

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
    image_url = models.URLField(max_length=200)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.color} {self.style_name}"

    def get_api_url(self):
        return reverse("api_hat_detail", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("style_name", "fabric", "color", "image_url", "location")
