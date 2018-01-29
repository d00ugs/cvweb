import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardTitle, CardText, Button, Row, Col, CardImg, CardBody } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';

interface CVMainDataState {
    data: string;
    loading: boolean;
}

export class CVMain extends React.Component<{}, CVMainDataState> {
    constructor() {
        super({});
        this.state = { data: '', loading: true };

        fetch('http://localhost:8080/api/cv/overview')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ data: recv, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CVMain.renderCVOverview(this.state.data);

        return (
            <Row>
                <Col>
                </Col>
                <Col xs="8">
            <Card>
                <CardHeader>About Me</CardHeader>
                <CardBody>
                <Row>
                    <Col xs="3" align-middle>
                        <div  className="card-img-bottom">
                        </div>
                    </Col>
                    <Col>
                        { contents }
                    </Col>
                </Row>
                </CardBody>
            </Card>
            </Col>
            <Col>
                </Col>
                </Row>
        );
    }

    private static renderCVOverview(data: string) {
        return (<p>{data}</p>);
    }
}
