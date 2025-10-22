import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

const LineItem = ({
    item, 
    handleCheck, 
    handleDelete, 
    handleEdit,
    editingId, 
    editItemText, 
    setEditItemText, 
    handleSave 
}) => {
    
    const isEditing = item.id === editingId;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSave();
        }
    }

    return (
        <li className="item" >
            <input type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
            />
            
            {isEditing ? (
                <input className="edit-input"
                    type="text"
                    autoFocus
                    onBlur={handleSave} 
                    onKeyDown={handleKeyDown} 
                    value={editItemText} 
                    onChange={(e) => setEditItemText(e.target.value)}
                />
            ) : (
                <label 
                    onDoubleClick={() => handleCheck(item.id)}
                    style={(item.checked) ? { textDecoration: 'line-through'} : null}
                >
                    {item.item}
                </label>
            )}

            <div className='buttons'>
                {!isEditing && (
                    <FaPencilAlt className='pen'
                        onClick={() => handleEdit(item.id)}
                        role="button"
                        tabIndex="0"
                    />
                )}
                <FaTrashAlt className='trash'
                    onClick={() => handleDelete(item.id)}
                    role="button"
                    tabIndex="0"
                />
            </div>
        </li>
    )
}

export default LineItem;