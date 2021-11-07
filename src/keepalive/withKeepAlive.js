import { useContext, useEffect, useRef } from "react";
import CacheContext from "./CacheContext";
import * as cachTypes from './cache-types';

function withKeepAlive(OldComponent, { cacheId = window.location.pathname, scroll }) {
    return function (props) {
        const { cacheStates, mount, dispatch, handleScroll } = useContext(CacheContext);
        const divRef = useRef(null);
        useEffect(() => {
            if (scroll) {
                divRef.current.addEventListener('scroll', handleScroll.bind(null, cacheId), true)
            }
        }, [handleScroll])

        useEffect(() => {
            const cacheState = cacheStates[cacheId];
            if (cacheState && cacheState.doms && cacheState.status !== cachTypes.DESTROY) {
                const doms = cacheState.doms;
                doms.forEach(dom => divRef.current.appendChild(dom))
                if (scroll) {
                    doms.forEach(dom => {
                        if (cacheState.scroll[dom]) {
                            dom.scrollTop = cacheState.scroll[dom].top;
                            dom.scrollLeft = cacheState.scroll[dom].left;
                        }
                    })
                }
            } else {
                mount({ cacheId, reactElement: <OldComponent {...props} dispatch={dispatch} /> })
            }
        }, [cacheStates, mount, props])

        return (<div id={`withKeepAlive${cacheId}`} ref={divRef}>
            { }
        </div>)
    }
}
export default withKeepAlive;