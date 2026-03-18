from users.models.user import User

def create_user(data):
    """
    Crée un utilisateur avec mot de passe hashé.
    data : dict avec username, email, password, role
    """
    return User.objects.create_user(**data)