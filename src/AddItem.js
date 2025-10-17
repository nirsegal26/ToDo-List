import {FaPlus} from 'react-icons/fa'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    return (
    <form className="addForm" onSubmit={handleSubmit}>
        <button type="submit" aria-label="add Task" className='btn'>
            <FaPlus />
        </button>
        <input
        autoFocus
        id='addItem'
        type="text"
        placeholder="Add Task"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}/>
    </form>
    )
}

export default AddItem;