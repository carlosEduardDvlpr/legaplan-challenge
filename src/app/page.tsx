'use client';
import Header from '@/_components/header/header';
import Tasks from '@/_components/tasks/tasks-container';
import React from 'react';

export default function HomePage() {
  const [name, setName] = React.useState('');

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

  return (
    <main>
      <Header name={name} />
      <Tasks />
    </main>
  );
}
