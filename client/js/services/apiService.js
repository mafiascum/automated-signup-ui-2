const apiService = /*@ngInject*/ ($resource, ENV) => {
    const actions = {
        'query': {method: 'GET', isArray: false},  //has pagination object wrapped around payload
        'list': {method: 'GET', isArray: true},  //raw array
        'get': {method: 'GET'},
        'update': {method: 'PUT'},
        'save': {method: 'POST'},
        'remove': {method: 'DELETE'},
        'options': {method: 'OPTIONS'}
    };

    return path => $resource(`${ENV.SERVICE_ROOT}/${path}/:id`, {id: '@id'}, actions);
};

export default apiService;