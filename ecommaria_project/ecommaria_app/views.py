from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

from .vision import detect_labels

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_social_oauth2.authentication import SocialAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


class ProductView(viewsets.ModelViewSet, APIView):
    authentication_classes = [SocialAuthentication, SessionAuthentication, BasicAuthentication, ]
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser,]
    filterset_fields = ('categories', )

    def create(self, request, format=None):
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            print("SERIALIZER DATA: ", serializer.data)
            detect_labels(serializer.data)            
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        print(request.user)
        return Response(content)

    

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryView(viewsets.ModelViewSet):
    filterset_fields = ('products', )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

