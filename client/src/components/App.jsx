import React from 'react';
import ImageListSearchBar from './ImageListSearchBar.jsx';
import ImageList from './ImageList.jsx';

// import axios from 'axios';
import $ from 'jquery';
import TOKEN from '../api/config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
    this.onImageSearchSubmit = this.onImageSearchSubmit.bind(this);
  }

  // onImageSearchSubmit = async (term) => {
  //   const response = await axios.get('https://api.unsplash.com/search/photos', {
  //     params: {
  //       query: term
  //     },
  //     headers: {
  //       Authorization: `Client-ID ${TOKEN}`
  //     }
  //   });
  //   console.log(response.data.results);
  //   this.setState({images: response.data.results});
  // }

  // onImageSearchSubmit = async (term) => {
  //   try {
  //     const response = await axios.get('https://api.unsplash.com/search/photos', {
  //       params: {
  //         query: term
  //       },
  //       headers: {
  //         Authorization: `Client-ID ${TOKEN}`
  //       }
  //     });
  //       console.log(response.data.results);
  //       this.setState({images: response.data.results});
  //   } catch (err) {
  //     console.log("error::: ", err);
  //   }
  // }

  // onImageSearchSubmit = (term) => {
  //   const response = axios.get('https://api.unsplash.com/search/photos', {
  //     params: {
  //       query: term
  //     },
  //     headers: {
  //       Authorization: `Client-ID ${TOKEN}`
  //     }
  //   })
  //   .then(res => {
  //     console.log(res.data.results);
  //     this.setState({images: res.data.results});

  //   })
  //   .catch(err => console.log("error from Axios GET:: ", err));
  // }

  onImageSearchSubmit = (term) => {
    $.ajax({
      url: `https://api.unsplash.com/search/photos?query=${term}`,
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: `Client-ID ${TOKEN}`
      },
      success: data => {
        console.log(data.results);
        this.setState({images: data.results});
      },
      error: error => console.log('error:::: ', error)
    });
  }

  // onImageSearchSubmit = (term) => {
  //   fetch(`https://api.unsplash.com/search/photos?query=${term}`, {
  //     headers: {
  //       Authorization: `Client-ID ${TOKEN}`
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({images: data.results});
  //   })
  //   .catch(error => console.log('Error:::', error));
  // }

  render() {
    return (
      <div className="primary">
        <h1 className="movieListBar"> Image from unsplash </h1>
        <div className="ui container" style={{marginTop:'10px'}}>
          <ImageListSearchBar onSubmit={this.onImageSearchSubmit}/>
          Found: {this.state.images.length} images
        </div>
        <div className='imageList'>
          <ImageList images={this.state.images}/>
        </div>
      </div>
    );
  }
}

export default App;