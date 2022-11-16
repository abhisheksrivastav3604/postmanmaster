import React, {Component} from "react";
import {Route,Switch,Redirect} from "react-router-dom"
import Navbar from "./navbar";
import Home1 from "./home1";

class main extends Component{
    state={
    };
    render(){
        return (

            <div className="">
                <Navbar/>
                <Switch>
                    <Route path="/home1" component={Home1}/>
                    <Redirect from="/" to="/home1"/>
                </Switch>
            </div>
        );

    }
}
export default main;