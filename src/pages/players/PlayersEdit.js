import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Backdrop, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getRequest, putRequest } from "../../utils/utils"

const PlayersEdit = () => {
    const [player, setPlayer] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sport, setSport] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [category, setCategory] = useState([]);
    const [townHall, setTownHall] = useState("");
    const [club, setClub] = useState("");
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

    const { id } = useParams()

    const getPlayer = async () => {
        getRequest(`players/${id}`)
            .then(async res => {
                const playerData = res.data
                console.log(playerData)
                setFirstName(playerData.firstName)
                setLastName(playerData.lastName)
                setSport(playerData.sport)
                const date = new Date(playerData.birthDate)
                const year = date.getFullYear()
                const month = date.getMonth()+1
                const day = date.getDate()
                const formatedDate = `${year}-${month < 10 ? '0'+month : month}-${day}`
                console.log(`${year}-${month < 10 ? '0'+month : month}-${day}`)
                setBirthDate(formatedDate)
                setCategory(playerData.category)
                setIdTH(playerData.idTH)
                setIdClub(playerData.idClub)
                setPlayer(playerData)
            })
    }

    const updatePlayer = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        putRequest(`players/${id}`, {
            "firstName": firstName,
            "lastName": lastName,
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
        getPlayer()
    }, []);

    useEffect(() => {
        if (!!player){
            getTownHall()
            getClub()
        }
    }, [player]);

    const handleClose = () => {
        setOpen(false);
    };

    const getTownHall = () => {
        getRequest(`townhalls/${player.idTH}`)
            .then((res) => {
                setTownHall(res.data.name)
            })
    }
    const getClub = () => {
        getRequest(`${process.env.REACT_APP_URL_API}/townhalls/${player.idTH}/clubs/${player.idClub}`)
            .then((res) => {
                console.log(res.data)
                setClub(res.data.name)
            })
    }


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const selectedSport = (e) => {
        const value = e.target.value
        setSport(value)
    }

    console.log(category)

    const categories = ["Seniors", "Minimes", "U20", "U15"]

    return (
        <div>
            <h1>Players</h1>

            <form onSubmit={updatePlayer}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="townhall"
                        variant="standard"
                        label="Townhall"
                        value={townHall}
                        disabled
                    />
                    <TextField
                        required
                        id="club"
                        variant="standard"
                        label="Club"
                        value={club}
                        disabled
                    />
                    <TextField
                        required
                        id="sport"
                        variant="standard"
                        label="Sport"
                        value={sport}
                        disabled
                    />
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
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="LastName"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        id="date"
                        variant="standard"
                        label="BirthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
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

export default PlayersEdit;