import { supabase } from './supabase-config.js'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Only include form fields that need to be submitted
        const formData = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            cor: document.querySelector('input[name="cor"]:checked')?.value,
            animal: document.querySelector('input[name="animal"]:checked')?.value,
            hobby: document.querySelector('input[name="hobby"]:checked')?.value
        };

        try {
            const { data, error } = await supabase
                .from('respostas')
                .insert([formData]);

            if (error) throw error;

            // Show success message
            const flashMessage = document.getElementById('flashMessage');
            flashMessage.textContent = 'Dados enviados com sucesso!';
            flashMessage.className = 'flash-message success';
            flashMessage.style.display = 'block';

            // Redirect to thank you page
            window.location.href = '/obrigado';

        } catch (error) {
            console.error('Erro:', error);
            const flashMessage = document.getElementById('flashMessage');
            flashMessage.textContent = 'Erro ao enviar dados. Tente novamente.';
            flashMessage.className = 'flash-message error';
            flashMessage.style.display = 'block';
        }
    });
});