import React, { Component } from 'react';
import reqwest from 'reqwest';

import CONFIG from './config.js'

import dateformat from 'dateformat'

class ProductReviewForm extends Component{
    constructor(props){
        super(props);
        this.default_state = {
            'ranking': 1,
            'review' : '',
            'username': '',
            'product': props.product_id
        };

        this.state = this.default_state;

        this.submit_form = this.submit_form.bind(this);
        this.update_state = this.update_state.bind(this);
    }

    submit_form(event){
        let self = this;
        event.preventDefault();
        reqwest({
            url: CONFIG.review_api_url.create_review,
            type: 'json',
            method: 'post',
            data: this.state,
            success: function (resp) {
                self.setState(self.default_state)
                if (typeof self.props.on_new_review === 'function'){
                    self.props.on_new_review();
                }
            },
            error: function(resp){
                alert('Could not connect to the server');
            }
        })
    }

    update_state(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return <form className="product_review_form" onSubmit={this.submit_form}>
            <label>Username</label>
            <input type="text" value={this.state.username} onChange={this.update_state} name="username"/>
            <br/>
            <label>Ranking</label>
            <select value={this.state.ranking} onChange={this.update_state} name="ranking">
                {CONFIG.product_ranking.map((value) => <option key={'rank_' + value} value={value}>{value}</option>)}
            </select>
            <br/>
            <textarea placeholder="Your review here.." value={this.state.review} onChange={this.update_state} name="review"></textarea>
            <input type="submit"/>
        </form>
    }
}

class ProductInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            'product_details': null
        };
    }

    componentDidMount(){
        let self = this;
        reqwest({
            url: CONFIG.product_api_url['info'] + this.props.product_id,
            type: 'json',
            method: 'get',
            success: function (resp) {
                self.setState({'product_details': resp})
            },
            error: function(resp){
                alert('Could not connect to the server');
            }
        })
    }

    render(){
        // if component hasn't mounted yet
        if (!this.state.product_details) return null;

        let product_details = this.state.product_details
        let product_keys    = Object.keys(product_details);
        let captions        = CONFIG.product_field_captions;

        return <div className="product_info">
            { product_keys.map((field_key) => <div className="tr" key={field_key}>
                <span className="td">{captions[field_key]}</span>
                <span className="td">{product_details[field_key]}</span>
            </div>) }
        </div>
    }
}

class ProductReviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            'product_reviews': null
        };
    }

    loadReviews(self){
        reqwest({
            url: CONFIG.review_api_url.product_reviews + this.props.product_id,
            type: 'json',
            method: 'get',
            success: function (resp) {
                self.setState({'product_reviews': resp})
            },
            error: function(resp){
                alert('Could not connect to the server');
            }
        })
    }

    componentDidMount(){
        this.loadReviews(this);
    }

    render(){
        // if component hasn't mounted yet
        if (!this.state.product_reviews) return null;

        if (!this.state.product_reviews.length) return <span>No reviews yet</span>

        return  <div className="table">
            <div className="th">
                <span className="td">Ranking</span>
                <span className="td">Username</span>
                <span className="td">Review</span>
                <span className="td">Created</span>
            </div>
            {this.state.product_reviews.map((row) => {
                let date = dateformat(new Date(row.date), CONFIG.review_date_format);

                return <div className="tr" key={row.id}>
                    <span className="td">{row.ranking}</span>
                    <span className="td">{row.username}</span>
                    <span className="td">{row.review}</span>
                    <span className="td">{date}</span>

                </div>
            })}
        </div>
    }
}


class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            'product_id': this.props.location.pathname.split('/').slice(-1)[0]
        }
        this.new_review = this.new_review.bind(this);
    }

    new_review(){
        if (this._reviews){
            this._reviews.loadReviews(this._reviews)
        }
    }

    render(){
        return <div className="review">
            <div className="container">
                <h3>Product Details</h3>
                <ProductInfo product_id={this.state.product_id}/>
            </div>
            <div className="container">
                <div className="product_reviews">
                    <h3>Product Reviews</h3>
                    <ProductReviews product_id={this.state.product_id} ref={(reviews) => {this._reviews = reviews;}}/>
                </div>
                <div className="product_review_form">
                    <h3>Your Review</h3>
                    <ProductReviewForm product_id={this.state.product_id} on_new_review={this.new_review}/>
                </div>
            </div>
        </div>
    }
}

export default Review;