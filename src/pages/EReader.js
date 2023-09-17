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
                    url="https://standardebooks.org/ebooks/bram-stoker/dracula/downloads/bram-stoker_dracula.epub"
                />
            </div>
        </div>  
    )
}

export default EReader