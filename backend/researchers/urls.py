from rest_framework.routers import DefaultRouter
from .views import ChercheurViewSet, DomaineViewSet

router = DefaultRouter()
router.register(r'chercheurs', ChercheurViewSet)
router.register(r'domaines', DomaineViewSet)

urlpatterns = router.urls