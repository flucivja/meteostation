'use strict';

var React         = require('react');
var Well          = require('react-bootstrap/Well');
var ListGroup     = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');
var Badge         = require('react-bootstrap/Badge');
var Grid          = require('react-bootstrap/Grid');
var Row           = require('react-bootstrap/Row');
var Col           = require('react-bootstrap/Col');

module.exports = React.createClass({
  render: function() {
      var data = this.props.items;
      return (
          <Grid>
              <Row className="show-grid">
                  <Col xs={12}>
                       <Well>
                            
                            <Row>
                                <Col xs={12} md={8} sm={6}>
                                    <h1>Current Weather</h1>
                                </Col>
                                <Col xs={12} md={4} sm={6}>
                                    {this.props.children}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={12} md={4} sm={4}>
                                    <ListGroup>
                                        <ListGroupItem>Tempereture Out: <Badge><span>{data.outtemp} °C</span></Badge></ListGroupItem>
                                        <ListGroupItem>Tempereture In: <Badge><span>{data.intemp} °C</span></Badge></ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col xs={12} md={4} sm={4}>
                                    <ListGroup>
                                        <ListGroupItem>Wind Speed: <Badge><span>{data.windspeed} Km/s</span></Badge></ListGroupItem>
                                        <ListGroupItem>Gust Speed: <Badge><span>{data.gustwindspeed} Km/s</span></Badge></ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col xs={12} md={4} sm={4}>
                                    <ListGroup>
                                        <ListGroupItem>Humidity In: <Badge><span>{data.inhum} %</span></Badge></ListGroupItem>
                                        <ListGroupItem>Humidity Out: <Badge><span>{data.outhum} %</span></Badge></ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                      </Well>
                  </Col>
              </Row>
          </Grid>
      );
  }
});