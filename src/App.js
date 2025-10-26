import './App.css';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('todolist');
    return saved ? JSON.parse(saved) : [];
  });

  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const myNewItem = { id: uuidv4(), checked: false, item };
    setItems((prev) => [myNewItem, ...prev]);
  };

  const handleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditingId(id);
    setEditItemText(itemToEdit.item);
  };

  const handleSave = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, item: editItemText } : item
      )
    );
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addItem(newItem);
    setNewItem('');
    inputRef.current?.focus();
  };

  const handleMoveUp = (id) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index <= 0) return prev; 
      const newItems = [...prev];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return newItems;
    });
  };

  const handleMoveDown = (id) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1 || index >= prev.length - 1) return prev; 
      const newItems = [...prev];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      return newItems;
    });
  };

  const uncheckedCount = items.filter((item) => !item.checked).length;

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
      />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editingId={editingId}
        editItemText={editItemText}
        setEditItemText={setEditItemText}
        handleSave={handleSave}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
      />
      <Footer length={uncheckedCount} />
    </div>
  );
}

export default App;
