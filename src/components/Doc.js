import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Doc extends Component {
 
  render() {
    return (
      <div className='alignLeft'>
        <h2><strong>Overview</strong></h2>
        <p>The xSwap platform comprises a number of services that work collaboratively to help developers build applications that facilitate the exchange of things/stuffs of interest among the users of the applications.</p>
        <p>We have chosen to build on top of this platform an application (namely GameCreditSwap) that allows a user to exchange his/her game credits with credits of another game held by other users. Similarly, other developers may use the same platform to develop for instance an application for the users to exchange reward points.</p>
        <p>&nbsp;</p>
        <h2><strong>General Architecture</strong></h2>
        <p>The xSwap platform provides support for tasks that are common across most stuff-exchanging applications.</p>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Functionalities of xSwap platform</th>
              <th>Supported by Service</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Manage items for exchange</td>
              <td>Items Service</td>
            </tr>
            <tr>
              <td>Validate item creation against the item template</td>
              <td>Items Service, Template Service</td>
            </tr>
            <tr>
              <td>Create, accept, or reject an exchange request</td>
              <td>Swap Service
              </td>
            </tr>
            <tr>
              <td>Manage history of completed exchanges</td>
              <td>Swap Service</td>
            </tr>
            <tr>
              <td>Manage the item template</td>
              <td>Template Service</td>
            </tr>
            <tr>
              <td>Allow uploading of the item exchange rates </td>
              <td>ExchangeRate Service</td>
            </tr>
            <tr>
              <td>Search and return results with reference exchange rates</td>
              <td>Search Service, ExchangeRate Service</td>
            </tr>
            <tr>
              <td>Send notifications on creating, accepting and rejecting of exchange request, etc.</td>
              <td>Notification Service </td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <p>This allows the application developers to focus only on managing its own users and other operations specific to the application domain. In the case of GameCreditSwap application, the main focus of the developers is on:&nbsp;</p>
        <ul>
        <li>Managing application users</li>
        <li>Specifying item template (with attributes that define the game credits, and other related fields like the game title, platform, provider, etc.)</li>
        <li>Specifying the games that support credit exchange and the respective exchange rates</li>
        <li>Interfacing with Game Provider APIs to perform the actual transfer of the game credits</li>
        </ul>
        <p>When a new application (for instance, RewardPointsSwap) is to be built on top of this same platform, the developers would have to start by defining a new item template, which describes the items (reward points in this case) that are exchangeable within the application. When xSwap receives the item template, it automatically configures a new database (complete with the necessary indexes as specified in the template) for the new application. All items management and search operations of the application will then be bounded by and scoped to the specifications in the item template.</p>
        <p>The xSwap platform also exposes an endpoint for either the developers or any third party to submit new exchange rates. In GameCreditSwap for instance, the game providers can update their game credit exchange rates through the endpoint any time without the need for change in the implementation of the application.</p>
      </div>
    )
  }
}

export default Doc;