function Stats({ stats }) {

    return (
        <div>
            <div className='statistic-results'>
                <span>Count Cows: <i>{stats.cowsCount}</i></span>
                <span>Sum total milk: <i>{stats.milkCount}</i> kg</span>
            </div>

        </div>
    )
}
export default Stats;