import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes as Switch,
    Navigate
} from 'react-router-dom'
import Home from '../pages/Home';
import { ClubsList, ClubsCreate, ClubsEdit, ClubsShow } from '../pages/clubs';
import { TownHallsList, TownHallsCreate, TownHallsShow, TownHallsEdit } from '../pages/townhalls';
import { MatchsCreate, MatchsEdit, MatchsList, MatchsShow } from '../pages/matchs';
import { PlayersCreate, PlayersEdit, PlayersList, PlayersShow } from '../pages/players';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        // <Router>
        <Switch>
            <Route exact={"true"} path="/login" element={<Login />}></Route>

            <Route exact={"true"} path="/" element={<Navigate to="/townhalls"/>}></Route>

            {/* Clubs routes */}
            <Route exact={"true"} path='/clubs' element={<PrivateRoute />}>
                <Route exact={"true"} path="/clubs" element={<ClubsList />}></Route>
            </Route>
            <Route exact={"true"} path='/clubs/create' element={<PrivateRoute />}>
                <Route exact={"true"} path="/clubs/create" element={<ClubsCreate />}></Route>
            </Route>
            <Route exact={"true"} path='/clubs/:id' element={<PrivateRoute />}>
                <Route exact={"true"} path="/clubs/:id" element={<ClubsShow />}></Route>
            </Route>
            <Route exact={"true"} path='/clubs/:id/edit' element={<PrivateRoute />}>
                <Route exact={"true"} path="/clubs/:id/edit" element={<ClubsEdit />}></Route>
            </Route>

            {/* Matchs routes */}
            <Route exact={"true"} path='/matchs' element={<PrivateRoute />}>
                <Route exact={"true"} path="/matchs" element={<MatchsList />}></Route>
            </Route>
            <Route exact={"true"} path='/matchs/create' element={<PrivateRoute />}>
                <Route exact={"true"} path="/matchs/create" element={<MatchsCreate />}></Route>
            </Route>
            <Route exact={"true"} path='/matchs/:id' element={<PrivateRoute />}>
                <Route exact={"true"} path="/matchs/:id" element={<MatchsShow />}></Route>
            </Route>
            <Route exact={"true"} path='/matchs/:id/edit' element={<PrivateRoute />}>
                <Route exact={"true"} path="/matchs/:id/edit" element={<MatchsEdit />}></Route>
            </Route>

            {/* Players routes */}
            <Route exact={"true"} path='/players' element={<PrivateRoute />}>
                <Route exact={"true"} path="/players" element={<PlayersList />}></Route>
            </Route>
            <Route exact={"true"} path='/players/create' element={<PrivateRoute />}>
                <Route exact={"true"} path="/players/create" element={<PlayersCreate />}></Route>
            </Route>
            <Route exact={"true"} path='/players/:id' element={<PrivateRoute />}>
                <Route exact={"true"} path="/players/:id" element={<PlayersShow />}></Route>
            </Route>
            <Route exact={"true"} path='/players/:id/edit' element={<PrivateRoute />}>
                <Route exact={"true"} path="/players/:id/edit" element={<PlayersEdit />}></Route>
            </Route>

            {/* Townhalls routes */}
            <Route exact={"true"} path='/townhalls' element={<PrivateRoute />}>
                <Route exact={"true"} path="/townhalls" element={<TownHallsList />}></Route>
            </Route>
            <Route exact={"true"} path='/townhalls/create' element={<PrivateRoute />}>
                <Route exact={"true"} path="/townhalls/create" element={<TownHallsCreate />}></Route>
            </Route>
            <Route exact={"true"} path='/townhalls/:id' element={<PrivateRoute />}>
                <Route exact={"true"} path="/townhalls/:id" element={<TownHallsShow />}></Route>
            </Route>
            <Route exact={"true"} path='/townhalls/:id/edit' element={<PrivateRoute />}>
                <Route exact={"true"} path="/townhalls/:id/edit" element={<TownHallsEdit />}></Route>
            </Route>

        </Switch>
        // </Router>
    );
};

export default Routes;