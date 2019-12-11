from django.db import models


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=45)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    imageUrl = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Category(models.Model):
	name = models.CharField(max_length=255)
	products = models.ManyToManyField(Product, related_name="categories")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
