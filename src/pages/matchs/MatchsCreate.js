import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getRequest, postRequest } from '../../utils/utils';

const MatchsCreate = () => {
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [place, setPlace] = useState("");
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState([]);
    const [homePoints, setHomePoints] = useState(0);
    const [awayPoints, setAwayPoints] = useState(0);
    const [homeFouls, setHomeFouls] = useState(0);
    const [awayFouls, setAwayFouls] = useState(0);
    const [duration, setDuration] = useState(0);
    const [idTH, setIdTH] = useState("");
    const [idClub, setIdClub] = useState("");
    const [homeIdTH, setHomeIdTH] = useState("");
    const [awayIdTH, setAwayIdTH] = useState("");
    const [HomeIdClub, setHomeIdClub] = useState("");
    const [awayIdClub, setAwayIdClub] = useState("");
    const [listTownHalls, setListTownHalls] = useState();
    const [listHomeClubs, setListHomeClubs] = useState();
    const [listAwayClubs, setListAwayClubs] = useState();
    const [isHomeTHSelected, setIsHomeTHSelected] = useState(false);
    const [isAwayTHSelected, setIsAwayTHSelected] = useState(false);
    const [isSportSelected, setIsSportSelected] = useState(false);
    const [isHomeSelected, setIsHomeSelected] = useState(false);
    const [isAwaySelected, setIsAwaySelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const search = useLocation().search;
    let navigate = useNavigate();
    // const idTHToCreate = new URLSearchParams(search).get('idTH')
    // console.log(idTHToCreate)
    // if (idTHToCreate !== null) {
    //     setIdTH(idTHToCreate)
    // }

    const addMatch = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await postRequest(`matchs`, {
            "homeTeam": HomeIdClub,
            "awayTeam": awayIdClub,
            "sport": sport,
            "date": date,
            "category": category,
            "homePoints": homePoints,
            "awayPoints": awayPoints,
            "homeFouls": homeFouls,
            "awayFouls": awayFouls,
            "duration": duration,
            "place": place,
        })
            .then((result) => {
                navigate("/matchs")
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
        getListHomeClubs()
    }, [homeIdTH]);

    useEffect(() => {
        getListAwayClubs()
    }, [awayIdTH]);

    const getListTownHalls = () => {
        getRequest(`townhalls`)
            .then((res) => {
                setListTownHalls(res.data)
            })
    }
    const getListHomeClubs = () => {
        getRequest(`townhalls/${homeIdTH}/clubs?filter={"sport": "${sport}"}`)
            .then((res) => {
                setListHomeClubs(res.data)
            })
    }
    const getListAwayClubs = () => {
        getRequest(`townhalls/${awayIdTH}/clubs?filter={"sport": "${sport}"}`)
            .then((res) => {
                setListAwayClubs(res.data)
            })
    }

    const selectedHomeTownHall = (e) => {
        const value = e.target.value
        console.log(value)
        setHomeIdTH(value)
        value !== "" ? setIsHomeTHSelected(true) : setIsHomeTHSelected(false)
    }
    const selectedAwayTownHall = (e) => {
        const value = e.target.value
        console.log(value)
        setAwayIdTH(value)
        value !== "" ? setIsAwayTHSelected(true) : setIsAwayTHSelected(false)
    }

    const selectedSport = (e) => {
        const value = e.target.value
        setSport(value)
        value !== "" ? setIsSportSelected(true) : setIsSportSelected(false)
    }

    const selectedHomeClub = (e) => {
        const value = e.target.value
        setHomeIdClub(value)
        value !== "" ? setIsHomeSelected(true) : setIsHomeSelected(false)
    }

    const selectedAwayClub = (e) => {
        const value = e.target.value
        setAwayIdClub(value)
        value !== "" ? setIsAwaySelected(true) : setIsAwaySelected(false)
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
            <h1>Matchs</h1>

            <form onSubmit={addMatch}>
                <Stack direction="column" spacing={3}>
                    <Stack direction="row" spacing={10} justifyContent={'center'}>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="sport">Sport</InputLabel>
                            <Select
                                id="sport"
                                label="Sport"
                                variant="standard"
                                onChange={selectedSport}
                                required
                            >
                                <MenuItem value="Basket" key="">Basket</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                id="category"
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
                            id="date"
                            variant="standard"
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            sx={{ width: 200 }}
                        />
                        <TextField
                            id="duration"
                            variant="standard"
                            label="Duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            sx={{ width: 200 }}
                        />
                        <TextField
                            id="place"
                            variant="standard"
                            label="Place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                            sx={{ width: 200 }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={20}>
                        <Stack direction="column" spacing={3} width="100%">
                            <FormControl>
                                <InputLabel id="townhall">TownHall</InputLabel>
                                <Select
                                    id="townhall"
                                    label="Townhall"
                                    variant="standard"
                                    onChange={selectedHomeTownHall}
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
                                <InputLabel id="club">Club</InputLabel>
                                <Select
                                    id="club"
                                    label="Club"
                                    variant="standard"
                                    onChange={selectedHomeClub}
                                    required
                                    disabled={!(isSportSelected && isHomeTHSelected)}
                                >
                                    {
                                        listHomeClubs?.map(club => {
                                            return <MenuItem value={club.id} key={club.id}>{club.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>



                            <TextField
                                required
                                id="standard-required"
                                label="Points"
                                variant="standard"
                                type="number"
                                value={homePoints}
                                onChange={(e) => setHomePoints(e.target.value)}
                                disabled={!isHomeSelected}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Fouls"
                                variant="standard"
                                type="number"
                                value={homeFouls}
                                onChange={(e) => setHomeFouls(e.target.value)}
                                disabled={!isHomeSelected}
                            />
                        </Stack>
                        <Stack direction="column" spacing={3}  width="100%">
                            <FormControl>
                                <InputLabel id="townhall">TownHall</InputLabel>
                                <Select
                                    id="townhall"
                                    label="Townhall"
                                    variant="standard"
                                    onChange={selectedAwayTownHall}
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
                                <InputLabel id="club">Club</InputLabel>
                                <Select
                                    id="club"
                                    label="Club"
                                    variant="standard"
                                    onChange={selectedAwayClub}
                                    required
                                    disabled={!(isSportSelected && isAwayTHSelected)}
                                >
                                    {
                                        listAwayClubs?.map(club => {
                                            return <MenuItem value={club.id} key={club.id}>{club.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>



                            <TextField
                                required
                                id="standard-required"
                                label="Points"
                                variant="standard"
                                type="number"
                                value={awayPoints}
                                onChange={(e) => setAwayPoints(e.target.value)}
                                disabled={!isAwaySelected}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Fouls"
                                variant="standard"
                                type="number"
                                value={awayFouls}
                                onChange={(e) => setAwayFouls(e.target.value)}
                                disabled={!isAwaySelected}
                            />
                        </Stack>
                    </Stack>




                    <Button type='submit' variant="contained">Add Match</Button>
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

export default MatchsCreate;