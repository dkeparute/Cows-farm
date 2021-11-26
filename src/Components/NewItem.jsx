import { useState } from "react";

function NewItem({ create }) {

    // STATE bus objektas (buvo galima daryti 5 steitus ir jiems priskirti kontroliavima, bet darem paprasciau, vienas steitas, kuris kontroliuoja 5 inputus)
    const [inputs, setInputs] = useState({
        name: '',
        weight: '',
        total_milk: '',
        last_milking_time: '',
        day_milk: ''
    })

    // inputu kontroliavimas, daroma inputu kopija nes tiesiogiai steito keisti negalima, norint gauti reiksme naudojam e.target.value
    const control = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        create(inputs);
        // resetina inputu info kai sukuriamas naujas scooteris
        setInputs({
            name: '',
            weight: '',
            total_milk: '',
            last_milking_time: '',
            day_milk: ''
        })
    }

    // Cia yr akontroliuojamas komponentas. Kiekvienas inputas turi savo STATE, be State negalima kontroliuoti. Yra būdingas onChange eventas, jis pasileis kai ką nors įrašysim.
    return (
        <div className='new-item'>
            <div className='each-new-item'>
                <span>New name: </span>
                <input type="text" value={inputs.name} onChange={(e) => control(e, 'name')} placeholder="insert name" onKeyPress={(event) => { if (!/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']/.test(event.key)) { event.preventDefault(); } }} minLength="1" maxLength="10" required/>
            </div>
            <div className='each-new-item'>
                <span>New weight: </span>
                <input type="text" value={inputs.weight} onChange={(e) => control(e, 'weight')} placeholder="insert weight" onKeyPress={(event) => { if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); } }} minLength="1" maxLength="10" required/>
            </div>
            <div className='each-new-item'>
                <span>New total milk: </span>
                <input type="text" value={inputs.total_milk} onChange={(e) => control(e, 'total_milk')} placeholder="insert total milk" onKeyPress={(event) => { if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); } }} minLength="1" maxLength="10" required/>
            </div>
            <div className='each-new-item'>
                <span>New milking time: </span>
                <input type="date" value={inputs.last_milking_time} onChange={(e) => control(e, 'last_milking_time')} placeholder="insert date" minLength="1" maxLength="10" required/>
            </div>
            <div className='each-new-item'>
                <span>New day milk: </span>
                <input type="text" value={inputs.day_milk} onChange={(e) => control(e, 'day_milk')} onKeyPress={(event) => { if (!/[.,0-9]/.test(event.key)) { event.preventDefault(); } }} required placeholder='insert the same total milk'minLength="1" maxLength="10" required/>
            </div>
            <div className='each-new-item'>
                <button onClick={handleCreate}>Save</button>
            </div>
        </div>

    );
}
export default NewItem;