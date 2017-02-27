export default (resource, fields) => {
    return class {
        /*@ngInject*/
        constructor(ApiService, $stateParams) {
            this.$stateParams = $stateParams;
            this.api = ApiService(resource);

            this.isEditMode = !!$stateParams.id;
            
            this.initializeForm();
        }
        
        initializeForm() {
            this.fields = fields;
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
                console.log('update successful');
            });
        }
    };
};