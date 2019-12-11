from rest_framework import serializers
from .models import Product, Category

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'url', 'name', 'description', 'price', 'categories', 'created_at', 'updated_at')
    
    
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'url', 'name', 'products', 'created_at', 'updated_at')

