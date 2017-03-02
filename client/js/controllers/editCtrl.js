export default (resource) => {
    return class {
        /*@ngInject*/
        constructor(ApiService, $stateParams, $state, growl, ModelFieldService) {
            this.$stateParams = $stateParams;
            this.$state = $state;
            this.api = ApiService(resource);
            this.growl = growl;
            this.ModelFieldService = ModelFieldService;

            this.isEditMode = !!$stateParams.id;
            
            this.initializeForm();
        }
        
        initializeForm() {
            this.fields = this.ModelFieldService.getFieldsForEdit(resource);
            this.getData();
        }
        
        getData() {
            if (this.isEditMode) {
                this.model = this.api.get({id: this.$stateParams.id});
                //hopefully temporary but id is not returned on resource
                this.model.$promise.then(() => {
                    this.model.id = this.$stateParams.id;
                });
            } else {
                this.model = new this.api();
            }
        }

        submit(model) {
            const writeFn = this.isEditMode ? 'update' : 'save';

            this.api[writeFn](model).$promise.then(() => {
                this.growl.success('Save successful');
                this.$state.go('^.list');
            })
                .catch(e => {
                    this.growl.error(`An error occurred: ${e}`);
                });
        }
    };
};