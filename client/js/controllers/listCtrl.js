export default (resource, columnDefs) => {
    const coreGridOptions = {
        enableRowSelection: true,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        enableRowHeaderSelection: false,
        noUnselect: true
    };

    return class {
        /*@ngInject*/
        constructor(ApiService, $scope, $state) {
            this.api = ApiService(resource);
            this.$scope = $scope;
            this.$state = $state;

            this.initializeGrid();
        }
        
        initializeGrid() {
            const onRegisterApi = gridApi => {
                this.gridApi = gridApi;
            };

            this.grid = angular.extend({
                columnDefs,
                data: [],
                onRegisterApi
            }, coreGridOptions, this.options);
            
            this.getData();
        }
        
        getData() {
            this.grid.data = this.api.list();
        }

        jumpToEditView() {
            this.$state.go('^.edit', {id: this.gridApi.selection.getSelectedRows()[0].id});
        }
    };
};