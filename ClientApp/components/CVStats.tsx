import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';
import * as FA from 'react-icons/lib/fa';

interface CVStatsData {
    degree: number;
    years: number;
    sectors: number;

}

interface CVStatsDataState {
    data: CVStatsData;
    loading: boolean;
}

export class CVStats extends React.Component<{}, CVStatsDataState> {
    constructor() {
        super({});
        this.state = { loading: true, data: {degree: 0, years: 0, sectors: 0} };

        fetch('http://localhost:8080/api/stats')
            .then((response) => response.json() as Promise<CVStatsData>)
            .then(recv => {
                this.setState({ data: recv});
            });
    }

    public render() {
        let contents = this.state.loading ? "" : CVStats.renderCVStats(this.state.data);
        return (
            <Card inverse>
                <CardImg src="/img/gears.jpg" />
                <CardImgOverlay className="d-flex">
                    { contents }
                </CardImgOverlay>
            </Card>
        );
    }

    private static renderCVStats(data: CVStatsData) {
        return (
            <div className="my-auto mx-auto text-center">
                
            </div>
        );
    }
}
