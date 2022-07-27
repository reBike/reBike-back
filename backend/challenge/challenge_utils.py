from .models import trash_kind, uploaded_trash_image, challenge, user_challenge
from rebikeuser.models import user


def check_challenge(user_id):
    uploaded_img_count = uploaded_trash_image.objects.filter(user_id=user_id).count()

    challenge_info = 0

    for i in [1, 3, 5, 7, 10]:
        if not user_challenge.objects.filter(user_id=user_id, challenge_number=i):
            if uploaded_img_count == i:
                challenge_info = create_user_challenge(user_id, uploaded_img_count)

    return challenge_info


def create_user_challenge(user_id, challenge_number):
    user_challenge.objects.create(user_id=user.objects.get(id=user_id),
                                  challenge_number=challenge.objects.get(number=challenge_number))
    return user_challenge.objects.filter(user_id=user_id, challenge_number=challenge_number)
