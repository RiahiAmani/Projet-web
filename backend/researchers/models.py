from django.db import models

class Domaine(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom


class Chercheur(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField()

    domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom