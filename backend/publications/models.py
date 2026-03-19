from django.db import models

class Publication(models.Model):
    titre = models.CharField(max_length=255)
    resume = models.TextField()
    date_publication = models.DateField()

    pdf = models.FileField(upload_to='publications/', null=True, blank=True)
    doi = models.CharField(max_length=255, null=True, blank=True)

    chercheurs = models.ManyToManyField('researchers.Chercheur')
    domaine = models.ForeignKey('researchers.Domaine', on_delete=models.CASCADE)

    def __str__(self):
        return self.titre