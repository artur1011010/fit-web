import {Fab, useScrollTrigger, Zoom} from "@mui/material";
import Box from "@mui/material/Box";
import {useCallback} from "react";
import {KeyboardArrowUp} from "@mui/icons-material";

function ScrollToTopFab() {
    const trigger = useScrollTrigger({
        threshold: 100,
    })
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                // Place the button in the bottom right corner.
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                    zIndex: 1,
                }}
            >
                <Fab
                    onClick={scrollToTop}
                    color="primary"
                    size="small"
                    aria-label="Scroll back to top"
                >
                    <KeyboardArrowUp fontSize="medium" />
                </Fab>
            </Box>
        </Zoom>
    )
}
export default ScrollToTopFab