import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit,  deleteItem}) {

    const [inputs, setInputs] = useState({
        name: '',
        weight: '',
        total_milk: '',
        last_milking_time: '',
        day_milk: ''
    })
    const control = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    useEffect(() => {
        setInputs({
            name:modalElement.name,
            weight: modalElement.weight,
            total_milk: modalElement.total_milk,
            last_milking_time: modalElement.last_milking_time,
            day_milk: modalElement.day_milk
        })
    }, [modalElement])

    const handleEdit = () => {
        edit({
            name: inputs.name,
            weight: inputs.weight,
            total_milk: inputs.total_milk,
            last_milking_time: inputs.last_milking_time,
            day_milk: inputs.day_milk
        }, modalElement.id)
    }

    return (
        <div className='general-modal' style={{ display: showModal ? 'block' : 'none', top: window.scrollY + 100 + 'px' }}>
            <div className='each-modal'>
                <span>Edit name: </span> 
                <input type="text" value={inputs.name} onChange={(e) => control(e, 'name')} onKeyPress={(event) => {if (!/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]/.test(event.key)) { event.preventDefault(); }
                }} minLength="1" maxLength="10" />
            </div>
            <div className='each-modal'>
                <span>Current weight: </span> 
                <input type="text" value={inputs.weight} onChange={(e) => control(e, 'weight')} readOnly />
            </div>
            <div className='each-modal'>
            <span>Edit weight: </span> 
            <input type="text" value={inputs.weight} onChange={(e) => control(e, 'weight')} onKeyPress={(event) => {if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); }}} />
            </div>
            <div className='each-modal'>
            <span>Milking time: </span> 
            <input type="date" value={inputs.last_milking_time} onChange={(e) => control(e, 'last_milking_time')} readOnly/>
            </div>
            <div className='each-modal'>
            <span>Edit milking time: </span> 
            <input type="date" value={inputs.last_milking_time} onChange={(e) => control(e, 'last_milking_time')} />
            </div>
            <div className='each-modal'>
            <span>Total milk: </span> 
            <input type="text" value={inputs.total_milk} onChange={(e) => control(e, 'total_milk')} placeholder="insert total milk" readOnly/>
            </div>
            <div className='each-modal'>
            <span>Edit day milk: </span> 
            <input type="text" value={inputs.day_milk} onChange={(e) => control(e, 'day_milk')} placeholder="day_milk" onKeyPress={(event) => {if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); }}}/>
            </div>
            <div className='each-modal'>
            <button onClick={handleEdit}>Save</button>
            <button onClick={hide}>Cancel</button>
            <button onClick={() => deleteItem(modalElement.id)}>Delete</button>
            </div>
        </div>

    );
}
export default Modal;