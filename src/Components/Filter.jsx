function Filter({ simpleSort }) {


    return (
        <>
            <h2>Filter & Sort</h2>
            <div className='general-filter'>
                <div className='each-filter'>
                    <span>Sort by:</span>
                    <button onClick={() => simpleSort("weight")}>Cows weight</button>
                    <button onClick={() => simpleSort("total_milk")}>Total milk</button>
                </div>
            </div>

        </>
    );
}
export default Filter;