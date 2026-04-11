from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Researcher, Domain
from .serializers import ResearcherSerializer, DomainSerializer

class DomainViewSet(viewsets.ModelViewSet):
    queryset            = Domain.objects.all()
    serializer_class    = DomainSerializer
    permission_classes  = [IsAuthenticatedOrReadOnly]
    filter_backends     = [filters.SearchFilter]
    search_fields       = ['name']


class ResearcherViewSet(viewsets.ModelViewSet):
    queryset            = Researcher.objects.prefetch_related('domains').all()
    serializer_class    = ResearcherSerializer
    permission_classes  = [IsAuthenticatedOrReadOnly]
    filter_backends     = [filters.SearchFilter, DjangoFilterBackend]
    search_fields       = ['first_name', 'last_name', 'domains__name']
    filterset_fields    = ['domains']


# Create your views here.
