from django.urls import path, include
from users.views.user import RegisterView
from rest_framework.routers import DefaultRouter
from users.views.user import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views.audit_log_view import AuditLogViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)  # CRUD utilisateurs (Admin seulement)
router.register(r'audit-logs', AuditLogViewSet, basename='audit-logs')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),  # <-- en **premier**
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),  # <-- router à la fin
]