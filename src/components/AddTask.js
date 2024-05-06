import React from "react";

export const AddTask = ({ tasklist, setTasklist }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.task.value;
    if (!name) return;

    try {
      const date = new Date();
      const newTask = {
        id: Date.now(), 
        name: name,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
      };
      setTasklist([...tasklist, newTask]);
      e.target.task.value = ""; 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          autoComplete="off"
          placeholder="Add task"
          maxLength="25"
        />
        <button className="shadow-xl bg-green-800" type="submit">
          Add
        </button>
      </form>
    </section>
  );
};
