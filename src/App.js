import React from 'react';
import PropTypes from 'prop-types';

const profiles = [
  {
    name: "Taro", age: 10
  },
  {
    name: "Hana", age: 20
  },
  {
    name: "Junpeko", age: 30
  },
]
const App = () => {
  return <div>
    {
      profiles.map((profile, index) => {
        return <User key={index} name={profile.name} age={profile.age} />
      })
    }
  </div>
}

const User = (props) => {
return <div>Hi, I am {props.name}! and {props.age} years old!</div>
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}
export default App;
