from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
User = get_user_model()

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

class ChangeUsernameForm(forms.Form):
    new_username = forms.CharField()
    current_password = forms.CharField(widget=forms.PasswordInput)
    def clean(self):
        cleaned_data = super().clean()
        user = AuthenticationForm(data=self.data)
        if not user.is_valid():
            raise forms.ValidationError("Incorrect password")
        return cleaned_data