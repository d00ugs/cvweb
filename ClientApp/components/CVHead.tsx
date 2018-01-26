import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

export class CVHead extends React.Component<{}> {
   
    public render() {
        return (
            <Card>
                <CardImg height="30%" width="30%" src='http://dou.gs/wp-content/uploads/2014/06/12705795_10153250107817062_2436479254352800384_n-1.jpg' />
                <CardImgOverlay>
                    <h1 className="display-3">dougs</h1>
                    <hr className="my-2" />
                    <p><small>Dougal Kennedy</small></p>
                </CardImgOverlay>
            </Card>
        );
    }
}
