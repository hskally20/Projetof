# users/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .forms import CustomUserCreationForm  # Supondo que você tenha esse formulário

# View de Registro (Cadastro)
def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)  # Usando seu formulário customizado
        if form.is_valid():
            user = form.save()
            login(request, user)  # Faz login automaticamente após o registro
            return redirect('home')  # Redireciona para a página inicial (ajuste conforme necessário)
    else:
        form = CustomUserCreationForm()  # Exibe o formulário vazio

    return render(request, 'register.html', {'form': form})

# View de Login
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()  # Obtém o usuário autenticado
            login(request, user)  # Faz login do usuário
            return redirect('home')  # Redireciona para a página inicial (ajuste conforme necessário)
    else:
        form = AuthenticationForm()  # Exibe o formulário vazio

    return render(request, 'login.html', {'form': form})
