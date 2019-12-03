from django.urls import path, include
from .models import Product, Category
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('product', views.ProductView)
router.register('category', views.CategoryView)

urlpatterns = [
    path('', include(router.urls))
]
