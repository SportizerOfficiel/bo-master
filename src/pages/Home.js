import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    console.log(process.env.REACT_APP_URL_API)
    return (
        <div>
            <ul>
                <li>
                    <Link to="/townhalls" exact activeClassName="active">
                        TownHalls
                    </Link>

                </li>
                <li>
                    <Link to="/clubs" exact activeClassName="active">
                        Clubs
                    </Link>

                </li>
                <li>
                    <Link to="/players" exact activeClassName="active">
                        Players
                    </Link>

                </li>
                <li>
                    <Link to="/matchs" exact activeClassName="active">
                        Matchs
                    </Link>

                </li>
            </ul>
        </div>
    );
};

export default Home;