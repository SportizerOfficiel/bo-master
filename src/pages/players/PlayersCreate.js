import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getRequest, postRequest } from '../../utils/utils';

const PlayersCreate = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [sport, setSport] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [category, setCategory] = useState([]);
    const [idTH, setIdTH] = useState("");
    const [idClub, setIdClub] = useState("");
    const [listTownHalls, setListTownHalls] = useState();
    const [listClubs, setListClubs] = useState();
    const [isTHSelected, setIsTHSelected] = useState(false);
    const [isSportSelected, setIsSportSelected] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const search = useLocation().search;
    let navigate = useNavigate();
    // const idTHToCreate = new URLSearchParams(search).get('idTH')
    // console.log(idTHToCreate)
    // if (idTHToCreate !== null) {
    //     setIdTH(idTHToCreate)
    // }

    const addPlayer = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await postRequest(`players`, {
            "firstName": firstName,
            "lastName": lastName,
            "sport": sport,
            "birthDate": birthDate,
            "category": category,
            "idTH": idTH,
            "idClub": idClub
        })
            .then((result) => {
                navigate("/players")
            }).catch((e) => {
                setOpen(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getListTownHalls()
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getListClubs()
    }, [sport]);

    const getListTownHalls = () => {
        getRequest(`townhalls`)
            .then((res) => {
                setListTownHalls(res.data)
            })
    }
    const getListClubs = () => {
        getRequest(`townhalls/${idTH}/clubs?filter={"sport": "${sport}"}`)
            .then((res) => {
                setListClubs(res.data)
            })
    }

    const selectedTownHall = (e) => {
        const value = e.target.value
        console.log(value)
        setIdTH(value)
        value !== "" ? setIsTHSelected(true) : setIsTHSelected(false)
    }

    const selectedSport = (e) => {
        const value = e.target.value
        setSport(value)
        value !== "" ? setIsSportSelected(true) : setIsSportSelected(false)
    }

    const selectedClub = (e) => {
        const value = e.target.value
        setIdClub(value)
        value !== "" ? setIsSelected(true) : setIsSelected(false)
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log(category)

    const categories = ["Seniors", "Minimes", "U20", "U15"]

    return (
        <div>
            <h1>Players</h1>

            <form onSubmit={addPlayer}>
                <Stack direction="column" spacing={3}>
                    <FormControl>
                        <InputLabel id="townhall">TownHall</InputLabel>
                        <Select
                            id="townhall"
                            label="Townhall"
                            variant="standard"
                            onChange={selectedTownHall}
                            required
                        >
                            {
                                listTownHalls?.map(townhall => {
                                    return <MenuItem value={townhall.id} key={townhall.id}>{townhall.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="sport">Sport</InputLabel>
                        <Select
                            id="sport"
                            label="Sport"
                            variant="standard"
                            onChange={selectedSport}
                            required
                            disabled={!(isTHSelected)}
                        >
                            <MenuItem value="Basket" key="">Basket</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="club">Club</InputLabel>
                        <Select
                            id="club"
                            label="Club"
                            variant="standard"
                            onChange={selectedClub}
                            required
                            disabled={!(isSportSelected && isTHSelected)}
                        >
                            {
                                listClubs?.map(club => {
                                    return <MenuItem value={club.id} key={club.id}>{club.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            id="category"
                            multiple
                            variant="standard"
                            value={category}
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {categories.map((cat) => (
                                <MenuItem
                                    key={cat}
                                    value={cat}
                                >
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <TextField
                        required
                        id="standard-required"
                        label="FirstName"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isSelected}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="LastName"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isSelected}
                    />
                    <TextField
                        id="date"
                        variant="standard"
                        label="BirthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        disabled={!isSelected}
                    />
                    <Button type='submit' variant="contained">Add Player</Button>
                </Stack>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    An error has occured
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default PlayersCreate;