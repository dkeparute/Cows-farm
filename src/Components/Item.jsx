function Item({ item, deleteItem, modal }) {

    // paspaudus showEdit turi išlysti modalas
    const showEdit = () => {
        modal(item)
    }

    // datos fromatas
    const d = new Date(item.last_milking_time);
    let month = "00" + (d.getMonth() + 1);
    month = month.substring(month.length - 2);
    let day = "00" + d.getDate();
    day = day.substring(day.length - 2);
    item.last_milking_time = `${d.getFullYear()}-${month}-${day}`;

    return (
        <div className='list'>
            <span>Name: </span>
            <div className='each-item'>
                <div>{item.name}</div>
            </div>
            <span>Weight: </span>
            <div className='each-item'>
                <div>{item.weight}</div>
            </div>
            <div className='each-item'>
                <span>Total_milk: </span>
                <div>{item.total_milk}</div>
            </div>
            <div className='each-item'>
                <span>Last milking time: </span>
                <div>{item.last_milking_time}</div>
            </div>
            <div className='each-item'>
                <span>Day milk: </span>
                <div>{item.day_milk}</div>
            </div>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
            <button onClick={showEdit}>Edit</button>


        </div>
    );

}
export default Item;