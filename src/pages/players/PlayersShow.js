import { Chip, InputLabel, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

const PlayersShow = () => {
    const [player, setPlayer] = useState(false);
    const [townHall, setTownHall] = useState(false);
    const [club, setClub] = useState(false);

    const { id } = useParams()

    const GetPlayer = async () => {
        getRequest(`players/${id}`)
            .then(async res => {
                setPlayer(res.data)
            })
    }

    const getTownHall = () => {
        getRequest(`townhalls/${player.idTH}`)
            .then((res) => {
                setTownHall(res.data.name)
            })
    }
    const getClub = () => {
        getRequest(`townhalls/${player.idTH}/clubs/${player.idClub}`)
            .then((res) => {
                setClub(res.data.name)
            })
    }


    useEffect(() => {
        GetPlayer()
    }, []);
    useEffect(() => {
        getTownHall()
        getClub()
    }, [player]);


    return (
        <div>
            <h1>Player Show</h1>
            {
                (player && townHall && club) && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Townhall"
                                variant="standard"
                                defaultValue={townHall}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Club"
                                variant="standard"
                                defaultValue={club}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="FirstName"
                                variant="standard"
                                defaultValue={player.firstName}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="LastName"
                                variant="standard"
                                defaultValue={player.lastName}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Sport"
                                variant="standard"
                                defaultValue={player.sport}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <Stack direction="row" spacing={1}>
                                <InputLabel id="category">Category</InputLabel>
                                {
                                    player.category.map((cat) => {
                                        return <Chip label={cat} key={cat} />
                                    })
                                }
                            </Stack>
                        </Stack>

                    </form>
                )
            }
        </div>
    );
};

export default PlayersShow;