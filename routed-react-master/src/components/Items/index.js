// src/components/Items/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';
import iconShiping from './ic_shipping.png';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Node from 'react-if-comp';

class Items extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}
   constructor(props) {
    super(props);

    this.state = {
      posts: [],
      categories:[],
      countCategories:[]
    };
  }

  componentDidMount() {            
    var busqueda = this.props.location.query.search;//getParameterByName('search');        
    localStorage.setItem('busqueda', busqueda);
    axios.get(location.origin + '/api/items/q/'+ busqueda)
      .then(res => {
        const prueba = res.data.results.map(Object => Object);
        const data = res.data;
        var posts= [];

        for (var i = 0; i < 4; i++) {
            posts[i]=prueba[i];
        }
        const prueba2=res.data.filters[0].values[0].path_from_root.map(Object => Object);
        var categories=[];        

        for (var x = 0; x < prueba2.length; x++) {            
            categories[x]=({ 'id': prueba2[x].id,'name': prueba2[x].name,'indice': x});
        }
        const countCategories=categories.length - 1;        
        this.setState({ posts });                              
        this.setState({ categories });                              
        this.setState({ countCategories });                              
        
      });
  }

  viewMore(i,j){
        //console.log('You clicked: ', i  );        
        var txtSearch=document.getElementById("search").value;
        window.location.href ="/api/items/" + i;      
    }

  render() {
    const { className, ...props } = this.props;    
    const i=0;
    return (    
      <div className={classnames('Items', className)} {...props}>        
        <div className="container menuDetalle">                  
          <ul className="nav">
              {this.state.categories.map(categories =>          
               <li className="nav-item">               
               <Node if={categories.indice == (this.state.countCategories)}>
                <Node then>
                    <a className="nav-link nav-menu-detalle negrita" href="#">{categories.name}</a>
                </Node>
                <Node else>
                  <a className="nav-link nav-menu-detalle" href="#">{categories.name}  ></a>                    
                </Node>
              </Node>
                </li>                
              )}
          </ul>
      </div>
    <div className="container">
        <div className="jumbotron jumbotronResultados">
        {this.state.posts.map(post =>
            <a href="#" onClick={this.viewMore.bind(this, post.id)} id={post.id}>
              <div className="row">            
                <div className="col-3 colImagenProducto">
                  <img className="img" src={post.thumbnail} width="180" height="180" alt=""/>
                </div> 
                <div className="col-8 colDescripcionProducto">
                  <label className="precioProducto">$ {post.price}&nbsp;
                <Node if={post.shipping.free_shipping}>
                <Node then>
                    <img src={iconShiping}/>
                </Node>                
              </Node>                  
                  </label><div className="br"></div>
                  <label className="col-10 descripcionResultados">{post.title}
                  </label>
                </div>
                <div className="col-1">
                  <label className="productoCity">{post.address.state_name}</label>
                </div>                     
              </div>
              <div className="hr"></div>
            </a>         

          )}                 
        </div>
    </div>
   </div>
    );
  }
}

export default Items;
