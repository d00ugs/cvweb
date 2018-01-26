import * as React from 'react';
import { Container } from 'reactstrap';
import { Home } from './Home';
import { CVMain } from './CVMain';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return (
            <Container fluid>
                {this.props.children}
            </Container>
        );
    }
}
