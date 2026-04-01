from rest_framework import viewsets, filters
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .models import Publication
from .serializers import PublicationSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Lister toutes les publications",
        description=(
            "Retourne la liste complète des publications. "
            "Utilisez le paramètre `search` pour filtrer par titre, résumé ou DOI."
        ),
        parameters=[
            OpenApiParameter(
                name='search',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description="Recherche textuelle sur le titre, le résumé ou le DOI.",
                required=False,
            )
        ],
        tags=["Publications"],
    ),
    create=extend_schema(
        summary="Créer une publication",
        description=(
            "Crée une nouvelle publication. Pour envoyer un fichier PDF, "
            "utilisez `Content-Type: multipart/form-data`."
        ),
        tags=["Publications"],
    ),
    retrieve=extend_schema(
        summary="Détail d'une publication",
        description="Retourne les informations complètes d'une publication par son ID.",
        tags=["Publications"],
    ),
    update=extend_schema(
        summary="Modifier une publication (remplacement complet)",
        description="Remplace entièrement une publication existante (tous les champs requis).",
        tags=["Publications"],
    ),
    partial_update=extend_schema(
        summary="Modifier une publication (partiel)",
        description="Met à jour uniquement les champs fournis d'une publication.",
        tags=["Publications"],
    ),
    destroy=extend_schema(
        summary="Supprimer une publication",
        description="Supprime définitivement une publication par son ID.",
        tags=["Publications"],
    ),
)
class PublicationViewSet(viewsets.ModelViewSet):
    """
    ViewSet CRUD pour les publications scientifiques.

    Supporte l'upload de fichiers PDF via `multipart/form-data`
    et le stockage d'un identifiant DOI.
    """
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['titre', 'resume', 'doi']
