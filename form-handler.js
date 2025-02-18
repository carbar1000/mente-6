import { supabase } from './supabase-config.js'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio tradicional do formulário
        
        const formData = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            cor: document.querySelector('input[name="cor"]:checked')?.value,
            animal: document.querySelector('input[name="animal"]:checked')?.value,
            hobby: document.querySelector('input[name="hobby"]:checked')?.value
        };

        try {
            const { error } = await supabase
                .from('respostas')
                .insert([formData]);

            if (error) throw error;

            // Redirecionamento imediato após sucesso
            window.location.replace('/obrigado.html');

        } catch (error) {
            console.error('Erro:', error);
            const flashMessage = document.getElementById('flashMessage');
            flashMessage.textContent = 'Erro ao enviar dados. Tente novamente.';
            flashMessage.className = 'flash-message error';
            flashMessage.style.display = 'block';
        }
    });
});