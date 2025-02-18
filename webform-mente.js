import supabase from '../../supabaseClient';

document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cor = document.querySelector('input[name="cor"]:checked')?.value;
    const animal = document.querySelector('input[name="animal"]:checked')?.value;
    const hobby = document.querySelector('input[name="hobby"]:checked')?.value;

    if (!cor || !animal || !hobby) {
        alert('Por favor, selecione todas as opções obrigatórias.');
        return;
    }

    // Validar email
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Exibir mensagem de carregamento
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
        const { data, error } = await sendToSupabase(nome, email, cor, animal, hobby);

        if (error) {
            console.error('Erro ao enviar dados para o Supabase:', error);
            alert('Erro ao enviar dados.');
        } else {
            console.log('Dados enviados com sucesso para o Supabase:', data);
            alert('Dados enviados com sucesso!');
            document.getElementById('myForm').reset(); // Limpar o formulário
            window.location.href = 'obrigado.html'; // Redirecionar para a página de agradecimento
        }
    } finally {
        // Restaurar botão de envio
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});

async function sendToSupabase(nome, email, cor, animal, hobby) {
    try {
        const { data, error } = await supabase
            .from('respostas')
            .insert([{ nome, email, cor, animal, hobby }]);

        return { data, error };
    } catch (error) {
        console.error('Erro na função sendToSupabase:', error);
        return { data: null, error: error };
    }
}

function isValidEmail(email) {
    // Regex para validar email (simples)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// Manter apenas funções de UI e navegação
// UI Navigation Functions
function startSurvey() {
    const intro = document.getElementById('intro');
    const form = document.getElementById('myForm');
    
    if (intro && form) {
        intro.classList.add('hidden');
        form.classList.remove('hidden');
    }
}

function autoNext() {
    const currentContainer = document.querySelector('.form-container.active');
    if (currentContainer) {
        const nextButton = currentContainer.querySelector('button[onclick="navigate(1)"]');
        if (nextButton) {
            setTimeout(() => {
                nextButton.click();
            }, 500);
        }
    }
}

// Make functions available globally
window.startSurvey = startSurvey;
window.autoNext = autoNext;