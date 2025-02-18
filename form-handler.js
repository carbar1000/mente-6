// form-handler.js 17:05

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const flashMessage = document.getElementById('flashMessage');

    function showMessage(message, type = 'error') {
        flashMessage.textContent = message;
        flashMessage.className = `flash-message ${type}`;
        flashMessage.style.display = 'block';
        setTimeout(() => {
            flashMessage.style.display = 'none';
        }, 5000);
    }

    async function sendToSupabase(formData) {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            return { success: true, data: result };
        } catch (error) {
            console.error('Erro:', error);
            return { 
                success: false, 
                error: error.message || 'Erro ao enviar dados'
            };
        }
    }
    async function sendToSupabase(formData) {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            return { success: true, data: result };
        } catch (error) {
            console.error('Erro:', error);
            return { 
                success: false, 
                error: error.message || 'Erro ao enviar dados'
            };
        }
    }
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            cor: document.querySelector('input[name="cor"]:checked')?.value,
            animal: document.querySelector('input[name="animal"]:checked')?.value,
            hobby: document.querySelector('input[name="hobby"]:checked')?.value
        };

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const result = await sendToSupabase(formData);
            
            if (result.success) {
                showMessage('Dados enviados com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = '/obrigado';  // Atualizado para rota do Vercel
                }, 1500);
            } else {
                showMessage(result.error);
            }
        } catch (error) {
            showMessage('Erro ao processar o envio. Tente novamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar formulário';
        }
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}