import Container from '@material-ui/core/Container';
import React, { FunctionComponent } from 'react';

const Content: FunctionComponent = ({ children }) => {
  return <div>{children}</div>;
};

export function Page({ children }: React.PropsWithChildren<any>) {
  return <Container maxWidth="lg">{children}</Container>;
}

Page.Content = Content;
