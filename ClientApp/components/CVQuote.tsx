import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';
import * as FA from 'react-icons/lib/fa';

interface CVQuoteDataState {
    quote: string;
    quote_author: string;
}

export class CVQuote extends React.Component<{}, CVQuoteDataState> {
    constructor() {
        super({});
        this.state = { quote: '', quote_author: '' };

        fetch('http://localhost:8080/api/cv/quote')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ quote: recv});
            });
            fetch('http://localhost:8080/api/cv/quote_author')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ quote_author: recv});
            });
    }

    public render() {
        let contents = CVQuote.renderCVOverview(this.state);
        return (
            <Card inverse>
                <CardImg src="/img/gears.jpg" />
                <CardImgOverlay className="d-flex">
                    { contents }
                </CardImgOverlay>
            </Card>
        );
    }

    private static renderCVOverview(data: CVQuoteDataState) {
        return (
            <div className="my-auto mx-auto text-center">
                <p className="lead">
                    <FA.FaQuoteLeft/>
                    {data.quote}
                    <FA.FaQuoteRight/>
                </p>
                <p><strong>{data.quote_author}</strong></p>
            </div>
        );
    }
}
