from rest_framework_social_oauth2.authentication import SocialAuthentication

class EcommOAuth(SocialAuthentication):
    def get_user_details(self, response):
        return {}