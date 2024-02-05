import colors from '../../constants/colors';

export default [
  {
    id: '1',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.green,
  },
  {
    id: '2',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.error,
  },
  {
    id: '3',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.yellow,
  },
  {
    id: '4',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.green,
  },
  {
    id: '5',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.green,
  },
  {
    id: '6',
    itemName: 'Items butter',
    itemDescription: 'Amul butter 250gm',
    qty: '10',
    salesPrice: '$350',
    purchasePrice: '$250',
    status: 'Your Status',
    statusColor: colors.green,
  },
];

const filterData = [
  {
    name: 'Product Status',
    option: ['Red', 'Green', 'Yellow'],
  },
  {
    name: 'Top Selling',
    option: ['Top50', 'Top100', 'Top150'],
  },
];
// {
//   name: 'Product Category',
//   option: ['Top50', 'Top100', 'Top150'],
// },

export {filterData};

const sortingsData = [
  {
    name: 'Sale Price',
    option: ['High To Low', 'Low To High'],
    type: 'sale_price',
  },
  {
    name: 'Purchase Price',
    option: ['High To Low', 'Low To High'],
    type: 'purchase_price',
  },
  {
    name: 'Product Name',
    option: ['A to D', 'D to A'],
    type: 'product_name',
  },
];

export {sortingsData};

// const historyData = [
//   {
//     name: 'Product Status',
//     option: ['Red', 'Green', 'Yellow'],
//   },
//   {
//     name: 'Top Selling',
//     option: ['Top50', 'Top100', 'Top150'],
//   },
//   {
//     name: 'Product Category',
//     option: ['Top50', 'Top100', 'Top150'],
//   },
// ];

// export {historyData};
