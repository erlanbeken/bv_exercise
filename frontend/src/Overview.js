import React, { Component } from 'react';
import reqwest from 'reqwest';

import CONFIG from './config.js'

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Overview extends Component{
    render(){
        return <div className="overview">
            <div className="best_products list"><h3>Highest Rated</h3><List source="best"/></div>
            <div className="recent_products list"><h3>Recently Rated</h3><List source="recent"/></div>
        </div>
    }
}

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            'list': []
        };

        this.item_clicked = this.item_clicked.bind(this)
    }

    componentDidMount(){
        let self = this;
        reqwest({
            url: CONFIG.product_api_url[this.props.source],
            type: 'json',
            method: 'get',
            success: function (resp) {
                self.setState({'list': resp})
            },
            error: function(resp){
                alert('Could not connect to the server');
            }
        })
    }

    item_clicked(event){
        let product_id = event.target.parentNode.attributes.getNamedItem('data-id').value;
        history.push('/review/' + product_id)
    }

    render(){
        // if component hasn't mounted yet
        if (this.state.list.length === 0) return null;

        let product_keys = Object.keys(this.state.list[0]);
        let captions = CONFIG.product_field_captions;

        // remove id key so it doesn't show in the table
        product_keys.splice(product_keys.indexOf('id'), 1);

        return  <div className="table">
            <div className="th">
                {product_keys.map((field_key) => <span key={field_key} className="td">{captions[field_key]}</span>)}
            </div>
            {this.state.list.map((row) => {
                return <div className="tr clickable" key={row.id} data-id={row.id} onClick={this.item_clicked}>
                    {product_keys.map((field_key) => <span key={field_key} className="td">{row[field_key]}</span>)}
                </div>
            })}
        </div>
    }
}

export default Overview;