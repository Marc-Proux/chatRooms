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
        old_username = self.cleaned_data.get('old_username')
        print("username: "+old_username)
        print("password: "+self.cleaned_data.get('current_password'))
        cleaned_data = super().clean()
        user = authenticate(username=self.cleaned_data.get('old_username'), password=self.cleaned_data.get('current_password'))
        if user:
            print("user authenticated")
            print("data :"+str(cleaned_data))
            return cleaned_data
        raise forms.ValidationError("Incorrect password")