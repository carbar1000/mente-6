// Configuração segura do Supabase
const initSupabase = () => {
    try {
        // Verifica se o Supabase está disponível
        if (!window.supabase) {
            throw new Error('Supabase client não está disponível');
        }

        // Configuração básica sem expor credenciais
        console.log('Supabase configurado - Operações via API');
        
        // Retorna null para reforçar o uso da API
        return null;
    } catch (error) {
        console.error('Erro na configuração do Supabase:', error);
        return null;
    }
};

// Exporta apenas a função de inicialização
window.initSupabase = initSupabase;

// Remove qualquer referência global ao cliente Supabase
if (window.supabase) {
    delete window.supabase;
}

// Verificação de versão
const checkSupabaseVersion = () => {
    if (window.supabase && window.supabase.VERSION) {
        console.log(`Versão do Supabase: ${window.supabase.VERSION}`);
        return window.supabase.VERSION;
    }
    return null;
};

// Exporta a função de verificação de versão
window.checkSupabaseVersion = checkSupabaseVersion;
