'use client';
import Header from '@/_components/header/header';
import Tasks from '@/_components/tasks/tasks-container';
import { useAppContext } from '@/_context/app-context';
import React from 'react';

export default function HomePage() {
  const [name, setName] = React.useState('');
  const { pendingTasks, completedTasks } = useAppContext();

  React.useEffect(() => {
    setName(window.localStorage.getItem('name_user_tasks') || '');
    if (window.localStorage.getItem('name_user_tasks'))
      return setName(window.localStorage.getItem('name_user_tasks') as string);
    const name_storage = window.prompt('Qual seu nome?');
    if (name_storage) {
      setName(name_storage);
      window.localStorage.setItem('name_user_tasks', name_storage);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('pending_tasks', JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  React.useEffect(() => {
    window.localStorage.setItem(
      'completed_tasks',
      JSON.stringify(completedTasks),
    );
  }, [completedTasks]);

  return (
    <main>
      <Header name={name} />
      <Tasks />
    </main>
  );
}
