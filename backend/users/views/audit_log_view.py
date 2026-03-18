from rest_framework import viewsets, permissions
from users.models.Auditlog import AuditLog
from users.serializers.audit_log_serializer import AuditLogSerializer
from users.permissions import IsAdmin

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint pour visualiser les logs.
    Admin seulement.
    """
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]