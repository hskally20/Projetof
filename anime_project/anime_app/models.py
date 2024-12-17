from django.db import models

class Episode(models.Model):
    title = models.CharField(max_length=255)
    video_url = models.URLField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    episode = models.ForeignKey('Episode', on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment on {self.episode.title} - {self.created_at}"

