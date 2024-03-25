import '../src/assets/styles/user-stats.scss';
import { Stat } from '../utils/interfaces';

function UserStats(props: { stat: Stat}) {
    return (
        <div className="column">
            <div className="stat">
                <img src={props.stat.image} alt="user stat img" />
                <p>{props.stat.title}</p>
                <h3>{props.stat.value}</h3>
            </div>
        </div>
    )
}

export default UserStats;