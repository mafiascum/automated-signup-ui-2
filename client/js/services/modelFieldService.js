const modelFieldService = /*@ngInject*/ () => {
    const models = {
        game_queues: {
            edit: [
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
            ],
            list: [
                {name: 'name'},
                {name: 'description'}
            ]
        }
    };

    const getFieldsForEdit = model => models[model].edit;

    const getFieldsForList = model => models[model].list;

    return {
        getFieldsForList,
        getFieldsForEdit
    };
};

export default modelFieldService;