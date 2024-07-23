import {NavLink} from "react-router-dom";
import ButtonInTitle from "./organisms/ButtonInTitle.jsx";
import {Box, Divider, Stack} from "@mui/material";

const BreadcrumbsComponent = ({breadcrumbs}) => {
    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            {breadcrumbs.map((breadcrumb, index) => (
                <Stack key={breadcrumb.title} flexDirection={"row"} alignItems={"center"}>
                    <NavLink to={breadcrumb.link}><ButtonInTitle buttonTitle={breadcrumb.title}/></NavLink>
                    {index !== breadcrumbs.length - 1 && (
                        <Divider sx={{
                            color: 'rgba(221, 221, 221, 1)',
                            height: '2px',
                            width: '16px',
                            borderColor: 'gba(221, 221, 221, 1)',
                        }}/>
                    )}
                </Stack>
            ))}

        </Box>
    )
}

export default BreadcrumbsComponent;