// form-handler.js

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

    function validateForm(formData) {
        const errors = [];
        
        if (!formData.nome || formData.nome.length < 5) {
            errors.push('Nome deve ter pelo menos 5 caracteres');
        }
        
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.push('Email inválido');
        }
        
        if (!formData.cor) errors.push('Selecione uma cor');
        if (!formData.animal) errors.push('Selecione um animal');
        if (!formData.hobby) errors.push('Selecione um hobby');
        
        return errors;
    }

    async function sendToSupabase(formData) {
        try {
            const { data, error } = await supabase
                .from('respostas')
                .insert([formData]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Erro Supabase:', error);
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

        const errors = validateForm(formData);
        if (errors.length > 0) {
            showMessage(errors.join('\n'));
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const result = await sendToSupabase(formData);
            
            if (result.success) {
                showMessage('Dados enviados com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = '/obrigado';
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