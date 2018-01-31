import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { ListGroupItem, ListGroup, Row, Col, Card, CardImg, CardImgOverlay, CardDeck, CardBlock, CardBody, CardHeader, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import {Collapse} from 'react-collapse';

interface CVPortfolioDataState {
    profolio_titles: CVPortfolioFull[];
    expanded_key: string;
}

interface CVPortfolioFull {
    key: string;
    value: CVPortfolioDefn;
}

interface CVPortfolioDefn {
    title: string;
    category: string;
    description: string;
    duration: string;
}

export class CVPortfolio extends React.Component<{}, CVPortfolioDataState> {
    constructor() {
        super({});
        this.state = { profolio_titles: [], expanded_key: '' };

        fetch('http://localhost:8080/api/portfolio')
            .then((response) => response.json() as Promise<CVPortfolioFull[]>)
            .then(recv => {
                this.setState({ profolio_titles: recv});
            });
    }

    public render() {
        let contents = this.renderCVOverview(this.state);
        return (
            <Row>
                <Col></Col>
                <Col xs="8">{ contents }</Col>
                <Col></Col>
            </Row>
        );
    }

    private renderCVOverview(data: CVPortfolioDataState) {
        return (
            <Card>
                <CardHeader>Portfolio</CardHeader>
                <CardBody>
                    <ListGroup>
                        {data.profolio_titles.map((item, index) => {
                            return(
                                <ListGroupItem onClick={() => {this.setState({expanded_key: item.key})}}>
                                    <ListGroupItemHeading>
                                        {item.value.title}
                                    </ListGroupItemHeading>
                                    <Collapse isOpened={data.expanded_key == item.key}>
                                        <ListGroupItemText>
                                            <div>
                                                <p><em>{item.value.duration}</em></p>
                                                <p>{item.value.description}</p>
                                            </div>
                                        </ListGroupItemText>
                                    </Collapse>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </CardBody>
            </Card>
        );

    }
}
