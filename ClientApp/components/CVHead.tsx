import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

export class CVHead extends React.Component<{}> {
   
    public render() {
        return (
            <Card>
                <CardImg src='/img/dougs.png' />
                <CardImgOverlay>
                    <h1 className="display-3">dougs</h1>
                    <hr className="my-2" />
                    <p><small>Dougal Kennedy</small></p>
                </CardImgOverlay>
            </Card>
        );
    }
}
