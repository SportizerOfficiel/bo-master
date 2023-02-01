import { Alert, Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getRequest, postRequest } from '../../utils/utils';

export const ClubsCreate = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [sport, setSport] = useState("");
    const [idTH, setIdTH] = useState("");
    const [listTownHalls, setListTownHalls] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();
    const search = useLocation().search;
    // const idTHToCreate = new URLSearchParams(search).get('idTH')
    // console.log(idTHToCreate)
    // if (idTHToCreate !== null) {
    //     setIdTH(idTHToCreate)
    // }

    const addClub = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        postRequest(`clubs`, {
            "name": name,
            "sport": sport,
            "address": address,
            "idTH": idTH
        })
        .then(() => {
            navigate("/clubs")
        }).catch((e) => {
            setOpen(true)
          }).finally(()=>{
            setIsLoading(false)
          })
        setName("")
        setAddress("")
        setSport("")
        setIdTH("")
    }

    useEffect(() => {
        getListTownHalls()
    }, []);

    const getListTownHalls = () => {
        getRequest(`townhalls`)
            .then((res) => {
                setListTownHalls(res.data)
            })
    }

    console.log(sport)

    const selectedTownHall = (e) => {
        const value = e.target.value
        setIdTH(value)
        value !== "" ? setIsSelected(true) : setIsSelected(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>Clubs</h1>

            <form onSubmit={addClub}>
                <Stack direction="column" spacing={3}>
                    <FormControl required>
                        <InputLabel id="townhall">TownHall</InputLabel>
                        <Select
                            id="townhall"
                            variant="standard"
                            label="Townhall"
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
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isSelected}
                    />
                    <FormControl required>
                        <InputLabel id="sport">Sport</InputLabel>
                        <Select
                            id="sport"
                            label="Sport"
                            variant="standard"
                            onChange={(e) => setSport(e.target.value)}
                            required
                            disabled={!isSelected}
                        >
                            <MenuItem value="Basket" key="">Basket</MenuItem>
                            {/* <MenuItem value="Foot" key="">Foot</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="standard-required"
                        label="Address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!isSelected}
                    />
                    <Button type='submit' variant="contained">Add Club</Button>
                </Stack>
            </form >

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
        </div >
    );

    // [ "Richard", "Mata", "Coates", "Mckinney", "Newton", "Tyson", "Winters", "Hancock", "Meyer", "Sharpe", "Kirkland", "Dolan", "Sinclair", "Childs", "Prentice", "Valenzuela", "Lott", "Wallis", "Anthony", "Hawkins", "Lane", "Wormald", "Matthams", "Irving", "Mcintosh", "Velazquez", "Pham", "Bull", "Yoder", "Ashley", "Mooney", "Mcgrath", "Nava", "Wilkinson", "Burks", "Friedman", "Rasmussen", "Haynes", "Larson", "Madden"]

    // ["Wallace", "Ahmet", "Elisha", "Kenan", "Ayaan", "Huey", "Claudia", "Diya", "Christie", "Etienne", "Zidan", "Regan", "Yasir", "Lamar", "Emir ", "Raymond", "Filip", "Jareth", "Henley", "Macey", "Krzysztof", "Macauley", "Konnor", "Tanner", "Lachlan", "Ariya", "Elmer", "Mikey", "Thiago", "Mahir", "Giorgio", "Hareem ", "Miles", "Stefan", "Dimitri", "Indigo", "Belle", "Zakariya", "Rowan", "Brennan"]
};