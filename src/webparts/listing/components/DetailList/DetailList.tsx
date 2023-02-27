import * as React from 'react';

import {
  TextField,
  ITextFieldStyles,
} from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const StyleSelectItemDetail = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: '300px' },
};

export type DetailItem = {
  key: number;
  name: string;
  value: number;
};

export type DetailListProps = {
  items?: DetailItem[];
  selectionDetails?: string;
};

const allItems: DetailItem[] = [];
for (let i = 0; i < 50; i++) {
  allItems.push({
    key: i,
    name: 'Item ' + i,
    value: i,
  });
}

export const DetailList = ({ items }: DetailListProps): JSX.Element => {
  const [selectionDetail, setSelectionDetail] = React.useState<string>();
  const [DetailList, setDetailList] = React.useState(allItems);
  const [search, setSearch] = React.useState('');

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

  const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const searchResult = search
      ? allItems.filter((i) => i.name.toLowerCase().indexOf(search) > -1)
      : allItems;
    setDetailList(searchResult);
    console.log('search');
  }, [search]);

  const getitemDetail = (item: DetailItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  return (
    <div>
      <TextField
        className={StyleSelectItemDetail}
        label='Filter by name:'
        onChange={handleFilterData}
        styles={textFieldStyles}
      />
      <div className={StyleSelectItemDetail}>
        {selectionDetail || 'No Item selected'}
      </div>
      <MarqueeSelection selection={selected}>
        <DetailsList
          items={DetailList}
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
