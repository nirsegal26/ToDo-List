import ItemList from './ItemList'
const Content = ({items, handleCheck, handleDelete, handleEdit,editingId, editItemText, setEditItemText, handleSave, handleMoveDown, handleMoveUp}) => {
        
        return (
            <main>
                {items.length ? (
                <ItemList
                items = {items}
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
                ) : <p style={{marginTop:'2rem',textAlign:'center'}}>הרשימה שלך ריקה! 🎉 </p>}
                
            </main>
        )
}   

export default Content;