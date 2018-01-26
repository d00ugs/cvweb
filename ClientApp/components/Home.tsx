import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {Row} from 'reactstrap';
import {CVMain} from './CVMain';
import {CVHead} from './CVHead';

export class Home extends React.Component<RouteComponentProps<{}>> {

    public render() {
        return (
            <div>
                <CVHead />
            
                <CVMain />
            </div>
        );
    }
}
