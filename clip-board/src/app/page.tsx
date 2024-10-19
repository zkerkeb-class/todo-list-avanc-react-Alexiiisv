'use client';
import React, { useEffect } from 'react';
import styles from './page.module.css';
import { Task } from './interfaces/task';
import useTasks from './components/customHooks/useTasks';

const Page = () => {
	const { taskText, handleTextChange, addTask, toggleTask, deleteTask, filteredTasks, setFilter } = useTasks();

	const listFilter = ['all', 'completed', 'incomplete'];
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
		  if (e.key === 'Enter') {
			addTask();
		  }
		};
	
		window.addEventListener('keydown', handleKeyDown);
	
		return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		};
	  }, [taskText, addTask]);


  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header>
          <h1>Check List</h1>
        </header>
		<div>
			<section className={styles.inputContainer}>
				<input 
					type="text" 
					className='task-input'
					value={taskText} 
					placeholder="Nom de la tâche" 
					onChange={handleTextChange} 
					aria-label="Nouvelle tâche"
				/>
				<button id="add-task" className={styles.buttonAdd} onClick={addTask}>Ajouter la tâche</button>
			</section>
			<section className={styles.filterContainer}>
				{listFilter.map((filter) => (
					<button className={styles.buttonFilter} key={filter} onClick={() => setFilter(filter)}>{filter}</button>
				))}
			</section>
		</div>
        <ul id="task-list" className={styles.taskList}>
          {filteredTasks.map((task: Task) => (
            <li key={task.id} className={styles.taskItem}>
              <input 
                type="checkbox" 
                checked={task.done} 
                onChange={() => toggleTask(task.id)} 
                aria-label={`Marquer ${task.text} comme ${task.done ? 'non terminée' : 'terminée'}`}
              />
              <span>{task.text}</span>
              <button className='button-delete-task' onClick={() => deleteTask(task.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Page;