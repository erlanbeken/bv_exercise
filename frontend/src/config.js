const CONFIG = {
    product_api_url: {
        'info'   : 'http://localhost:8000/api/product/',
        'best'   : 'http://localhost:8000/api/product/best',
        'recent' : 'http://localhost:8000/api/product/recent'
    },
    review_api_url: {
        'product_reviews': 'http://localhost:8000/api/reviews/',
        'create_review'  : 'http://localhost:8000/api/review/create'
    },
    product_field_captions: {
        name         : 'Name',
        style        : 'Style',
        abv          : 'ABV',
        description  : 'Description',
        brewery_name : 'Brewery',
        ranking      : 'Ranking'
    },
    product_ranking: [1,2,3,4,5],
    review_date_format: "m/d/yy"
}
export default CONFIG