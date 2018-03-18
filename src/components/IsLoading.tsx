import * as React from 'react';
import { LoadingSpinner } from '../styles/LoadingSpinner';

export function IsLoading(Component: any) {
  return function composedComponent(props: any) {
    const { isLoading } = props;
    if (!isLoading) {
      return <Component {...props} />;
    }

    return <LoadingSpinner />;
  };
}
