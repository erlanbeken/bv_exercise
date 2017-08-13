# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import generics
from serializers import ReviewSerializer, ProductDetailsSerializer, ProductListSerializer
from models import Review, Beer as Product

import os
from django.conf import settings
from django.http import HttpResponse

from django.views.generic import TemplateView

from django.db.models import Avg, Max, F

from django.shortcuts import render

# number of items shown by default
_default_list_view_limit = 5

# class IndexView(TemplateView):
#     template_name = 'index.html'

class IndexView(TemplateView):
    def get(self, request):
            try:
                with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                    return render(request, "index.html", {'react_app' : f.read()})

            except IOError:
                return HttpResponse(status=501)


class ProductDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductDetailsSerializer
    queryset = Product.objects.annotate(ranking=Avg('reviews__ranking')).all()


class BestProducts(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        limit  = self.kwargs.get('limit', _default_list_view_limit)

        return (Product
            .objects.annotate(ranking=Avg('reviews__ranking'))
            .order_by('-ranking')[:limit])


class RecentProducts(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        limit  = self.kwargs.get('limit', _default_list_view_limit)

        return (Product
            .objects.annotate(
                ranking=Avg('reviews__ranking'),
                recent_review_date=Max('reviews__date',
            ))
            .order_by('-recent_review_date')[:limit])


class Reviews(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id= self.kwargs.get('product_id')
        order_by  = self.kwargs.get('order_by', '-date')

        return (Review
            .objects.filter(product_id=product_id)
            .order_by(order_by))


class CreateReview(generics.CreateAPIView):
    serializer_class = ReviewSerializer
