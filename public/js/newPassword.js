document.addEventListener('DOMContentLoaded', function () {
    const resetForm = document.getElementById('resetForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorText = document.createElement('p');
    errorText.className = 'error-text';
    errorText.style.color = 'red';
    errorText.style.marginTop = '5px';
    confirmPasswordInput.parentNode.appendChild(errorText);

    confirmPasswordInput.addEventListener('input', function () {
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            errorText.textContent = 'Passwords do not match';
        } else {
            errorText.textContent = '';
        }
    });

    resetForm.addEventListener('submit', function (event) {
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            event.preventDefault();
        }
    });
});
