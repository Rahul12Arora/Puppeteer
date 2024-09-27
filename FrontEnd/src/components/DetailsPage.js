import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Card, CardContent, TextField, Link, IconButton } from "@mui/material";
import { Phone, Email, Facebook, Instagram, Twitter, LinkedIn,  } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import HttpService from "../services/httpService";

const DetailsPage = () => {
    const { id } = useParams();
    const [displayData, setDisplayData] = useState({})

    const getDataOnPageLoading = async ()=>{
        const response = await HttpService.all();
        setDisplayData(response.data[id-1]);
        // const imageData = await HttpService.getImageForUrl();
    }
    useEffect(()=>{
        getDataOnPageLoading();
    },[])

    // console.log('displayData is ',displayData)
    return (
        <>
        <Box sx={{ padding: 2, backgroundColor: "#f4f4f4", height: "100vh" }}>
            {/* Full-width header divided into three parts */}
            <Grid container spacing={0} sx={{ backgroundColor: "#fff", borderRadius: 2, minHeight: "200px" }}>
                {/* Left Half: Contains Logo and Description (Side by Side) */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                    {/* Logo (Left Side) */}
                    <Box sx={{ marginRight: 2 }}>
                        <img
                            src={displayData?.logo}
                            alt={`${displayData?.name} Logo`}
                            style={{ width: "200px" }}
                        />
                    </Box>


                    <div>
                        {/* Netflix Heading */}
                        <Typography variant="h3">{displayData.name || 'Netflix'}</Typography>

                        {/* Description with Icon Button */}
                        <Box sx={{ marginBottom: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton style={{ backgroundColor: '#ffffff' }} >
                                    <InfoIcon /> {/* Replace with the appropriate icon */}
                                </IconButton>
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    Description
                                </Typography>
                            </Box>
                            <Typography variant="h6" style={{ marginTop: '10px' }}>
                                {/* Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more. */}
                                {displayData.description}
                            </Typography>
                        </Box>

                    </div>
                </Grid>

                {/* Right Half: contains contact information */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: 2 }}
                >
                    {/* Divider Line */}
                    <Box sx={{ borderLeft: '2px solid #e0e0e0', height: '100%', marginRight: 2, paddingLeft: 2 }}>
                        <Box sx={{ marginBottom: 1, display: "flex", alignItems: "center" }}>
                            <Phone sx={{ marginRight: 1 }} />
                            <Typography variant="body2">
                                {/* (573)-456-4644 */}
                                {displayData.contact || "(573)-456-4644"}
                                </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Email sx={{ marginRight: 1 }} />
                            <Typography variant="body2">
                                {displayData.email || "sample@mail.com"}
                                {/* contact@netflix.com */}
                                </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Two boxes below the header */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* Left side - Company Details */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Company Details
                            </Typography>

                            {/* Website */}
                            <Box sx={{ marginBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Link href={displayData.url || "website.com"} underline="hover">
                                        <Typography variant="body2" sx={{ marginRight: 1 }}>
                                            Website
                                        </Typography>
                                    </Link>
                                </Box>
                                <Typography variant="body2">
                                    {/* netflix.com */}
                                    {displayData.url || "website.com"}
                                    </Typography>
                            </Box>

                            {/* Description with Icon Button */}
                            <Box sx={{ marginBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton>
                                        <InfoIcon /> {/* Replace with the appropriate icon */}
                                    </IconButton>
                                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                        Description
                                    </Typography>
                                </Box>
                                <Typography variant="body2">
                                    {/* Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more. */}
                                    {displayData.description || 'N/A'}
                                </Typography>
                            </Box>

                            {/* Email */}
                            <Box sx={{ marginBottom: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ marginRight: 1 }}>
                                        Email
                                    </Typography>
                                </Box>
                                <Typography variant="body2">
                                    {/* contact@netflix.com */}
                                    {displayData.email || 'N/A'}
                                    </Typography>
                            </Box>

                            {/* Social Media Links */}
                                <Box sx={{ marginBottom: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Facebook sx={{ marginRight: 1 }} />
                                        <Typography variant="body2">Facebook</Typography>
                                    </Box>
                                    <Link href={(displayData?.facebookURLs && displayData.facebookURLs[0]) ? displayData.facebookURLs[0] : 'N/A'} underline="hover">
                                        {(displayData?.facebookURLs && displayData.facebookURLs[0]) ? displayData.facebookURLs[0] : 'N/A'}
                                    </Link>
                                </Box>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Instagram sx={{ marginRight: 1 }} />
                                        <Typography variant="body2">Instagram</Typography>
                                    </Box>
                                    <Link href={(displayData?.instagramURLs && displayData.instagramURLs[0]) ? displayData.instagramURLs[0] : 'N/A'} underline="hover">
                                        {(displayData?.instagramURLs && displayData.instagramURLs[0]) ? displayData.instagramURLs[0] : 'N/A'}
                                    </Link>
                                </Box>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Twitter sx={{ marginRight: 1 }} />
                                        <Typography variant="body2">Twitter</Typography>
                                    </Box>
                                    <Link href={(displayData?.twitterURLs && displayData.twitterURLs[0]) ? displayData.twitterURLs[0] : 'N/A'} underline="hover">
                                        {(displayData?.twitterURLs && displayData.twitterURLs[0]) ? displayData.twitterURLs[0] : 'N/A'}
                                    </Link>
                                </Box>

                                <Box sx={{ marginBottom: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LinkedIn sx={{ marginRight: 1 }} />
                                        <Typography variant="body2">LinkedIn</Typography>
                                    </Box>
                                    <Link href={(displayData?.linkedinURLs && displayData.linkedinURLs[0]) ? displayData.linkedinURLs[0] : 'N/A'} underline="hover">
                                        {(displayData?.linkedinURLs && displayData.linkedinURLs[0]) ? displayData.linkedinURLs[0] : 'N/A'}
                                    </Link>
                                </Box>

                            {/* Address */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ marginRight: 1 }}>
                                        Address
                                    </Typography>
                                </Box>
                                <Typography variant="body2">San Francisco, United States</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right side - Screenshot of the webpage */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ padding: 2 }}>
                        {/* <Box
                            component="img"
                            src="https://pageflows.com/media/videos/OnboardingNetflx.mov.mp4-screenshot-.jpg"
                            alt="Netflix Screenshot"
                            sx={{ width: "100%", borderRadius: 2 }}
                        /> */}
                        <img
                            src={displayData.imageData}
                            alt={displayData.name}
                            style={{ width: '100%', height: '100%' }} // Adjust size as needed
                        />
                    </Card>
                </Grid>
            </Grid>

        </Box>
        </>
    );
    // return (
    //     <>
    //     <Box sx={{ padding: 2, backgroundColor: "#f4f4f4", height: "100vh" }}>
    //         {/* Full-width header divided into three parts */}
    //         <Grid container spacing={0} sx={{ backgroundColor: "#fff", borderRadius: 2, minHeight: "200px" }}>
    //             {/* Left Half: Contains Logo and Description (Side by Side) */}
    //             <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
    //                 {/* Logo (Left Side) */}
    //                 <Box sx={{ marginRight: 2 }}>
    //                     <img
    //                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEqgLFHEKS88Zp7YCu8EzyD65Rw2huxmWrw&s"
    //                         alt="Netflix Logo"
    //                         style={{ width: "200px" }}
    //                     />
    //                 </Box>


    //                 <div>
    //                     {/* Netflix Heading */}
    //                     <Typography variant="h3">Netflix</Typography>

    //                     {/* Description with Icon Button */}
    //                     <Box sx={{ marginBottom: 2 }}>
    //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                             <IconButton style={{ backgroundColor: '#ffffff' }} >
    //                                 <InfoIcon /> {/* Replace with the appropriate icon */}
    //                             </IconButton>
    //                             <Typography variant="body2" sx={{ marginLeft: 1 }}>
    //                                 Description
    //                             </Typography>
    //                         </Box>
    //                         <Typography variant="h6" style={{ marginTop: '10px' }}>
    //                             Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more.
    //                         </Typography>
    //                     </Box>

    //                 </div>
    //             </Grid>

    //             {/* Right Half: contains contact information */}
    //             <Grid
    //                 item
    //                 xs={12}
    //                 md={6}
    //                 sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: 2 }}
    //             >
    //                 {/* Divider Line */}
    //                 <Box sx={{ borderLeft: '2px solid #e0e0e0', height: '100%', marginRight: 2, paddingLeft: 2 }}>
    //                     <Box sx={{ marginBottom: 1, display: "flex", alignItems: "center" }}>
    //                         <Phone sx={{ marginRight: 1 }} />
    //                         <Typography variant="body2">(573)-456-4644</Typography>
    //                     </Box>
    //                     <Box sx={{ display: "flex", alignItems: "center" }}>
    //                         <Email sx={{ marginRight: 1 }} />
    //                         <Typography variant="body2">contact@netflix.com</Typography>
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         </Grid>

    //         {/* Two boxes below the header */}
    //         <Grid container spacing={2} sx={{ marginTop: 2 }}>
    //             {/* Left side - Company Details */}
    //             <Grid item xs={12} md={4}>
    //                 <Card sx={{ padding: 2 }}>
    //                     <CardContent>
    //                         <Typography variant="h6" gutterBottom>
    //                             Company Details
    //                         </Typography>

    //                         {/* Website */}
    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Link href="https://netflix.com" underline="hover">
    //                                     <Typography variant="body2" sx={{ marginRight: 1 }}>
    //                                         Website
    //                                     </Typography>
    //                                 </Link>
    //                             </Box>
    //                             <Typography variant="body2">netflix.com</Typography>
    //                         </Box>

    //                         {/* Description with Icon Button */}
    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <IconButton>
    //                                     <InfoIcon /> {/* Replace with the appropriate icon */}
    //                                 </IconButton>
    //                                 <Typography variant="body2" sx={{ marginLeft: 1 }}>
    //                                     Description
    //                                 </Typography>
    //                             </Box>
    //                             <Typography variant="body2">
    //                                 Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more.
    //                             </Typography>
    //                         </Box>

    //                         {/* Email */}
    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Typography variant="body2" sx={{ marginRight: 1 }}>
    //                                     Email
    //                                 </Typography>
    //                             </Box>
    //                             <Typography variant="body2">contact@netflix.com</Typography>
    //                         </Box>

    //                         {/* Social Media Links */}
    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Facebook sx={{ marginRight: 1 }} />
    //                                 <Typography variant="body2">Facebook</Typography>
    //                             </Box>
    //                             <Link href="https://www.facebook.com/netflix" underline="hover">
    //                                 facebook.com/netflix
    //                             </Link>
    //                         </Box>

    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Instagram sx={{ marginRight: 1 }} />
    //                                 <Typography variant="body2">Instagram</Typography>
    //                             </Box>
    //                             <Link href="https://www.instagram.com/netflix" underline="hover">
    //                                 instagram.com/netflix
    //                             </Link>
    //                         </Box>

    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Twitter sx={{ marginRight: 1 }} />
    //                                 <Typography variant="body2">Twitter</Typography>
    //                             </Box>
    //                             <Link href="https://www.twitter.com/netflix" underline="hover">
    //                                 twitter.com/netflix
    //                             </Link>
    //                         </Box>

    //                         <Box sx={{ marginBottom: 2 }}>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <LinkedIn sx={{ marginRight: 1 }} />
    //                                 <Typography variant="body2">LinkedIn</Typography>
    //                             </Box>
    //                             <Link href="https://www.linkedin.com/company/netflix" underline="hover">
    //                                 linkedin.com/company/netflix
    //                             </Link>
    //                         </Box>

    //                         {/* Address */}
    //                         <Box>
    //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                                 <Typography variant="body2" sx={{ marginRight: 1 }}>
    //                                     Address
    //                                 </Typography>
    //                             </Box>
    //                             <Typography variant="body2">San Francisco, United States</Typography>
    //                         </Box>
    //                     </CardContent>
    //                 </Card>
    //             </Grid>

    //             {/* Right side - Screenshot of the webpage */}
    //             <Grid item xs={12} md={8}>
    //                 <Card sx={{ padding: 2 }}>
    //                     <Box
    //                         component="img"
    //                         src="https://pageflows.com/media/videos/OnboardingNetflx.mov.mp4-screenshot-.jpg"
    //                         alt="Netflix Screenshot"
    //                         sx={{ width: "100%", borderRadius: 2 }}
    //                     />
    //                 </Card>
    //             </Grid>
    //         </Grid>

    //     </Box>
    //     </>
    // );
};

export default DetailsPage;
