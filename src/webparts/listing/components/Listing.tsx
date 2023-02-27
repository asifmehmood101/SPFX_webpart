import * as React from 'react';

import { IListingProps } from './IListingProps';

import { DetailList } from './DetailList/DetailList';
const Listing: React.FC<IListingProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
}) => {
  return (
    <React.Fragment>
      <em>
        Create a sample SPFX webpart in SharePoint using typescript. Webpart
        should include a FluentUI details list.
      </em>{' '}
      <DetailList />
    </React.Fragment>
  );
};

export default Listing;
