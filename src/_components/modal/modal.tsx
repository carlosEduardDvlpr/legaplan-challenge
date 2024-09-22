'use client';
import React from 'react';
import Button from '../button/button';
import styles from './modal.module.scss';
import { useAppContext } from '@/_context/app-context';

export default function Modal({
  mode,
  open,
}: {
  mode: 'del' | 'add';
  open: boolean;
}) {
  const {
    modal,
    setModal,
    setPendingTasks,
    pendingTasks,
    completedTasks,
    taskDelete,
    setTaskDelete,
  } = useAppContext();
  const [valueInput, setValueInput] = React.useState('');
  const [error, setError] = React.useState('');

  const handleCancel = () => {
    setModal(false);
    setError('');
    setValueInput('');
  };

  const handleTask = () => {
    if (valueInput) {
      setPendingTasks((tasks) => [...tasks, valueInput]);
      setValueInput('');
      setModal(false);
      setError('');
    } else {
      setError('Insira um valor');
    }
  };

  const handleTaskDelete = () => {
    const filterPending = pendingTasks.filter((item) => item === taskDelete);

    if (filterPending[0]) {
      const indexItem = pendingTasks.findIndex((item) => item === taskDelete);
      pendingTasks.splice(indexItem, 1);
      setModal(false);
      setTaskDelete('');
      if (window.localStorage.getItem('pending_tasks')) {
        window.localStorage.setItem(
          'pending_tasks',
          JSON.stringify(pendingTasks),
        );
      }
    } else {
      const indexItem = completedTasks.findIndex((item) => item === taskDelete);
      completedTasks.splice(indexItem, 1);
      setModal(false);
      setTaskDelete('');
      if (window.localStorage.getItem('completed_tasks')) {
        window.localStorage.setItem(
          'completed_tasks',
          JSON.stringify(completedTasks),
        );
      }
    }
  };

  if (open && modal && mode === 'add')
    return (
      <div className={styles.modal_backdrop}>
        <div className={styles.modal}>
          <h1 className={styles.modal_title}>Nova tarefa</h1>
          <div>
            <label className={styles.modal_label} htmlFor="task">
              Titulo
            </label>
            <input
              type="text"
              autoFocus
              value={valueInput}
              onChange={(e) => {
                setValueInput(e.target.value);
                setError('');
              }}
              id="task"
              placeholder="Digite"
              className={styles.modal_input}
            />
            {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
          </div>
          <div className={styles.modal_btns}>
            <Button cancel onClick={handleCancel}>
              Cancelar
            </Button>
            <Button add onClick={handleTask}>
              Adicionar
            </Button>
          </div>
        </div>{' '}
      </div>
    );

  if (open && modal && mode === 'del') {
    return (
      <div className={styles.modal_backdrop}>
        <div className={styles.modal}>
          <h1 className={styles.modal_title}>Deletar tarefa</h1>
          <p className={styles.modal_label}>
            Tem certeza que você deseja deletar essa tarefa?{' '}
          </p>
          <div className={styles.modal_btns}>
            <Button cancel onClick={handleCancel}>
              Cancelar
            </Button>
            <Button del onClick={handleTaskDelete}>
              Deletar
            </Button>
          </div>
        </div>{' '}
      </div>
    );
  }
}
