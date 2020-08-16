import React from 'react';
import './index.scss';

import wikipediaLogo from '../../styles/img/wikipedia-logo.jpg';

const getNamespaceImage = (name) => {}

const namespaces = ['wikipedia', 'two', 'three'];

const Namespace = ({namespace}) => {
    return (
        <div className="namespace">
            <img src={getNamespaceImage(namespace)}/>
            {namespace}
        </div>
    )
}

const Namespaces = ()=> {
    return (
    <div className="namespaces">
        {namespaces.map(namespace => <Namespace key={namespace} namespace={namespace} />) }
    </div>
    );
}

export default Namespaces;