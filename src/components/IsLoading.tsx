import * as React from 'react';
import { LoadingSpinner } from '../styles/LoadingSpinner';

/**
 * Displays a loading Icon instead of the component if gifs are loading
 *
 * @export
 * @param {*} Component
 * @returns Component
 */
export function IsLoading(Component: any) {
  return function composedComponent(props: any) {
    const { isLoading } = props;
    if (!isLoading) {
      return <Component {...props} />;
    }

    return <LoadingSpinner />;
  };
}
