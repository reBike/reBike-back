from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('rebikeuser.urls')),
    path('trashs/', include('rebiketrash.urls')),
]
