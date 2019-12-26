from rest_framework import serializers
from .models import Product, Category
from drf_extra_fields.fields import Base64ImageField

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ("__all__")

    
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True)
    class Meta:
        model = Category
        fields = ("__all__")

