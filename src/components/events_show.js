import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Button, TextField, Container } from "@material-ui/core";

import { getEvent, deleteEvent, putEvent } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field;
    return (
      <div>
        <TextField
          {...input}
          label={label}
          type={type}
          helperText={touched && error && <span>{error}</span>}
          error={touched && error}
        />
      </div>
    );
  }

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="Title"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="Body"
              name="body"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting || invalid}
            >
              送信
            </Button>
            <Button variant="contained" href="/" color="secondary">
              キャンセル
            </Button>
            <Button variant="contained" href="/" color="secondary">
              <Link to="/" onClick={this.onDeleteClick}>
                Delete
              </Link>
            </Button>
          </div>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, state }
}

const mapDispatchToProps = { deleteEvent, getEvent, putEvent };

const validate = values => {
  const errors = {};

  if (!values.title) errors.title = "Enter a title, please.";
  if (!values.body) errors.body = "Enter a body, please.";
  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(EventsShow));
