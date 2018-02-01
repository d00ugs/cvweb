import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {
    Button,
    ButtonGroup,
    Container, 
    Collapse, 
    ListGroupItem, 
    ListGroup, 
    Row, 
    Col, 
    Card, 
    CardImg, 
    CardImgOverlay, 
    CardDeck, 
    CardBlock, 
    CardBody, 
    CardHeader, 
    ListGroupItemHeading, 
    ListGroupItemText
} from 'reactstrap';

interface CVPortfolioDataState {
    profolio_titles: CVPortfolioFull[];
    categories: CVPortfolioCategories[];
    expanded_key: string;
    filter_key: string;
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
    imgUrl: string;
}

interface CVPortfolioCategories {
    key: string;
    value: string;
}

export class CVPortfolio extends React.Component<{}, CVPortfolioDataState> {
    constructor() {
        super({});
        this.state = { profolio_titles: [], categories: [], expanded_key: '', filter_key: CVPortfolio.allkey };

        fetch('http://localhost:8080/api/portfolio')
            .then((response) => response.json() as Promise<CVPortfolioFull[]>)
            .then(recv => {
                this.setState({ profolio_titles: recv});
            });
            fetch('http://localhost:8080/api/categories')
            .then((response) => response.json() as Promise<CVPortfolioCategories[]>)
            .then(recv => {
                this.setState({ categories: recv});
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
    
    public setKey(key: string) {
        if (this.state.expanded_key == key)
        {
            key = '';
        }
        this.setState({expanded_key: key});
    }

    public changeFilter(key: string) {
        this.setState({filter_key: key, expanded_key: ''});
    }

    public static allkey: string = 'All';

    private renderCVOverview(data: CVPortfolioDataState) {
        return (
            <Card>
                <CardHeader>Projects</CardHeader>
                <CardBody>
                    <ButtonGroup>
                        <Button color="primary" key="all" onClick={() => this.changeFilter(CVPortfolio.allkey)} active={data.filter_key == CVPortfolio.allkey}>All</Button>
                        {
                            data.categories.map((item, index) => {
                                return(
                                    <Button color="secondary" key={index} onClick={() => this.changeFilter(item.key)} active={data.filter_key == item.key}>
                                        {item.value}
                                    </Button>
                                );
                            })
                        }
                    </ButtonGroup>
                    <ListGroup>
                        {
                            data.profolio_titles.map((item, index) => {
                                var active: boolean = (data.expanded_key == '' && (data.filter_key == CVPortfolio.allkey || item.value.category == data.filter_key)) || data.expanded_key == item.key;
                                var img = item.value.imgUrl == "" ? "" : (
                                    <img src={"/img/" + item.value.imgUrl} className="img-fluid rounded" />
                                );
                                var internal = data.expanded_key != item.key ? "" : (
                                    
                                        <div>
                                            {img}
                                            <p><em>{item.value.duration}</em></p>
                                            <p>{item.value.description}</p>
                                        </div>
                                    
                                    );
                                return(
                                    <Collapse key={index} isOpen={active}>
                                        <ListGroupItem onClick={() => {this.setKey(item.key)}}>
                                            <ListGroupItemHeading>
                                                {item.value.title}
                                            </ListGroupItemHeading>
                                            {internal}
                                        </ListGroupItem>
                                    </Collapse>
                                );
                            })
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        );

    }
}
