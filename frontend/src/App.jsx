import { useEffect, useMemo, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setError("");
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      setSaving(true);
      setError("");
      const newTodo = await createTodo(title.trim());
      setTodos((current) => [newTodo, ...current]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTodo(todo) {
    try {
      const updated = await updateTodo(todo._id, {
        completed: !todo.completed,
      });

      setTodos((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeTodo(id) {
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const remaining = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  return (
    <main className="page">
      <section className="card">
        <div className="header">
          <div>
            <p className="eyebrow">MERN STACK</p>
            <h1>Todo App</h1>
            <p className="subtitle">
              React + Node.js + Express + MongoDB
            </p>
          </div>
          <div className="count">{remaining} left</div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you want to learn?"
            maxLength={200}
          />
          <button disabled={saving}>
            {saving ? "Adding..." : "Add Todo"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <p className="empty">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="empty">No todos yet. Add your first task.</p>
        ) : (
          <div className="list">
            {todos.map((todo) => (
              <div className="todo" key={todo._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                  />
                  <span className={todo.completed ? "done" : ""}>
                    {todo.title}
                  </span>
                </label>
                <button
                  className="delete"
                  onClick={() => removeTodo(todo._id)}
                  aria-label={`Delete ${todo.title}`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
