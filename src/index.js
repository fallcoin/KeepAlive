import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserList";
import UserAdd from "./components/UserAdd";
import { KeepAliveProvider, withKeepAlive } from './keepalive'

const KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home' });
const KeepAliveUserList = withKeepAlive(UserList, { cacheId: 'UserList', scroll: true });
const KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' });

const App = () => {
  return (
    <BrowserRouter>
      <KeepAliveProvider>
        <Route>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/list">用户列表</Link></li>
            <li><Link to="/add">添加用户</Link></li>
          </ul>
        </Route>
        <Switch>
          <Route path="/" component={KeepAliveHome} exact />
          <Route path="/list" component={KeepAliveUserList} />
          <Route path="/add" component={KeepAliveUserAdd} />
        </Switch>
      </KeepAliveProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
