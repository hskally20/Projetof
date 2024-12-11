from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    full_name = forms.CharField(max_length=255, required=False)
    bio = forms.CharField(widget=forms.Textarea, required=False)
    profile_picture = forms.ImageField(required=False)
    birth_date = forms.DateField(widget=forms.SelectDateWidget(years=range(1900, 2100)), required=False)

    class Meta:
        model = CustomUser
        fields = ('username', 'full_name', 'bio', 'profile_picture', 'birth_date')
