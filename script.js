const form = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const emailStatus = document.getElementById('emailStatus');

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function updateEmailValidation() {
    const email = emailInput.value.trim();
    const valid = isValidEmail(email);

    emailInput.setCustomValidity(valid ? '' : 'Correo electrónico inválido');
    emailInput.setAttribute('aria-invalid', String(!valid));

    if (!email) {
        emailStatus.textContent = 'Escribe un correo válido.';
        emailStatus.classList.remove('ok');
        emailStatus.classList.add('error');
    } else if (valid) {
        emailStatus.textContent = 'Correo válido.';
        emailStatus.classList.remove('error');
        emailStatus.classList.add('ok');
    } else {
        emailStatus.textContent = 'El correo no tiene un formato válido.';
        emailStatus.classList.remove('ok');
        emailStatus.classList.add('error');
    }

    //submitBtn.disabled = !form.checkValidity();
}

emailInput.addEventListener('input', updateEmailValidation);

form.addEventListener('submit', (event) => {
    updateEmailValidation();

    if (!form.checkValidity()) {
        event.preventDefault();
        return;
    }

    // Dejar que el envío nativo del formulario siga para que Netlify reciba el POST.
    emailStatus.textContent = 'Enviando...';
    emailStatus.classList.remove('error');
    emailStatus.classList.add('ok');
});

updateEmailValidation();
