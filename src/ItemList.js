import LineItem from "./LineItem";

const ItemList = ({items, handleCheck, handleDelete, handleEdit,editingId, editItemText, setEditItemText, handleSave}) => {
    return (
        <ul>
            {items.map((item ) => (
                <LineItem
                key={item.id}
                item={item}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editingId={editingId} 
                editItemText={editItemText} 
                setEditItemText={setEditItemText} 
                handleSave={handleSave} 
                />
            ))}
        </ul>
    )
}

export default ItemList;