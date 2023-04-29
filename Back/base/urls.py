from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products/', views.ProductModelView.as_view()),
    path('products/<int:id>', views.ProductModelView.as_view()),
    path('login/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),             # Authentication - adding login path
    path('register/', views.register),                                                         # Authentication (register)
]


from django.conf import settings                                                     # IMAGE
from django.conf.urls.static import static                                           # IMAGE 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)         # IMAGE
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)       # IMAGE
