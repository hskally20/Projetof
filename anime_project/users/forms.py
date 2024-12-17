from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomAuthenticationForm(forms.Form):
    username_or_email = forms.CharField(label="Username ou Email", max_length=254)
    password = forms.CharField(label="Senha", widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_cache = None

    def clean(self):
        username_or_email = self.cleaned_data.get("username_or_email")
        password = self.cleaned_data.get("password")

        if username_or_email and password:
            # Tenta autenticar usando email ou username
            self.user_cache = authenticate(username=username_or_email, password=password)

            if not self.user_cache:
                from django.contrib.auth import get_user_model
                User = get_user_model()

                try:
                    user = User.objects.get(email=username_or_email)
                    self.user_cache = authenticate(username=user.username, password=password)
                except User.DoesNotExist:
                    self.user_cache = None

            if not self.user_cache:
                raise forms.ValidationError("Usuário ou senha inválidos.")
        return self.cleaned_data

    def get_user(self):
        return self.user_cache


class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2')  # Campos básicos de registro

# Formulário para atualizar o perfil
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('full_name', 'bio', 'birth_date', 'profile_picture')  # Campos adicionais
