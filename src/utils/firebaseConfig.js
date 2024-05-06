import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const addTasks = async (taskName) => {
  try {
    const tasksRef = collection(firestore, 'tasks'); 
    
    const date = new Date();
    const newTask = {
      name: taskName,
      time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
    };
    
    await addDoc(tasksRef, newTask);

    console.log("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export { firestore, addTasks };

