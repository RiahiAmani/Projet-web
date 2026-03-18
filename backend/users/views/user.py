from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics  # ✅ AJOUT ICI

from users.models.user import User
from users.serializers.user import UserSerializer, RegisterSerializer
from users.permissions import IsAdmin
from users.models.Auditlog import AuditLog

# CRUD utilisateurs (Admin seulement)
class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        user = serializer.save()
        AuditLog.objects.create(user=self.request.user, action=f"Created user {user.username}")

    def perform_update(self, serializer):
        user = serializer.save()
        AuditLog.objects.create(user=self.request.user, action=f"Updated user {user.username}")

    def perform_destroy(self, instance):
        AuditLog.objects.create(user=self.request.user, action=f"Deleted user {instance.username}")
        instance.delete()

# Register (sans token)
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]