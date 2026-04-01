from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet

router = DefaultRouter()
router.register(r'', PublicationViewSet)

urlpatterns = router.urls