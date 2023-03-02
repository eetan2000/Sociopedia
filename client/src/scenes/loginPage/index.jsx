import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from "./Form"

const LoginPage = () => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    return (
        <Box>
            {/**LOGO */}
            <Box 
                width="100%" 
                backgroundColor={theme.palette.background.alt} 
                p="1rem 6%" 
                textAlign="center"
            >
                <Typography 
                    fontWeight="bold" 
                    fontSize="32px"
                    color="primary"
                    >
                    Sociopedia
                </Typography>
            </Box>
            {/**Welcome sign and form component*/}

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                {/**Welcome sign */}
                <Typography 
                    fontWeight="500" 
                    variant="h5" 
                    sx={{ mb: "1.5rem" }}
                    >
                        Welcome to Sociopedia!
                </Typography>

                {/**Form component */}
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage