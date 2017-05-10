// src/components/Detalle/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';
import iconShiping from './ic_shipping.png';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Node from 'react-if-comp';


class Detalle extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

   constructor(props) {
    super(props);

    this.state = {
      image: [],
      titulo:[],
      CantDisponible:[],
      precio:[],
      condicion:[],
      descripcion:[],
      categories:[],
      countCategories:[]
      
    };
  }

  componentDidMount() {
    var busqueda=reactLocalStorage.getObject('search');    
    var idItem=this.props.params.id;    
    axios.get(location.origin + '/api/items/id/'+ idItem)
      .then(res => {                       

        const image = res.data.thumbnail;
        const titulo = res.data.title;
        const CantDisponible = res.data.available_quantity;
        const precio = res.data.price;
        const condicion = res.data.condition;
        
        this.setState({ image });
        this.setState({ titulo });
        this.setState({ CantDisponible });
        this.setState({ precio });       
        this.setState({ condicion });       
        
      });
      axios.get(location.origin + '/api/items/id/description/'+ idItem)
      .then(res => {                                 
        
        const descripcion = res.data.text;
        this.setState({ descripcion });       
        
      });

      axios.get(location.origin + '/api/items/q/'+ busqueda.search)
      .then(res => { 

         const prueba2=res.data.filters[0].values[0].path_from_root.map(Object => Object);
        var categories=[];        

        for (var x = 0; x < prueba2.length; x++) {            
            categories[x]=({ 'id': prueba2[x].id,'name': prueba2[x].name,'indice': x});
        }
        const countCategories=categories.length - 1;        
        this.setState({ categories });          
        this.setState({ countCategories });                                     
      });

  }

  render() {
    const { className, ...props } = this.props;   

    var cond=this.state.condicion;

    if (cond=="new") {
            cond="Nuevo";
        }
        else
        {
              cond="Usado";
        }
    
    return (    
      <div className={classnames('Detalle', className)} {...props}>        
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
    
        <div className="jumbotron">        
            <div className="row">
                <div className="col-8">
                    <img src={this.state.image} width="680" alt=""/>
                </div>
                <div className="col-4">
                    <label className="detalleProductoEstado">{cond} - {this.state.CantDisponible} vendidos</label>
                    <div className="br"></div>
                    <label className="detalleProductoNombre">{this.state.titulo}</label>
                    <div className="br"></div>
                    <label className="detalleProductoPrecio">$ {this.state.precio}</label>
                    <a className="btn btn-primary btn-lg fluid" href="#" role="button">Comprar</a>
                </div>
            </div>            
            <div className="row topRow">
                <div className="col-9">
                    <label className="detalleProductoDescripcionTitulo">Descripción del producto</label>
                    <div className="br"></div>
                    <div className="detalleProductoDescripcion">
                        <div dangerouslySetInnerHTML={{__html: this.state.descripcion}}>
                        </div>                        
                    </div>
                </div>
            </div>            
        </div>
    
      </div>      
    </div>
    );
  }
}

export default Detalle;
