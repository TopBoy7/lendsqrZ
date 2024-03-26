function FilterForm(props: { closePopup: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <form action="/">
            <label htmlFor="Organization">Organization</label>
            <select>
                <option value="Lendsqr">LendSqr</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="Abeg">Abeg</option>
            </select>

            <label htmlFor="Username">Username</label>
            <input type="text" placeholder='User' />

            <label htmlFor="Email">Email</label>
            <input type="text" placeholder='Email' />

            <label htmlFor="Date">Date</label>
            <input type="date" placeholder='Date' />

            <label htmlFor="Phone Number">Phone Number</label>
            <input type="text" placeholder='Phone Number' />

            <label htmlFor="Organisation">Status</label>
            <select>
                <option value="Select">Select</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Blacklisted">Blacklisted</option>
            </select>

            <div className="buttons">
                <div className="button-div">
                    <button onClick={props.closePopup}>Reset</button>
                </div>
                
                <div className="button-div">
                    <button onClick={props.closePopup}>Filter</button>
                </div>
            </div>
        </form>
    )
}

export default FilterForm;