import React from 'react'
import Image from "next/image"
import LOGO from "@/../public/LOGO-2.svg"


const Logo = () => {
    return (
        <>
            <Image src={LOGO} alt="logo" width={100} height={100} />

        </>
    )
}

export default Logo