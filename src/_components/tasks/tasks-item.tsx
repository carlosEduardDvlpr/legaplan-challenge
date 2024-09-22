'use client';
import TrashIcon from '@/_components/svgs/trash';
import { useAppContext } from '@/_context/app-context';
import React from 'react';
import styles from './tasks-item.module.scss';

export default function TaskItem({
  className,
  checked,
  task,
}: {
  className: string;
  checked: boolean;
  task: string;
}) {
  const {
    setModal,
    setModalMode,
    setTaskDelete,
    setCompletedTasks,
    completedTasks,
    setPendingTasks,
    pendingTasks,
  } = useAppContext();

  const handleDelTask = () => {
    setModalMode('del');
    setModal(true);
  };

  const handleClick = () => {
    const filterPending = pendingTasks.filter((item) => item === task);

    if (filterPending[0]) {
      const indexItem = pendingTasks.findIndex((item) => item === task);
      const arrClone = [...pendingTasks];
      arrClone.splice(indexItem, 1);
      setPendingTasks(arrClone);
      setCompletedTasks([...completedTasks, task]);
    } else {
      const indexItem = completedTasks.findIndex((item) => item === task);
      const arrClone = [...completedTasks];
      arrClone.splice(indexItem, 1);
      setCompletedTasks(arrClone);
      setPendingTasks([...pendingTasks, task]);
    }
  };

  return (
    <div className={className}>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={handleClick}
          readOnly
          checked={checked}
        />
        <p>{task}</p>
      </div>

      <span
        onClick={(e) => {
          setTaskDelete(
            e.currentTarget.parentElement?.querySelector('p')
              ?.innerText as string,
          );
          handleDelTask();
        }}
      >
        <TrashIcon />
      </span>
    </div>
  );
}
