try:
    from settings import *
except ImportError:
    pass

MIDDLEWARE.append('rankings.middleware.dev_cors_middleware')