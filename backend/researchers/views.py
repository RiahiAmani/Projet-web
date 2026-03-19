from rest_framework import viewsets
from .models import Chercheur, Domaine
from .serializers import ChercheurSerializer, DomaineSerializer

class ChercheurViewSet(viewsets.ModelViewSet):
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurSerializer


class DomaineViewSet(viewsets.ModelViewSet):
    queryset = Domaine.objects.all()
    serializer_class = DomaineSerializer