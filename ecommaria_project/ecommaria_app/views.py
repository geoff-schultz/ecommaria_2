from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_social_oauth2.authentication import SocialAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

class ProductView(viewsets.ModelViewSet, APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, SocialAuthentication]
    permission_classes = [IsAuthenticated]

    # def get(self, request, format=None):
    #     content = {
    #         'user': unicode(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': unicode(request.auth),  # None
    #     }
    #     return Response(content)

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer