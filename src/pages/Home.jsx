import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../css/style.css';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Slider className="slider-wrapper" autoplay='2000'>
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
		title: 'Introducing xSwap',
		description: 'A Platform to enable easy exchange',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
	},
	{
		title: 'Fast and Serverless',
		description: 'Just one click and new application and server for you to use immediately',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
	},
	{
		title: 'Easy and Convenience',
		description: 'Create new account and an application, access from anywhere!',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
	}
];