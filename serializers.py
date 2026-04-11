from rest_framework import serializers
from .models import Researcher, Domain

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Domain
        fields = ['id', 'name', 'description']


class ResearcherSerializer(serializers.ModelSerializer):
    domains = DomainSerializer(many=True, read_only=True)
    domain_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Domain.objects.all(),
        write_only=True, source='domains'
    )

    class Meta:
        model  = Researcher
        fields = ['id', 'first_name', 'last_name',
                  'email', 'bio', 'domains', 'domain_ids', 'created_at']
