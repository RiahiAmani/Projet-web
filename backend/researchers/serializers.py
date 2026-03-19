from rest_framework import serializers
from .models import Chercheur, Domaine

class DomaineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domaine
        fields = '__all__'


class ChercheurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chercheur
        fields = '__all__'