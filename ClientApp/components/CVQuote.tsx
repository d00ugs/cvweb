import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';

interface CVQuoteDataState {
    data: string;
    loading: boolean;
}

export class CVQuote extends React.Component<{}, CVQuoteDataState> {
    constructor() {
        super({});
        this.state = { data: '', loading: true };

        fetch('http://localhost:8080/api/cv/quote')
            .then((response) => response.json() as Promise<string>)
            .then(recv => {
                this.setState({ data: recv, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CVQuote.renderCVOverview(this.state.data);

        return (
            <Card inverse>
                <CardImg src="/img/gears.jpg" />
                <CardImgOverlay>
                    { contents }
                </CardImgOverlay>
            </Card>
        );
    }

    private static renderCVOverview(data: string) {
        return (
            <div>
                {data}
            </div>
        );
    }
}
