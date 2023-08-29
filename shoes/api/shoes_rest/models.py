from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True, blank=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.manufacturer} {self.model_name}"

    def get_api_url(self):
        return reverse("api_shoe", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("manufacturer", "model_name", "color", "picture_url", "bin")
