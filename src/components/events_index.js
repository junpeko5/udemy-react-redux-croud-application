import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Fab, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { readEvents } from "../actions";



class EventsIndex extends Component {

  componentDidMount() {
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableCell component="th" scope="row">
          {event.id}
        </TableCell>
        <TableCell align="right"><Link to={`/events/${event.id}`}>{event.title}</Link></TableCell>
        <TableCell align="right">{event.body}</TableCell>
      </TableRow>
    ))
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      buttom: 12,
    }
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderEvents()}</TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" href="/events/new">
          New Event
        </Button>
        <Fab aria-label="Add" className="" color="primary" style={style}>
          <Add />
        </Fab>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ events: state.events });
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
