import { Fragment } from 'react/jsx-runtime';
import '../src/assets/styles/user-stats.scss';
import { Stat } from '../utils/interfaces';

function UserStats(props: { stat: Stat}) {
    return (
        <Fragment>
            <div className="column">
                <div className="stat">
                    <img src={props.stat.image} alt="user stat img" />
                    <p>{props.stat.title}</p>
                    <h3>{props.stat.value}</h3>
                </div>
            </div>
        </Fragment>
    )
}

export default UserStats;