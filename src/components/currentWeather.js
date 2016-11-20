import React from 'react';
import { 
  Well,
  ListGroup,
  ListGroupItem,
  Badge,
  Grid,
  Row,
  Col,
  Label
} from 'react-bootstrap';

export default (props) => {
      var data = props.items;
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
                                    {props.children}
                                    <div>
                                      <span>Health: </span>
                                      <Label 
                                        bsStyle={props.health === 'OK' ? 'success' : 'danger'} 
                                        className="pull-right">
                                        {props.health}
                                      </Label>
                                    </div>
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
};