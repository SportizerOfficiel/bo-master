import { Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

export const TownHallsShow = () => {
    const [townHall, setTownHall] = useState(false);


    const { id } = useParams()

    console.log(id)

    const GetTownHall = async () => {
        await getRequest(`townhalls/${id}`)
            .then(async res => {
                setTownHall(res.data)
            })
    }


    useEffect(() => {
        GetTownHall()
    }, []);


    return (
        <div>
            <h1>Club Show</h1>

            {
                townHall && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Name"
                                variant="standard"
                                defaultValue={townHall.name}
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
                                label="CreatedAt"
                                variant="standard"
                                defaultValue={townHall.createdAt}
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