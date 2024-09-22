import TaskItem from './tasks-item';
import styles from './tasks-container.module.scss';
import Modal from '../modal/modal';
import React from 'react';
import Button from '../button/button';
import { useAppContext } from '@/_context/app-context';

export default function TasksContainer() {
  const {
    modalMode,
    setModalMode,
    modal,
    setModal,
    pendingTasks,
    completedTasks,
  } = useAppContext();

  const handleModal = () => {
    setModal(true);
    setModalMode('add');
  };

  return (
    <section className={styles.container}>
      <div className={styles.tasks}>
        <div className={styles.container}>
          {' '}
          <p className={styles.tasks_title}>
            {pendingTasks.length > 0
              ? 'Suas tarefas de hoje:'
              : 'Não há tarefas pendentes.'}
          </p>
          {pendingTasks &&
            pendingTasks.map((item) => (
              <TaskItem
                key={crypto.randomUUID()}
                checked={false}
                className={styles.pending_tasks}
                task={item}
              />
            ))}
        </div>

        <div className={styles.container}>
          {' '}
          <p className={styles.tasks_title}>
            {completedTasks.length > 0 ? 'Tarefas finalizadas:' : ''}
          </p>
          {completedTasks &&
            completedTasks.map((item) => (
              <TaskItem
                key={crypto.randomUUID()}
                checked={true}
                className={styles.completed_tasks}
                task={item}
              />
            ))}
        </div>
      </div>

      <Modal mode={modalMode} open={modal} />

      <Button add onClick={handleModal}>
        Adicionar nova tarefa
      </Button>
    </section>
  );
}
