export default (resource) => {
    const coreGridOptions = {
        enableRowSelection: true,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        enableRowHeaderSelection: false,
        noUnselect: true,
    };

    const coreColumns = [{
        name: 'tools',
        cellTemplate: '<div><button class="btn btn-sm btn-primary" ng-click="grid.appScope.vm.jumpToEditView(row)">Edit</button><button class="btn btn-sm btn-danger" ng-click="grid.appScope.vm.deleteRow(row)">Delete</button></div>',
        displayName: '',
        maxWidth: 100,
        enableSorting: false,
        enableFiltering: false,
        enableHiding: false
    }];

    return class {
        /*@ngInject*/
        constructor(ApiService, $scope, $state, ModelFieldService, growl) {
            this.api = ApiService(resource);
            this.$scope = $scope;
            this.$state = $state;
            this.ModelFieldService = ModelFieldService;
            this.growl = growl;

            this.initializeGrid();
        }
        
        initializeGrid() {
            const onRegisterApi = gridApi => {
                this.gridApi = gridApi;
            };

            this.grid = angular.extend({
                columnDefs: this.ModelFieldService.getFieldsForList(resource).concat(coreColumns),
                data: [],
                onRegisterApi
            }, coreGridOptions, this.options);
            
            this.getData();
        }
        
        getData() {
            this.grid.data = this.api.list();
        }

        deleteRow(row) {
            this.api.remove({id: row.entity.id}).$promise.then(() => {
                this.growl.success('Delete successful');
                this.getData();
            });
        }

        jumpToEditView(row) {
            this.$state.go('^.edit', {id: row.entity.id});
        }
    };
};