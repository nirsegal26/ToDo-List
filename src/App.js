import './App.css';
import {useState, useRef} from 'react';
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

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('todolist',JSON.stringify(newItems));
  }
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id +1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [myNewItem, ...items]
    setAndSaveItems(listItems);
  }

 const handleCheck = (id) => {
    const updatedItems = items.map((item) => 
    item.id === id ? { ...item, checked: !item.checked } : item
);

    const sortedListItems = updatedItems.sort((a, b) => {
      if (a.checked && !b.checked) return 1;
      if (!a.checked && b.checked) return -1;
      return 0;
 });
      
     setAndSaveItems(sortedListItems);
 }

  const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !== id)
      setAndSaveItems(listItems);
  }

  const handleEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setEditingId(id); 
    setEditItemText(itemToEdit.item); 
  }

  const handleSave = () => {
    const listItems = items.map((item) => 
        item.id === editingId 
            ? { ...item, item: editItemText }
            : item 
    );
    setAndSaveItems(listItems);
    setEditingId(null); 
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }

  const uncheckedCount = items.filter(item => item.checked === false).length;

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
      /> 
      <Footer length ={uncheckedCount}/> 

    </div>
  );
}

export default App;
