import ItemList from './ItemList'
const Content = ({items, handleCheck, handleDelete}) => {
        
        return (
            <main>
                {items.length ? (
                <ItemList
                items = {items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                />
                ) : <p style={{marginTop:'2rem',textAlign:'center'}}>הרשימה שלך ריקה! 🎉 </p>}
                
            </main>
        )
}   

export default Content;