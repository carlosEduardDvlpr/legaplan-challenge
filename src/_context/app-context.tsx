'use client';
import React from 'react';

interface IContextUser {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalMode: 'del' | 'add';
  setModalMode: React.Dispatch<React.SetStateAction<'del' | 'add'>>;
  pendingTasks: string[];
  completedTasks: string[];
  setPendingTasks: React.Dispatch<React.SetStateAction<string[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  taskDelete: string;
  setTaskDelete: React.Dispatch<React.SetStateAction<string>>;
}

const Context = React.createContext<IContextUser | null>(null);

export const useAppContext = () => {
  const context = React.useContext(Context);
  if (context === null) throw new Error('O provider deve envolver o Layout');
  return context;
};

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = React.useState(false);
  const [pendingTasks, setPendingTasks] = React.useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<string[]>([]);
  const [modalMode, setModalMode] = React.useState<'del' | 'add'>('add');
  const [taskDelete, setTaskDelete] = React.useState('');

  React.useEffect(() => {
    setCompletedTasks(
      JSON.parse(window.localStorage.getItem('completed_tasks') as string) || [],
    );
    setPendingTasks(
      JSON.parse(window.localStorage.getItem('pending_tasks') as string) || [],
    );
  }, []);

  return (
    <Context.Provider
      value={{
        modalMode,
        setModalMode,
        modal,
        setModal,
        pendingTasks,
        setPendingTasks,
        completedTasks,
        setCompletedTasks,
        setTaskDelete,
        taskDelete,
      }}
    >
      {children}
    </Context.Provider>
  );
}
