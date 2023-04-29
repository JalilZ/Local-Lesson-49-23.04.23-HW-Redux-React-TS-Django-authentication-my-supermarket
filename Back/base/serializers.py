from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    # Serializer classes can also include reusable validators that are applied to the complete set of field data. 
    # These validators are included by declaring them on an inner Meta class, like so:
    class Meta:
        model = Product
        fields = '__all__'
        #fields = ['prod', 'category','desc','price', 'productImage'] # also works
        permissions = [("can_view_mymodel", "Can view MyModel")]