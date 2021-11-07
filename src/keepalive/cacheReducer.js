import * as cacheTypes from './cache-types';
function cacheReducer(cacheStates, action) {
    const payload = action.payload;
    const cacheId = payload.cacheId;
    switch (action.type) {
        case cacheTypes.CREATE:
            return {
                ...cacheStates,
                [cacheId]: {
                    cacheId,
                    reactElement: payload.reactElement,
                    doms: undefined,
                    status: cacheTypes.CREATE,
                    scroll: {}
                }
            }
        case cacheTypes.CREATED:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    doms: payload.doms,
                    status: cacheTypes.CREATED
                }
            }
        case cacheTypes.DESTROY:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    status: cacheTypes.DESTROY
                }
            }
        default:
            return cacheStates;
    }
}

export default cacheReducer;