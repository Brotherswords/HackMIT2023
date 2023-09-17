import React, { useState } from 'react'
import { ReactReader } from 'react-reader'


const EReader = () => {

    const [location, setLocation] = useState(null)

    const locationChanged = epubcifi => {
        setLocation(epubcifi)
    }

    return (
        <div className='EReader'>
            <div className='ReactReaderWrapper' style={{ height: '100vh' }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    url="https://react-reader.metabits.no/files/alice.epub"
                />
            </div>
        </div>  
    )
}

export default EReader