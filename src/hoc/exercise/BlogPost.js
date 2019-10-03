import React, {Component} from 'react';

class BlogPost extends Component {
   constructor(props) {
       super(props);
       this.state = {
           blogPost: DataSource.getBlogPost(props.id)
       }
   }

   ComponentDidMount() {
       DataSource.addChangeListener(this.handleChange);
   }

   ComponentDidUnmount() {
       DataSource.removeChangeListener(this.handleChange);
   }
   handleChange = () => {
       this.setState({
           blogPost: DataSource.getBlogPost(this.props.id)
       })
   };

   render () {
       return <TextBlock text={this.state.blogPost}/>
   }
}