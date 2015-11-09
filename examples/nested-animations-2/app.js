import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { TransitionMotion, spring } from 'react-motion'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'


const history = useBasename(createHistory)({
  basename: '/nested-animations-2'
})

class App extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <div>
        <ul>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <RouteTransition pathname={pathname}>
            {this.props.children}
        </RouteTransition>
      </div>
    )
  }
}

class Page1 extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <div className="Image">
        <h1>Page 1</h1>
        <ul>
          <li><Link to="/page1/tab1">Tab 1</Link></li>
          <li><Link to="/page1/tab2">Tab 2</Link></li>
        </ul>
        <RouteTransition pathname={pathname}>
            {this.props.children}
        </RouteTransition>
      </div>
    )
  }
}

class Page2 extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <div className="Image">
        <h1>Page 2</h1>
        <ul>
          <li><Link to="/page2/tab1">Tab 1</Link></li>
          <li><Link to="/page2/tab2">Tab 2</Link></li>
        </ul>
        <RouteTransition pathname={pathname}>
            {this.props.children}
        </RouteTransition>
      </div>
    )
  }
}

class Tab1 extends React.Component {
  render() {
    return (
      <div className="Image">
        <h2>Tab 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    )
  }
}

class Tab2 extends React.Component {
  render() {
    return (
      <div className="Image">
        <h2>Tab 2</h2>
        <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    )
  }
}

const RouteTransition = React.createClass({
  propTypes: {
    pathname: PropTypes.string.isRequired
  },

  willEnter() {
    return {
      handler: this.props.children,
      x: spring(0)
    }
  },

  willLeave(key, value) {
    return {
      handler: value.handler,
      x: spring(-225)
    }
  },

  getStyles() {
    const { children, pathname } = this.props

    return {
      [pathname]: {
        handler: children,
        x: spring(25)
      }
    }
  },

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolated =>
          <div>
            {Object.keys(interpolated).map(key =>
              <div
                key={`${key}-transition`}
                style={{
                  position: 'absolute',
                  WebkitTransform: `translate3d(${interpolated[key].x}px, 0, 0)`,
                  transform: `translate3d(${interpolated[key].x}px, 0, 0)`
                }}
              >
               {interpolated[key].handler}
              </div>
            )}
          </div>
        }
      </TransitionMotion>
    )
  }
})

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="page1" component={Page1}>
        <Route path="tab1" component={Tab1} />
        <Route path="tab2" component={Tab2} />
      </Route>
      <Route path="page2" component={Page2}>
        <Route path="tab1" component={Tab1} />
        <Route path="tab2" component={Tab2} />
      </Route>
    </Route>
  </Router>
), document.getElementById('example'))
