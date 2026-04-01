from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # --- Endpoints métier ---
    path('api/publications/', include('publications.urls')),
    path('api/researchers/', include('researchers.urls')),

    # --- Documentation API ---
    # Schéma OpenAPI 3 brut (JSON/YAML téléchargeable)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI  →  http://localhost:8000/api/docs/
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # ReDoc UI    →  http://localhost:8000/api/redoc/
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)