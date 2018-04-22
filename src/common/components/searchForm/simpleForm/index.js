import React from 'react'
import NameSearch from '../nameSearch'
import DateSearch from '../dateSearch'
class SimpleForm extends React.Component {
    render(){
        return(
            <div>
                <NameSearch/>
                <DateSearch/>
            </div>
        )
    }
}

