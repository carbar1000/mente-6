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

    // Enviar dados para o Supabase
    console.log('Dados do formulário:', { nome, email, cor, animal, hobby });
    await sendToSupabase(nome, email, cor, animal, hobby);
});

async function sendToSupabase(nome, email, cor, animal, hobby) {
    console.log('Enviando dados para o Supabase...');
    try {
        const { data, error } = await supabase
            .from('respostas')
            .insert([
                { nome: nome, email: email, cor: cor, animal: animal, hobby: hobby },
            ]);

        if (error) {
            console.error('Erro ao enviar dados para o Supabase:', error);
            alert('Erro ao enviar dados.');
        } else {
            console.log('Dados enviados com sucesso para o Supabase:', data);
            alert('Dados enviados com sucesso!');
            window.location.href = 'obrigado.html'; // Redirecionar para a página de agradecimento
        }
    } catch (error) {
        console.error('Erro ao enviar dados para o Supabase:', error);
        alert('Erro ao enviar dados.');
    }
}
