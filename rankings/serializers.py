from rest_framework import serializers
from models import Review, Beer as Product

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Review
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    ranking      = serializers.SerializerMethodField('_ranking')

    def _ranking(self, obj):
        return round(obj.ranking, 2) if obj.ranking else 'N/A'


class ProductDetailsSerializer(ProductSerializer):
    class Meta:
        model  = Product
        fields = model.get_detail_fields()


class ProductListSerializer(ProductSerializer):
    class Meta:
        model  = Product
        fields = model.get_list_fields()