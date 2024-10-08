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
  const [pendingTasks, setPendingTasks] = React.useState<string[]>(() => {
    if (typeof window === 'undefined' || !window.localStorage.pending_tasks) {
      return ['Fazer bolo', 'Passear'];
    } else {
      const initial = window.localStorage.getItem('pending_tasks');
      return JSON.parse(initial as string);
    }
  });
  const [completedTasks, setCompletedTasks] = React.useState<string[]>(() => {
    if (typeof window === 'undefined' || !window.localStorage.completed_tasks) {
      return ['Estudar'];
    } else {
      const initial = window.localStorage.getItem('completed_tasks');
      return JSON.parse(initial as string);
    }
  });
  const [modalMode, setModalMode] = React.useState<'del' | 'add'>('add');
  const [taskDelete, setTaskDelete] = React.useState('');

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
