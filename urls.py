from rest_framework.routers import DefaultRouter
from .views import ResearcherViewSet, DomainViewSet

router = DefaultRouter()
router.register(r'researchers', ResearcherViewSet)
router.register(r'domains', DomainViewSet)

urlpatterns = router.urls
