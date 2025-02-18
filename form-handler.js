import { supabase } from './supabase-config.js'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = {
            cor: form.querySelector('input[name="cor"]:checked')?.value,
            animal: form.querySelector('input[name="animal"]:checked')?.value,
            hobby: form.querySelector('input[name="hobby"]:checked')?.value,
            nome: form.querySelector('#nome').value,
            email: form.querySelector('#email').value,
            created_at: new Date().toISOString()
        };

        try {
            const { error } = await supabase
                .from('respostas')
                .insert([formData]);

            if (error) throw error;

            const flashMessage = document.getElementById('flashMessage');
            flashMessage.textContent = 'Dados enviados com sucesso!';
            flashMessage.className = 'flash-message success';
            flashMessage.style.display = 'block';

            form.reset();

        } catch (error) {
            console.error('Error:', error);
            const flashMessage = document.getElementById('flashMessage');
            flashMessage.textContent = 'Erro ao enviar dados. Tente novamente.';
            flashMessage.className = 'flash-message error';
            flashMessage.style.display = 'block';
        }
    });
});