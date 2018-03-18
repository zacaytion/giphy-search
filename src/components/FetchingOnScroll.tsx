import * as React from 'react';
import { IGIFObject } from '../services';

interface IFetchOnScrollProps {
  scrollFunction: any; // TODO: Add real type def
  gifs: IGIFObject[];
}

export function FetchingOnScroll(Component: any) { // TODO: Add real type def
  class FetchOnScroll extends React.Component<IFetchOnScrollProps> {
    constructor(props: any) { // TODO: Add real type def
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    public componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    public componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    public onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        this.props.scrollFunction();
      }
    }
    public render() {
      return <Component {...this.props} />;
    }
  }

  return FetchOnScroll;
}
