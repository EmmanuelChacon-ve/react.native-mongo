import { useState, useEffect } from 'react';
import { User } from '../../../Domain/entities/User';
import { UserLocalRepositoryImpl } from '../../../Data/repositories/UserLocalRepository';
import { GetUsersUseCase } from '../../../Domain/useCase/auth/GetUsersUseCase'; // Ajusta la ruta según tu estructura de archivos

const useViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRepository = new UserLocalRepositoryImpl();
        const getUsersUseCase = new GetUsersUseCase(userRepository);
        const usersList = await getUsersUseCase.execute();
        console.log('Users fetched from API:', usersList); // Agregado para verificar los datos
        setUsers(usersList);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useViewModel;
