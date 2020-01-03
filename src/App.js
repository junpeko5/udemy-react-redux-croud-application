import React from 'react';
const profiles = [
  {
    name: "Taro", age: 10
  },
  {
    name: "Hanako", age: 20
  },
  {
    name: "Junpeko", age: 30
  },
  {
    name: "Junpeko3"
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

User.defaultProps = {
  age: 1
}

export default App;
