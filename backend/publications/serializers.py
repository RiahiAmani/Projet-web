from rest_framework import serializers
from .models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    """Sérialiseur complet d'une publication scientifique."""

    titre = serializers.CharField(
        help_text="Titre complet de la publication."
    )
    resume = serializers.CharField(
        help_text="Résumé ou abstract de la publication."
    )
    date_publication = serializers.DateField(
        help_text="Date de publication au format YYYY-MM-DD."
    )
    pdf = serializers.FileField(
        required=False,
        allow_null=True,
        help_text="Fichier PDF de la publication (optionnel). Envoyez via multipart/form-data."
    )
    doi = serializers.CharField(
        required=False,
        allow_null=True,
        allow_blank=True,
        help_text="Identifiant DOI de la publication, ex: 10.1000/xyz123 (optionnel)."
    )

    class Meta:
        model = Publication
        fields = '__all__'
