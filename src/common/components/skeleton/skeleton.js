import React from 'react'

import ContentLoader from "react-content-loader"

const MyLoader = props => (
    <ContentLoader
        height={360}
        width={395}
        speed={1}
        primaryColor="#e7e7e7"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="3" ry="3" width="393" height="250" />
        <rect x="16" y="272" rx="0" ry="0" width="300" height="33" />
        <rect x="16" y="313" rx="0" ry="0" width="113" height="18" />
        <rect x="16" y="339.4" rx="0" ry="0" width="126.9" height="19.6" />
    </ContentLoader>
)

export default MyLoader