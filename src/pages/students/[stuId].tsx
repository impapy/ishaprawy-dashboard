
import { NextPage } from "next"
import React, { useRef, useState } from "react"
import Layout from "components/UI/Layout"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography/Typography"

const Sellers: NextPage = () => {

    return (
        <Layout title="">
            <Stack justifyContent="space-between" direction="row" mb={3}>
                <Typography fontWeight={600} variant="h5">
                    Student
                </Typography>
            </Stack>
        </Layout>
    )
}


export default Sellers
