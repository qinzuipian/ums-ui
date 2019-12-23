/**
 * @file 页标题 Reflux View
 * @author 崔健 cuijian03@baidu.com 2016.08.20
 */

import React, { Component } from 'react'
import { render } from 'react-dom'

var Title = React.createClass({
    render: function () {
    	var logo = __uri('/static/images/wenzi.png');
        return (
            <div className="title">
                <img src={logo} className="logo" />
                 
            </div>
        )
    }
});

export default Title;
