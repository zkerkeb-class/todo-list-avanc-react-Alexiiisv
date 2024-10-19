import { Task } from '@/app/interfaces/task';
import { useState, useEffect, useCallback } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load tasks from local storage on component mount
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
      console.log('Loading tasks from local storage:', savedTasks);
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    if (tasks.length > 0) {
        console.log('Saving tasks to local storage:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  }, []);

  const addTask = useCallback(() => {
    if (taskText.trim() !== '') {
      setTasks(prevTasks => [...prevTasks, {id: Date.now().toString() , text: taskText, done: false }]);
      setTaskText('');
    }
  }, [taskText]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.done;
    if (filter === 'incomplete') return !task.done;
    return true;
  });

  return {
    tasks,
    taskText,
    filter,
    handleTextChange,
    addTask,
    deleteTask,
    toggleTask,
    setFilter,
    filteredTasks
  };
};

export default useTasks;