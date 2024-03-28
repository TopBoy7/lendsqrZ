import { FilterPropObject, UserObject } from "../utils/interfaces";

function FilterForm(props: FilterPropObject) {

    const users = [...props.users];
    const orgs = users.map((user: UserObject) => {
        return user.orgName;
    })

    return (
        <form action="/" onSubmit={props.filter}>
            <label htmlFor="Organization">Organization</label>
            <select value={props.formEntries.organization} onChange={(event) => props.handleSelect(event,'organization')} required >
                {orgs.map((org, index) => (
                    <option key={index} value={org}>{ org }</option>
                ))}
            </select>

            <label htmlFor="Username">Username</label>
            <input type="text" placeholder='User' value={props.formEntries.username} onChange={(event) => props.handleChange(event,'username')} required />

            <label htmlFor="Email">Email</label>
            <input type="text" placeholder='Email' value={props.formEntries.email} onChange={(event) => props.handleChange(event,'email')} required  />

            <label htmlFor="Date">Date</label>
            <input type="date" placeholder='Date' value={props.formEntries.date} onChange={(event) => props.handleChange(event,'date')} required  />

            <label htmlFor="Phone Number">Phone Number</label>
            <input type="text" placeholder='Phone Number' value={props.formEntries.phoneNumber} onChange={(event) => props.handleChange(event,'phoneNumber')} required  />

            <label htmlFor="Status">Status</label>
            <select value={props.formEntries.status} onChange={(event) => props.handleSelect(event,'status')} required >
                <option value="">Select</option>
                <option value="Any">Any</option>
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
                    <button type="submit">Filter</button>
                </div>
            </div>
        </form>
    )
}

export default FilterForm;