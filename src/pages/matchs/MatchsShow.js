import { Chip, InputLabel, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

const MatchsShow = () => {
    const [match, setMatch] = useState(false);
    const [homeTownHall, setHomeTownHall] = useState(false);
    const [awayTownHall, setAwayTownHall] = useState(false);
    const [homeClub, setHomeClub] = useState(false);
    const [awayClub, setAwayClub] = useState(false);

    const { id } = useParams()

    const GetMatch = async () => {
        getRequest(`matchs/${id}`)
            .then(async res => {
                setMatch(res.data)
            })
    }

    const getHomeClub = () => {
        getRequest(`clubs/${match.homeTeam}`)
            .then((res) => {
                setHomeClub(res.data.name)
                getRequest(`townhalls/${res.data.idTH}`)
                    .then((res) => {
                        setHomeTownHall(res.data.name)
                    })
            })
    }
    const getAwayClub = () => {
        getRequest(`clubs/${match.awayTeam}`)
            .then((res) => {
                setAwayClub(res.data.name)
                getRequest(`townhalls/${res.data.idTH}`)
                    .then((res) => {
                        setAwayTownHall(res.data.name)
                    })
            })
    }


    useEffect(() => {
        GetMatch()
    }, []);
    useEffect(() => {
        getHomeClub()
        getAwayClub()
    }, [match]);


    return (
        <div>
            <h1>Match Show</h1>
            {
                (match && homeTownHall && awayTownHall && homeClub && awayClub) && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <Stack direction="row" spacing={10} justifyContent={'center'}>
                                <TextField
                                    id="sport"
                                    label="Sport"
                                    variant="standard"
                                    defaultValue={match.sport}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                                <TextField
                                    id="category"
                                    label="Category"
                                    variant="standard"
                                    defaultValue={match.category}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                                <TextField
                                    id="date"
                                    label="Date"
                                    variant="standard"
                                    defaultValue={match.date}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                                <TextField
                                    id="duration"
                                    label="Duration"
                                    variant="standard"
                                    defaultValue={match.duration}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                                <TextField
                                    id="place"
                                    label="Place"
                                    variant="standard"
                                    defaultValue={match.place}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Stack>

                            <Stack direction="row" spacing={20}>
                                <Stack direction="column" spacing={3} width="100%">
                                    <TextField
                                        id="townhall"
                                        label="Townwhall"
                                        variant="standard"
                                        defaultValue={awayTownHall}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="club"
                                        label="Club"
                                        variant="standard"
                                        defaultValue={homeClub}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="points"
                                        label="Points"
                                        variant="standard"
                                        defaultValue={match.homePoints}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="fouls"
                                        label="Fouls"
                                        variant="standard"
                                        defaultValue={match.homeFouls}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                </Stack>
                                <Stack direction="column" spacing={3} width="100%">
                                    <TextField
                                        id="townhall"
                                        label="Townwhall"
                                        variant="standard"
                                        defaultValue={awayTownHall}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="club"
                                        label="Club"
                                        variant="standard"
                                        defaultValue={awayClub}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="points"
                                        label="Points"
                                        variant="standard"
                                        defaultValue={match.awayPoints}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                    <TextField
                                        id="fouls"
                                        label="Fouls"
                                        variant="standard"
                                        defaultValue={match.awayFouls}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                )
            }
        </div>
    );
};

export default MatchsShow;