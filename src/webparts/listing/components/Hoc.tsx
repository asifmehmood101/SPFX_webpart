import * as React from 'react';

const list = [
  { id: 0, name: 'asif' },
  { id: 0, name: 'ali' },
];

const ListItem = () => {
  const [listItems, setListItems] = React.useState(list);

  return (
    <div>
      {listItems.map((item) => {
        return <p key={item.id}>{item.name}</p>;
      })}
    </div>
  );
};
