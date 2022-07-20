from pathlib import Path
from datetime import timedelta

####환경변수 설정
import os
import environ

is_dev = True
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!
# 환경변수 세팅
if is_dev:
    env = environ.Env(DEBUG=(bool, True))
    environ.Env.read_env(
        env_file=os.path.join(BASE_DIR, 'dev.env')
    )
else:
    env = environ.Env(DEBUG=(bool, True))
    environ.Env.read_env(
        env_file=os.path.join(BASE_DIR, '.env')
    )

SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # add
    'rest_framework',
    # 'rest_framework_simplejwt',
    'corsheaders',
    'drf_yasg',
    # local apps
    'rebikeuser',
    'rebiketrash',
    'storages',
]

# jwt 추가
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     )
# }
#
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),  # 엑세스 토큰 생명주기
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),  # 리프레쉬 토큰 생명주기
#     'ROTATE_REFRESH_TOKENS': False,  # 리프레쉬 토큰 갱신
#     'BLACKLIST_AFTER_ROTATION': False,  # 토큰 블랙리스트 생성
#     'UPDATE_LAST_LOGIN': False,  # 로그인 기록 테이블 생성, 로그인 할 때마다 db 들어감
#
#     'ALGORITHM': 'HS256',  # jwt 알고리즘
#     'SIGNING_KEY': SECRET_KEY,  # 서명 키
#     'VERIFYING_KEY': None,  # 토큰 생성시 사용하는 키 (salt 비슷한것)
#     'AUDIENCE': None,  # 유효성 관련된것같음 잘 모르겠다
#     'ISSUER': None,  # 유효성 관련된것같음 잘 모르겠다
#     'JWK_URL': None,  # 유효성
#     'LEEWAY': 0,  # 만료 시간에 어느정도 여유를 준다
#
#     'AUTH_HEADER_TYPES': ('Bearer',),  # 헤더 타입
#     'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',  # 헤더 이름
#     'USER_ID_FIELD': 'id',  # 페이로드에 넣을 값의 모델
#     'USER_ID_CLAIM': 'user_id',  # 페이로드에 넣을 값
#     'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
#     # 권한 확인하는 방법
#
#     'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
#     # 모르겠다
#     'TOKEN_TYPE_CLAIM': 'token_type',  # 토큰타입 저장할 때 클레임 이름
#     'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',  #
#
#     'JTI_CLAIM': 'jti',  #
#
#     'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',  #
#     'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),  #
#     'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),  #
# }

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_WHITELIST = ['http://127.0.0.1:3000', 'http://localhost:3000']
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': env.db(),
    'OPTIONS': {
        'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
    }
}

def test():
    return env

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AWS_ACCESS_KEY_ID=env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY=env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME=env('AWS_STORAGE_BUCKET_NAME')

# AWS_REGION='ap-northeast-2'
# AWS_S3_CUSTOM_DOMAIN='%s.s3.%s.amazonaws.com'%(AWS_STORAGE_BUCKET_NAME,AWS_REGION)
# AWS_S3_OBJECT_PARAMETERS={'CacheControl': 'max-age=86400',}
# DEFAULT_FILE_STORAGE='storages.backends.s3boto3.S3Boto3Storage'
# MEDIA_ROOT=os.path.join(BASE_DIR, 'img_data/')

# ================로깅 테스트===================
# 로깅설정
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'filters': {
#         'require_debug_false': {
#             '()': 'django.utils.log.RequireDebugFalse',
#         },
#         'require_debug_true': {
#             '()': 'django.utils.log.RequireDebugTrue',
#         },
#     },
#     'formatters': {
#         'django.server': {
#             '()': 'django.utils.log.ServerFormatter',
#             'format': '[{server_time}] {message}',
#             'style': '{',
#         },
#     'standard': {
#             'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
#         },
#     },
#     'handlers': {
#         'console': {
#             'level': 'INFO',
#             'filters': ['require_debug_true'],
#             'class': 'logging.StreamHandler',
#         },
#         'django.server': {
#             'level': 'INFO',
#             'class': 'logging.StreamHandler',
#             'formatter': 'django.server',
#         },
#         'mail_admins': {
#             'level': 'ERROR',
#             'filters': ['require_debug_false'],
#             'class': 'django.utils.log.AdminEmailHandler'
#         },
#     'file': {
#             'level': 'INFO',
#             'filters': ['require_debug_false'],
#             'class': 'logging.handlers.RotatingFileHandler',
#             'filename': BASE_DIR / 'logs/mylog.log',
#             'maxBytes': 1024*1024*5,  # 5 MB
#             'backupCount': 5,
#             'formatter': 'standard',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'mail_admins', 'file'],
#             'level': 'INFO',
#         },
#         'django.server': {
#             'handlers': ['django.server'],
#             'level': 'INFO',
#             'propagate': False,
#         },
#     }
# }
