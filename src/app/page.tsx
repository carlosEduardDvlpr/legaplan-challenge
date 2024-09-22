'use client';
import Header from '@/_components/header/header';
import Tasks from '@/_components/tasks/tasks-container';
import { useAppContext } from '@/_context/app-context';
import React from 'react';

export default function HomePage() {
  const [name, setName] = React.useState('');

  const { completedTasks, pendingTasks } = useAppContext();

  React.useEffect(() => {
    setName(window.localStorage.getItem('name_user_tasks') || '')
    if (window.localStorage.getItem('name_user_tasks'))
      return setName(window.localStorage.getItem('name_user_tasks') as string);
    const name_storage = window.prompt('Qual seu nome?');
    if (name_storage) {
      setName(name_storage);
      window.localStorage.setItem('name_user_tasks', name_storage);
    }
  }, []);

  React.useEffect(() => {
    if (
      !window.localStorage.getItem('completed_tasks') &&
      !window.localStorage.getItem('pending_tasks')
    ) {
      window.localStorage.setItem(
        'completed_tasks',
        JSON.stringify(completedTasks),
      );
      window.localStorage.setItem(
        'pending_tasks',
        JSON.stringify(pendingTasks),
      );
    }
  }, [completedTasks, pendingTasks]);

  return (
    <main>
      <Header name={name} />
      <Tasks />
    </main>
  );
}
