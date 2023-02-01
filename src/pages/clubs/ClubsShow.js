import { Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

export const ClubsShow = () => {
    const [townHall, setTownHall] = useState(false);
    const [club, setClub] = useState(false);

    let navigate = useNavigate();

    const { id } = useParams()

    const GetClub = async () => {
        getRequest(`clubs/${id}`)
            .then(async res => {
                const clubData = res.data
                setClub(clubData)
                getRequest(`townhalls/${clubData.idTH}`)
                    .then(res => {
                        const townhallData = res.data
                        setTownHall(townhallData)
                    })
            })
    }


    useEffect(() => {
        GetClub()
    }, []);


    return (
        <div>
            <h1>Club Show</h1>
            {
                (club && townHall) && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Townhall"
                                variant="standard"
                                defaultValue={townHall.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Name"
                                variant="standard"
                                defaultValue={club.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Sport"
                                variant="standard"
                                defaultValue={club.sport}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Address"
                                variant="standard"
                                defaultValue={townHall.address}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Created At"
                                variant="standard"
                                defaultValue={club.createdAt}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </Stack>

                    </form>
                )
            }


        </div>
    );
};