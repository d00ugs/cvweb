import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

export class CVHead extends React.Component<{}> {
   
    public render() {
        return (
            <Card inverse>
                <CardImg src="/img/dougs.png" />
                <CardImgOverlay className="d-flex">
                    <div className="my-auto mx-auto text-center">
                        <h1 className="display-1"><strong>dougs</strong></h1>
                        <hr className="my-2" />
                        <p>Dougal Kennedy</p>
                    </div>
                </CardImgOverlay>
            </Card>
        );
    }
}
