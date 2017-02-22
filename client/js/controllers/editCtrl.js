export default (resource, fields) => {
    return class {
        /*@ngInject*/
        constructor(ApiService, $stateParams) {
            this.$stateParams = $stateParams;
            this.api = ApiService(resource);
            
            this.initializeForm();
        }
        
        initializeForm() {
            this.fields = fields;
            this.getData();
        }
        
        getData() {
            this.model = this.api.get({id: this.$stateParams.id});
        }
    };
};