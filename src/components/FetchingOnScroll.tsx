import * as React from 'react';
import { IGIFObject } from '../services';

interface IFetchOnScrollProps {
  scrollFunction: any;
  gifs: IGIFObject[];
}

/**
 * Watches for the window to scroll to the bottom of the list
 * Calls scroll function when botton is receached.
 *
 * @export
 * @param {*} Component
 * @returns  Component
 */
export function FetchingOnScroll(Component: any) {
  class FetchOnScroll extends React.Component<IFetchOnScrollProps> {
    constructor(props: any) {
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
