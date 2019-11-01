import React, { Component } from 'react';
import { Lead, BSpan } from 'bootstrap-4-react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../css/style.css';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Slider className="slider-wrapper" autoplay='5000'>
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{ background: `url('${item.image}') no-repeat center center` }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </React.Fragment>
    )
  }
}
const content = [
	{
		title: 'Introduce xSwap',
		description: 'A Platform for developers to build Swap Application.',
		button: 'Read More',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
		user: 'Luan Gjokaj',
		userProfile: 'https://i.imgur.com/JSW6mEk.png'
	},
	{
		title: 'Fast and Serverless',
		description: 'Just one click and new application and server for you to use immediately',
		button: 'Discover',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
		user: 'Erich Behrens',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'Easy and Convenience',
		description: 'Create new account and an application, access from anywhere!',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];