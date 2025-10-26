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

  // שמירה אוטומטית ב-localStorage בכל שינוי של items
  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const myNewItem = { id: uuidv4(), checked: false, item };
    const listItems = [myNewItem, ...items];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditingId(id);
    setEditItemText(itemToEdit.item);
  };

  const handleSave = () => {
    const listItems = items.map((item) =>
      item.id === editingId ? { ...item, item: editItemText } : item
    );
    setItems(listItems);
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
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index <= 0) return prevItems;
      const newItems = [...prevItems];
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      return newItems;
    });
  };

  const handleMoveDown = (id) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index === -1 || index >= prevItems.length - 1) return prevItems;
      const newItems = [...prevItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
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
