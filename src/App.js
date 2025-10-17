import './App.css';
import {useState} from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';


function App() {
  const [items, setItems] = useState([
            {
                id: 1,
                checked: false,
                item: "item1"
            },
            {
                id: 2,
                checked: false,
                item: "item2"
            },
            {
                id: 3,
                checked: true,
                item: "item3"
            }

        ]);

        const handleCheck = (id) => {
            const listItems = items.map((item) => item.id===id ? {...item, checked :!item.checked} : item);
            setItems(listItems)
            localStorage.setItem('todolist',JSON.stringify(listItems));
        }

        const handleDelete = (id) => {
            const listItems = items.filter((item) => item.id !== id)
            setItems(listItems)
            localStorage.setItem('todolist',JSON.stringify(listItems));
        }
  const uncheckedCount = items.filter(item => item.checked === false).length;
  return (
    <div className="App">
      <Header /> 
      <Content items={items} handleCheck={handleCheck} handleDelete={handleDelete}/> 
      <Footer length ={uncheckedCount}/> 

    </div>
  );
}

export default App;
