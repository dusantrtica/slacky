import React from 'react';
import './index.scss';

import wikipediaLogo from '../../styles/img/wikipedia-logo.jpg';

const getNamespaceImage = (name) => {}

const Namespace = ({namespace, onClickNamespace}) => {
    return (
        <div className="namespace" onClick={() => onClickNamespace(namespace)}>
            <img src={getNamespaceImage(namespace)}/>
            {namespace.endpoint.substr(1)}
        </div>
    )
}

const Namespaces = ({namespaces = [], onClickNamespace, selectedNamespace})=> {
    return (
    <div className="namespaces">
        {namespaces.map(namespace => <Namespace key={namespace.endpoint} namespace={namespace} onClickNamespace={onClickNamespace} />) }
    </div>
    );
}

export default Namespaces;