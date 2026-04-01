from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Chercheur, Domaine
from .serializers import ChercheurSerializer, DomaineSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Lister tous les chercheurs",
        description="Retourne la liste de tous les chercheurs enregistrés.",
        tags=["Chercheurs"],
    ),
    create=extend_schema(
        summary="Créer un chercheur",
        description="Enregistre un nouveau chercheur avec son nom, email et domaine.",
        tags=["Chercheurs"],
    ),
    retrieve=extend_schema(
        summary="Détail d'un chercheur",
        description="Retourne les informations d'un chercheur par son ID.",
        tags=["Chercheurs"],
    ),
    update=extend_schema(
        summary="Modifier un chercheur (remplacement complet)",
        tags=["Chercheurs"],
    ),
    partial_update=extend_schema(
        summary="Modifier un chercheur (partiel)",
        tags=["Chercheurs"],
    ),
    destroy=extend_schema(
        summary="Supprimer un chercheur",
        tags=["Chercheurs"],
    ),
)
class ChercheurViewSet(viewsets.ModelViewSet):
    """ViewSet CRUD pour les chercheurs."""
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Lister tous les domaines de recherche",
        description="Retourne la liste de tous les domaines de recherche.",
        tags=["Domaines"],
    ),
    create=extend_schema(
        summary="Créer un domaine de recherche",
        tags=["Domaines"],
    ),
    retrieve=extend_schema(
        summary="Détail d'un domaine",
        tags=["Domaines"],
    ),
    update=extend_schema(
        summary="Modifier un domaine (remplacement complet)",
        tags=["Domaines"],
    ),
    partial_update=extend_schema(
        summary="Modifier un domaine (partiel)",
        tags=["Domaines"],
    ),
    destroy=extend_schema(
        summary="Supprimer un domaine",
        tags=["Domaines"],
    ),
)
class DomaineViewSet(viewsets.ModelViewSet):
    """ViewSet CRUD pour les domaines de recherche."""
    queryset = Domaine.objects.all()
    serializer_class = DomaineSerializer
