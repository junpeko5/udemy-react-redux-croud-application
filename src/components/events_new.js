import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Button, TextField, Container } from "@material-ui/core";

import { postEvent } from "../actions";

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;
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

  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <Field
              type="text"
              name="title"
              label="Title"
              component={this.renderField}
            />
            <Field
              type="text"
              name="body"
              label="Body"
              component={this.renderField}
            />
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
            </div>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { postEvent };

const validate = values => {
  const errors = {};

  if (!values.title) errors.title = "Enter a title, please.";
  if (!values.body) errors.body = "Enter a body, please.";
  return errors;
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: "eventNewForm" })(EventsNew));
