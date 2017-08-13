from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),

    url(r'^api/product/(?P<pk>\d+)$', views.ProductDetails.as_view(), name='product_api'),

    url(r'^api/review/create$', views.CreateReview.as_view(), name='create_review_api'),

    # two URLs for the same view to allow for the optional "limit" parameter
    url(r'^api/product/best?$', views.BestProducts.as_view(), name='best_products_api'),
    url(r'^api/product/best/(?P<limit>\d+)$', views.BestProducts.as_view(), name='best_products_api'),

    # two URLs for the same view to allow for the optional "limit" parameter
    url(r'^api/product/recent?$', views.RecentProducts.as_view(), name='recent_products_api'),
    url(r'^api/product/recent/(?P<limit>\d+)$', views.RecentProducts.as_view(), name='recent_products_api'),

    # two URLs for the same view to allow for the optional "order_by" parameter
    url(r'^api/reviews/(?P<product_id>\d+)$', views.Reviews.as_view(), name='reviews_api'),
    url(r'^api/reviews/(?P<product_id>\d+)/(?P<order_by>\d+)$', views.Reviews.as_view(), name='reviews_api')
]
