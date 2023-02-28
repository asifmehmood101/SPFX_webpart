import * as React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import axios from 'axios';
const StyleSelectItemDetail = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

export type DetailItem = {
  key: number;
  name: string;
  value: number;
};

export type DetailListProps = {
  items?: DetailItem[];
  selectionDetails?: string;
};

export const DetailList = ({ items }: DetailListProps): JSX.Element => {
  const [selectionDetail, setSelectionDetail] = React.useState<string>();
  const [response, setResponse] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column2',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://0gzvt.sharepoint.com/sites/listing/_api/web/lists/getbytitle('Book1')/items",
      )
      .then((response) => {
        setResponse(response.data.value);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  const selected = new Selection({
    onSelectionChanged: () => setSelectionDetail(getSelectionDetails()),
  });

  function getSelectionDetails(): string {
    const selectionCount = selected ? selected.getSelectedCount() : 0;

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return (
          '1 item selected: ' + (selected.getSelection()[0] as DetailItem).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  const ListItem = response.map((item) => {
    const itemDetail = {
      key: item.ID,
      name: item.Title,
      value: item.ID,
    };

    return itemDetail;
  });

  const getitemDetail = (item: DetailItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className={StyleSelectItemDetail}>
        {selectionDetail || 'No Item selected'}
      </div>
      <MarqueeSelection selection={selected}>
        <DetailsList
          items={ListItem}
          columns={columns}
          setKey='set'
          layoutMode={DetailsListLayoutMode.justified}
          selection={selected}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn='Toggle selection'
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          checkButtonAriaLabel='select row'
          onItemInvoked={getitemDetail}
        />
      </MarqueeSelection>
    </div>
  );
};
