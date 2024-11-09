import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  // Função de login que verifica o email e a senha na tabela Cliente
  const login = async (email, senha) => {
    try {
      // Verifica o email e a senha na tabela Cliente
      const { data: clienteData, error: clienteError } = await supabase
        .from('Cliente')
        .select('id, nome, email, id_endereco')
        .eq('email', email)
        .eq('senha', senha)
        .single();

      if (clienteError || !clienteData) {
        return { error: 'Email ou senha inválidos' };
      }

      // Salva os dados do cliente no estado
      setUser(clienteData);

      // Busca o endereço associado ao cliente
      await fetchUserAddress(clienteData.id_endereco);

      return { error: null };
    } catch (err) {
      console.error('Erro ao fazer login:', err.message);
      return { error: err.message };
    }
  };

  // Função para buscar o endereço do cliente
  const fetchUserAddress = async (idEndereco) => {
    try {
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .select('rua, numero')
        .eq('id', idEndereco)
        .single();

      if (enderecoError) throw enderecoError;
      setUserAddress(`${enderecoData.rua}, ${enderecoData.numero}`);
    } catch (err) {
      console.error('Erro ao buscar endereço:', err.message);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setUserAddress(null);
  };

  return (
    <AuthContext.Provider value={{ user, userAddress, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
