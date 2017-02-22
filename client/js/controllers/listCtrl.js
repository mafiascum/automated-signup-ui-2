export default (resource, columnDefs) => {
    return class {
        /*@ngInject*/
        constructor(ApiService) {
            this.api = ApiService(resource);
            this.initializeGrid();
        }
        
        initializeGrid() {
            this.grid = angular.extend({
                columnDefs,
                data: []
            }, this.options);
            
            this.getData();
        }
        
        getData() {
            this.grid.data = this.api.list();
        }
    };
};