import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Backdrop, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField } from '@mui/material';
import { getRequest, postRequest, putRequest } from '../../utils/utils';

const MatchsEdit = () => {
    const [awayTeam, setAwayTeam] = useState("");
    const [homeTH, setHomeTH] = useState("");
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTH, setAwayTH] = useState("");
    const [place, setPlace] = useState("");
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState([]);
    const [homePoints, setHomePoints] = useState(0);
    const [awayPoints, setAwayPoints] = useState(0);
    const [homeFouls, setHomeFouls] = useState(0);
    const [awayFouls, setAwayFouls] = useState(0);
    const [duration, setDuration] = useState(0);
    const [homeIdTH, setHomeIdTH] = useState("");
    const [awayIdTH, setAwayIdTH] = useState("");
    const [homeIdClub, setHomeIdClub] = useState("");
    const [awayIdClub, setAwayIdClub] = useState("");
    const [isHomeSelected, setIsHomeSelected] = useState(false);
    const [isAwaySelected, setIsAwaySelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams()

    let navigate = useNavigate();

    const updatePlayer = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await putRequest(`matchs/${id}`, {
            "homeTeam": homeIdClub,
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
        getMatch()
    }, []);

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        getHomeClub()
    }, [homeIdClub]);

    useEffect(() => {
        getAwayClub()
    }, [awayIdClub]);

    const getMatch = () => {
        getRequest(`/matchs/${id}`)
            .then((res) => {
                const match = res.data
                const date = new Date(match.date)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const formatedDate = `${year}-${month < 10 ? '0' + month : month}-${day}`
                setDate(formatedDate)
                setDuration(match.duration)
                setPlace(match.place)
                setSport(match.sport)
                setCategory(match.category)
                setHomePoints(match.homePoints)
                setAwayPoints(match.awayPoints)
                setHomeFouls(match.homeFouls)
                setAwayFouls(match.awayFouls)
                setHomeIdClub(match.homeTeam)
                setAwayIdClub(match.awayTeam)
            })
    }

    const getHomeClub = () => {
        getRequest(`/clubs/${homeIdClub}`)
            .then((res) => {
                setHomeTeam(res.data.name)
                getRequest(`/townhalls/${res.data.idTH}`)
                    .then((res) => {
                        setHomeTH(res.data.name)
                    })
            })
    }

    const getAwayClub = () => {
        getRequest(`/clubs/${awayIdClub}`)
            .then((res) => {
                setAwayTeam(res.data.name)
                getRequest(`/townhalls/${res.data.idTH}`)
                    .then((res) => {
                        setAwayTH(res.data.name)
                    })
            })
    }


    return (
        <div>
            <h1>Matchs</h1>
            {
                awayTeam && homeTeam && (
                    <form onSubmit={updatePlayer}>
                        <Stack direction="column" spacing={3}>
                            <Stack direction="row" spacing={10} justifyContent={'center'}>
                                <TextField
                                    id="sport"
                                    label="Sport"
                                    variant="standard"
                                    defaultValue={sport}
                                    disabled
                                />
                                <TextField
                                    id="category"
                                    label="Category"
                                    variant="standard"
                                    defaultValue={category}
                                    disabled
                                />
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
                                    <TextField
                                        id="homeTownhall"
                                        label="Townhall"
                                        variant="standard"
                                        defaultValue={homeTH}
                                        disabled
                                    />

                                    <TextField
                                        id="homeTeam"
                                        label="Club"
                                        variant="standard"
                                        defaultValue={homeTeam}
                                        disabled
                                    />



                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Points"
                                        variant="standard"
                                        type="number"
                                        value={homePoints}
                                        onChange={(e) => setHomePoints(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Fouls"
                                        variant="standard"
                                        type="number"
                                        value={homeFouls}
                                        onChange={(e) => setHomeFouls(e.target.value)}
                                    />
                                </Stack>
                                <Stack direction="column" spacing={3} width="100%">
                                    <TextField
                                        id="awayTownhall"
                                        label="Townhall"
                                        variant="standard"
                                        defaultValue={awayTH}
                                        disabled
                                    />

                                    <TextField
                                        id="awayTeam"
                                        label="Club"
                                        variant="standard"
                                        defaultValue={awayTeam}
                                        disabled
                                    />

                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Points"
                                        variant="standard"
                                        type="number"
                                        value={awayPoints}
                                        onChange={(e) => setAwayPoints(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Fouls"
                                        variant="standard"
                                        type="number"
                                        value={awayFouls}
                                        onChange={(e) => setAwayFouls(e.target.value)}
                                    />
                                </Stack>
                            </Stack>




                            <Button type='submit' variant="contained">Add Match</Button>
                        </Stack>
                    </form>
                )
            }

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

export default MatchsEdit;