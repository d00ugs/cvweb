import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {Row} from 'reactstrap';
import {CVMain} from './CVMain';
import {CVHead} from './CVHead';
import {CVQuote} from './CVQuote';
import {CVMe} from './CVMe';
import {CVPortfolio} from './CVPortfolio';
import {CVStats} from './CVStats';
import {CVSkills} from './CVSkillz';
import {CVTimeline} from './CVTimeline';

export class Home extends React.Component<RouteComponentProps<{}>> {

    public render() {
        return (
            <div>
                <CVHead/>

                <CVMe/>
            
                <CVMain/>

                <CVQuote/>

                <CVPortfolio/>

                <CVStats/>

                <CVSkills/>

                <CVTimeline/>
            </div>
        );
    }
}
