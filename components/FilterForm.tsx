import { FilterPropObject } from "../utils/interfaces";

function FilterForm(props: FilterPropObject) {

    return (
        <form action="/">
            <label htmlFor="Organization">Organization</label>
            <select value={props.formEntries.organization} onChange={(event) => props.handleSelect(event,'organization')}>
                <option value="">Select</option>
                {props.users.map((user, index) => (
                    <option key={index} value={user.orgName}>{ user.orgName }</option>
                ))}
            </select>

            <label htmlFor="Username">Username</label>
            <input type="text" placeholder='User' value={props.formEntries.username} onChange={(event) => props.handleChange(event,'username')} />

            <label htmlFor="Email">Email</label>
            <input type="text" placeholder='Email' value={props.formEntries.email} onChange={(event) => props.handleChange(event,'email')}  />

            <label htmlFor="Date">Date</label>
            <input type="date" placeholder='Date' value={props.formEntries.date} onChange={(event) => props.handleChange(event,'date')}  />

            <label htmlFor="Phone Number">Phone Number</label>
            <input type="text" placeholder='Phone Number' value={props.formEntries.phoneNumber} onChange={(event) => props.handleChange(event,'phone number')}  />

            <label htmlFor="Status">Status</label>
            <select value={props.formEntries.status} onChange={(event) => props.handleSelect(event,'status')} >
                <option value="">Select</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Blacklisted">Blacklisted</option>
            </select>

            <div className="buttons">
                <div className="button-div">
                    <button onClick={props.resetFilter}>Reset</button>
                </div>
                
                <div className="button-div">
                    <button onClick={(event) => props.filter(event, props.formEntries)}>Filter</button>
                </div>
            </div>
        </form>
    )
}

export default FilterForm;