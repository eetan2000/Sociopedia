import { useState } from "react"
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material"
import {
    Search,
    Message,
    DarkMode,
    LightMode, 
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "components/FlexBetween"


const Navbar = () => {
    // value to determine if we want to open up the mobile menu when in its in a small screen
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    
    const dispatch = useDispatch() // used to dispatch actions from the reducers
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    // allows us to determine if the cur screen size is below or higher a min width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const theme = useTheme() // allows us to themes in theme.js
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt

    const fullName = `${user.firstName} ${user.lastName}`


    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography 
                fontWeight="bold" 
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}>
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor="{neutralLight}" borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        {/**<InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search />
                        </IconButton>*/}
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? 
            (<FlexBetween gap="2rem">
                {/** Darkmode changing button using redux*/}
                <IconButton onClick={() => dispatch(setMode())}>
                    {
                    theme.palette.mode === "dark" ? 
                    (<DarkMode sx={{fontsize: "25px"}}/>) :
                    (<LightMode sx={{color: dark, fontsize: "25px"}}/>)
                    }
                </IconButton>

                {/**
                 <Message sx={{fontsize: "25px"}} />
                 <Notifications sx={{fontsize: "25px"}} />
                 <Help sx={{fontsize: "25px"}} />
                 */}

                {/**For drop down on the top right */}
                <FormControl variant="standard" value={fullName} >
                    <Select 
                    value={fullName} 
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus": {
                            backgroundColor: neutralLight
                        }
                    }}
                    input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>) : 
            (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>)}
            {/**Ternary ends here */}

            {/**Mobile Nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed" 
                right="0" 
                bottom="0" 
                height="100%" 
                zIndex="10" 
                maxWidth="500px" 
                minWidth="300px" 
                backgroundColor={background}>
                    {/**CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton 
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/**MENU ITEMS */}
                    <FlexBetween 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    gap="3rem"
                    >
                    {/** Darkmode changing button using redux*/}
                    <IconButton 
                    onClick={() => dispatch(setMode())}
                    sx={{fontsize: "25px"}}
                    >
                        {
                        theme.palette.mode === "dark" ? 
                        (<DarkMode sx={{fontsize: "25px"}}/>) :
                        (<LightMode sx={{color: dark, fontsize: "25px"}}/>)
                        }
                    </IconButton>

                    <Message sx={{fontsize: "25px"}} />
                    <Notifications sx={{fontsize: "25px"}} />
                    <Help sx={{fontsize: "25px"}} />

                    {/**For drop down on the top right */}
                    <FormControl variant="standard" value={fullName} >
                        <Select 
                        value={fullName} 
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>)
                </Box>
            )}
        </FlexBetween>
    )
}

export default Navbar