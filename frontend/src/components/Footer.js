import React, { useEffect, useState } from 'react'
function Footer() {
    return (
        <div className="footer-copyright text-center">© Copyright 2020-{new Date().getFullYear()}, FF Team </div>
    )
}

export default Footer
