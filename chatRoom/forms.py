from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

class ChangeUsernameForm(forms.Form):
    old_username = forms.CharField()
    new_username = forms.CharField()
    current_password = forms.CharField(widget=forms.PasswordInput)
    def clean(self):
        print("test")
        old_username = self.cleaned_data.get('old_username')
        print(old_username)
        cleaned_data = super().clean()
        user = authenticate(username=self.cleaned_data.get('old_username'), password=self.cleaned_data.get('current_password'))
        if user is None:
            raise forms.ValidationError("Incorrect password")
        return cleaned_data