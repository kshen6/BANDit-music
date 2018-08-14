/* React */
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

/* Assets */
import '../../styles/posts/Event/Event.css';
import InlineButton from '../ui/InlineButton';
import Banditspan from '../ui/Banditspan';

class Post extends Component {
  updated() {
    let newDate = new Date(this.props.updatedAt);
    return (
      newDate.getMonth() +
      1 +
      '/' +
      newDate.getDate() +
      '/' +
      newDate.getFullYear() +
      ' ' +
      newDate.toLocaleTimeString()
    );
  }

  render() {
    return (
      <div className="event">
        <h6>
          <Banditspan text="Event" />
          {this.props.author} posted:
        </h6>
        <Row>
          <Col md={9}>
            <h4>{this.props.subject}</h4>
          </Col>
          <Col>
            <h6>
              Last updated: <br /> {this.updated()}
            </h6>
          </Col>
        </Row>
        <h6>{this.props.content}</h6>
        <Row>
          <Col md={3}>
            <h6>
              <i className="fa fa-compass" /> | {this.props.location}
            </h6>
          </Col>
          <Col md={3}>
            <h6>
              <i className="fa fa-clock-o" /> | {this.props.time}
            </h6>
          </Col>
        </Row>
        <InlineButton text="Delete" onClick={this.props.delete} />
        {'  '}
        <InlineButton text="Expand" onClick={this.props.show} />
      </div>
    );
  }
}

export default Post;
