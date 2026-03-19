from rest_framework import viewsets, filters
from .models import Publication
from .serializers import PublicationSerializer

class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['titre', 'resume', 'doi']