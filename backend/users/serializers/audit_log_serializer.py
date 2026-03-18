from rest_framework import serializers
from users.models.Auditlog import AuditLog

class AuditLogSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action', 'timestamp']