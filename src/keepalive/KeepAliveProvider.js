import { useCallback, useReducer } from "react";
import CacheContext from "./CacheContext";
import cacheReducer from './cacheReducer';
import * as cacheTypes from './cache-types';

function KeepAliveProvider(props) {
    const [cacheStates, dispatch] = useReducer(cacheReducer, {});
    const mount = useCallback(({ cacheId, reactElement }) => {
        if (cacheStates[cacheId]) {
            const cacheState = cacheStates[cacheId];
            if (cacheState.status === cacheTypes.DESTROY) {
                cacheState.doms.forEach(dom => dom.parentNode.removeChild(dom));
                dispatch({ type: cacheTypes.CREATE, payload: { cacheId, reactElement } });
            }
        } else {
            dispatch({ type: cacheTypes.CREATE, payload: { cacheId, reactElement } });
        }
    }, [cacheStates])
    const handleScroll = useCallback((cacheId, event) => {
        if (cacheStates[cacheId]) {
            const target = event.target;
            const scroll = cacheStates[cacheId].scroll
            scroll[target] = {
                top: target.scrollTop,
                left: target.scrollLeft
            }
        }
    }, [cacheStates])
    return (
        <CacheContext.Provider value={{ cacheStates, mount, dispatch, handleScroll }}>
            {props.children}
            {
                Object.values(cacheStates).filter(cacheState => cacheState.status !== cacheTypes.DESTROY).map(({ cacheId, reactElement }) => (
                    <div id={`cache-${cacheId}`} key={cacheId} ref={
                        (divDOM) => {
                            const cacheState = cacheStates[cacheId];
                            if (divDOM && (!cacheState.doms || cacheState.status === cacheTypes.DESTROY)) {
                                const doms = Array.from(divDOM.childNodes);
                                dispatch({ type: cacheTypes.CREATED, payload: { cacheId, doms } })
                            }
                        }
                    }>{reactElement}</div>
                ))
            }
        </CacheContext.Provider>
    )
}
export default KeepAliveProvider;