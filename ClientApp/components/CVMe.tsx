import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Row, Col, Card, CardImg, CardImgOverlay, CardDeck, CardBlock, CardBody } from 'reactstrap';

interface CVMeDataState {
    born: string;
    workas: string;
    email: string;
    email_tld: string;
}

export class CVMe extends React.Component<{}, CVMeDataState> {
    constructor() {
        super({});
        this.state = { born: '', workas: '', email: '', email_tld: '' };

        fetch('http://localhost:8080/api/cv/born')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ born: recv});
            });
            fetch('http://localhost:8080/api/cv/workas')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ workas: recv});
            });
            fetch('http://localhost:8080/api/cv/email')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ email: recv});
            });
            fetch('http://localhost:8080/api/cv/email_tld')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ email_tld: recv});
            });
   }

    public render() {
        let contents = CVMe.renderCVOverview(this.state);
        return (
            <Row>
                <Col></Col>
                <Col xs="8">{ contents }</Col>
                <Col></Col>
            </Row>
        );
    }

    private static renderCVOverview(data: CVMeDataState) {
        return (
            <div>
            <CardDeck>
                <Card>
                    <CardBody><p><strong>Born</strong></p><p>{data.born}</p></CardBody>
                </Card>
                <Card>
                    <CardBody><p><strong>Work as</strong></p><p>{data.workas}</p></CardBody>
                </Card>
                <Card>
                    <CardBody><p><strong>Email</strong></p><p>{data.email}&#46;{data.email_tld}</p></CardBody>
                </Card>
            </CardDeck></div>
        );
    }
}
