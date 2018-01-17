import React, { Component } from 'react';
// import { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';

var prevValue = [];
var newValue;
// var index = 0;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { flag: true };
        this.toggle = this.toggle.bind(this);
    }

    componentWillUnmount() {
        console.log('parent Unmount');
    }

    toggle() {
        if (this.state.flag == true) { this.setState({ flag: false }) }
        else {
            this.setState({ flag: true });
        }
    }
    render() {
        return this.state.flag && (<div className="App">
            <header className="App-header" >
                <img src={logo}
                    className="App-logo"
                    alt="logo" />
                <h1 className="App-title" > Welcome to React </h1> </header >
            <Input /><input type='button' onClick={this.toggle} value="Toggle" />
        </div >);
    }
}

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = { 'db': [] }
        // localStorage.getItem("db") == null ? this.setState({ 'db': [] }) : this.setState({ 'db': localStorage.getItem('db') });
        this.addButton = this.addButton.bind(this);
    }

    componentWillMount = () => {
        localStorage.getItem("db") == null ? this.setState({ 'db': [] }) : this.setState({ 'db': [].push(localStorage.getItem('db')) });
        console.log('Will Mount');
    };

    componentDidMount() {
        console.log('Component Mounted');
    }



    addButton() {
        newValue = this.refs.Item.value;
        prevValue = this.state['db']
        prevValue.push(newValue);
        this.setState(prevValue);
        console.log(newValue);
        console.log(typeof (this.state['db']));
        this.refs.Item.value = '';


    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    getInitialState() {
        console.log('Get INitial State')
    }
    componentWillUnmount() {
        console.log('Will Unmount');
        // localStorage.setItem('db', this.state['db']);
        // console.log();
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component Did Update', prevState);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Component Will Update');
        localStorage.setItem('db', Object(this.state['db']));
        console.log(localStorage)

    }




    render() {
        return (
            <div><p className="input-boxes" > Enter the Item
            <input ref='Item' type="text" />
                <input type='button' value='Add Item' onClick={this.addButton} />
                <br />The Items contained are {this.props.val}
            </p>
                <ul>

                    {(this.state.db).map((number) => <li>{number}</li>)};
                    </ul>
                {/* <Child2 valueee={this.state.db} /> */}
            </div>


        );
    }
}

class Child2 extends Component {
    constructor(props) {
        super(props);

    }
    componentWillReceiveProps = (nextProps) => {
        console.log('IN WILL RECEIVE props', nextProps.valueee);
    };


    render() {
        return (<p>My prop value is <ul>{this.props.valueee}</ul> </p>)
    }
}
export default App;