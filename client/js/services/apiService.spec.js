import app from '../app';

describe('api service', function() {
    beforeEach(angular.mock.module(app));

    console.log(module);
    
    // mock deps
    beforeEach(function() {
        angular.mock.module($provide => {
            $provide.constant('ENV', {
                SERVICE_ROOT: '/root',
                API_TOKEN: 'testapitoken'
            });
        });

    });

    
    // set up test framework
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$resource_, _ApiService_) {
        this.$httpBackend = _$httpBackend_;
        this.$resource = _$resource_;

        this.service = _ApiService_;
        this.api = this.service('resource');

        //afaik this is related to abstract views in ui-router
        this.$httpBackend.whenGET('/public/templates/home.html').respond('<div></div>');
    }));

    afterEach(function() {
        this.$httpBackend.flush();
        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it ('should return a $resource object with appropriate actions', function() {
        this.api.should.be.a('function');
        this.api.should.have.property('query');
        this.api.should.have.property('list');
        this.api.should.have.property('get');
        this.api.should.have.property('update');
        this.api.should.have.property('save');
        this.api.should.have.property('remove');
        this.api.should.have.property('options');
    });

    it ('should make calls to the proper location based on root and resource', function() {
        this.$httpBackend.expectGET('/root/resource').respond({});

        this.api.query();
    });
});