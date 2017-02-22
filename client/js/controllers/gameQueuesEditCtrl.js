import EditCtrlFactory from './editCtrl';

export default EditCtrlFactory(
    'game_queues',
     [
         {
             key: 'name',
             type: 'input',
             templateOptions: {
                 label: 'Name',
                 placeholder: 'Enter name'
             }
         },
         {
             key: 'description',
             type: 'input',
             templateOptions: {
                 label: 'Description',
                 placeholder: 'Enter description'
             }
         },
         {
             key: 'forum_id',
             type: 'input',
             templateOptions: {
                 label: 'Forum Id (TODO: ui-select!)',
                 placeholder: 'Enter forum id'
             }
         }
     ]
);