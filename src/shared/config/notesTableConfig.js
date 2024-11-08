export const notesTableConfig = [
  {
    title: 'Заметка',
    dataIndex: 'text',
    key: 'text',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => new Date(text).toLocaleString(),
  },
];
